import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hasAccess, getUserByClerkId, getProgress } from "@/lib/db";
import { generateCertificatePdf } from "@/lib/certificate";
import { COHORT_0 } from "@/lib/bootcamp";

const PROJECT_NAMES: Record<string, string> = {
  refugio: "Refugio Alpe di Portola",
  cabina: "Cabina Patagonia",
};

const WEEK_SLUGS = Array.from({ length: 8 }, (_, i) => `semana-${i + 1}`);

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const projectSlug: string = body.projectSlug ?? "";
  const software: string = (body.software ?? "").trim();

  if (!PROJECT_NAMES[projectSlug]) {
    return NextResponse.json({ error: "Invalid projectSlug" }, { status: 400 });
  }
  if (!software) {
    return NextResponse.json({ error: "Missing software" }, { status: 400 });
  }

  // Verificar acceso al bootcamp
  const access = await hasAccess(userId, "bootcamp");
  if (!access) return NextResponse.json({ error: "No bootcamp access" }, { status: 403 });

  // Verificar que las 8 semanas estén completadas
  const completedSlugs = await getProgress(userId, "bootcamp");
  const allCompleted = WEEK_SLUGS.every((s) => completedSlugs.includes(s));
  if (!allCompleted) {
    return NextResponse.json({ error: "Not all weeks completed" }, { status: 400 });
  }

  // Obtener Supabase user
  const dbUser = await getUserByClerkId(userId);
  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Idempotency: si ya tiene certificado, devolver el existente
  const { data: existing } = await supabaseAdmin
    .from("certificates")
    .select("id, pdf_url")
    .eq("user_id", dbUser.id)
    .eq("revoked", false)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ id: existing.id, pdf_url: existing.pdf_url });
  }

  // Nombre desde Clerk
  const clerkUser = await currentUser();
  const studentName =
    [clerkUser?.firstName, clerkUser?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    clerkUser?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

  // Insertar registro de certificado
  const { data: cert, error: certError } = await supabaseAdmin
    .from("certificates")
    .insert({
      user_id: dbUser.id,
      student_name: studentName,
      project_name: PROJECT_NAMES[projectSlug],
      project_slug: projectSlug,
      software,
      cohort_number: COHORT_0.number,
      start_date: COHORT_0.startDate.toISOString().split("T")[0],
      end_date: COHORT_0.endDate.toISOString().split("T")[0],
    })
    .select()
    .single();

  if (certError || !cert) {
    console.error("[emit-certificate] insert error:", certError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Generar PDF y subir a Supabase Storage
  let pdfUrl: string | null = null;
  try {
    const pdfBuffer = await generateCertificatePdf({
      studentName,
      projectName: PROJECT_NAMES[projectSlug],
      projectSlug,
      software,
      cohortNumber: COHORT_0.number,
      id: cert.id,
    });

    const { error: uploadError } = await supabaseAdmin.storage
      .from("certificates")
      .upload(`${cert.id}.pdf`, pdfBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (!uploadError) {
      const { data: urlData } = supabaseAdmin.storage
        .from("certificates")
        .getPublicUrl(`${cert.id}.pdf`);
      pdfUrl = urlData?.publicUrl ?? null;

      await supabaseAdmin
        .from("certificates")
        .update({ pdf_url: pdfUrl })
        .eq("id", cert.id);
    } else {
      console.error("[emit-certificate] storage upload error:", uploadError);
    }
  } catch (e) {
    console.error("[emit-certificate] PDF error:", e);
    // No abortar — el registro DB ya existe; el PDF puede regenerarse después
  }

  // Enviar email con Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const emailTo = clerkUser?.emailAddresses[0]?.emailAddress;
      if (emailTo) {
        await resend.emails.send({
          from: "Forastero Studio <no-reply@forastero.studio>",
          to: emailTo,
          subject: "Tu certificado · Bootcamp CAD→BIM",
          html: buildEmailHtml(studentName, cert.id, pdfUrl),
        });
      }
    } catch (e) {
      console.error("[emit-certificate] email error:", e);
    }
  }

  return NextResponse.json({ id: cert.id, pdf_url: pdfUrl });
}

function buildEmailHtml(name: string, certId: string, pdfUrl: string | null): string {
  const verifyUrl = `https://forastero-lms.vercel.app/verify/${certId}`;
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;background:#f7f5ef;padding:40px 32px;">
  <p style="font-family:monospace;font-size:10px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 24px;">Forastero Studio</p>
  <h1 style="font-size:22px;font-weight:300;margin:0 0 16px;">Bootcamp CAD→BIM completado</h1>
  <p style="font-size:14px;font-weight:300;line-height:1.6;margin:0 0 8px;">Felicitaciones, ${name}.</p>
  <p style="font-size:14px;font-weight:300;line-height:1.6;margin:0 0 24px;color:#555;">Completaste las 8 semanas del Bootcamp CAD→BIM con validación IFC aprobada en cada semana.</p>
  <a href="${verifyUrl}" style="display:inline-block;border:1px solid #111;color:#111;text-decoration:none;padding:10px 18px;font-family:monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;">Ver certificado →</a>
  ${pdfUrl ? `<br><br><a href="${pdfUrl}" style="font-family:monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#888;text-decoration:none;">Descargar PDF →</a>` : ""}
  <p style="font-size:11px;color:#aaa;margin-top:40px;">Forastero Studio · forastero.studio</p>
</div>`;
}
