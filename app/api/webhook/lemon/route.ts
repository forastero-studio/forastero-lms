import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { buildBienvenidaEmail } from "@/lib/emails/bienvenida";

// variant_id de Lemon Squeezy → slug interno
const VARIANT_TO_PRODUCT_MAP: Record<string, string> = {
  "1702373": "taller-documentacion",
  "1702406": "workshop-cotizacion",
  "1667874": "pack-cad-management",
  "1667893": "bootcamp",
  "1667903": "pack-completo",
};

function resolveSlug(variantId: unknown): string | null {
  return VARIANT_TO_PRODUCT_MAP[String(variantId)] ?? null;
}

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMON_WEBHOOK_SECRET!;
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

async function initBootcampProgress(userId: string): Promise<void> {
  await supabaseAdmin
    .from("bootcamp_progress")
    .upsert(
      {
        user_id: userId,
        current_week: 1,
        completed_weeks: [],
        start_date: new Date().toISOString().split("T")[0],
      },
      { onConflict: "user_id", ignoreDuplicates: true }
    );
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  const eventName: string = body.meta?.event_name;
  const data = body.data?.attributes;
  const orderId: string = body.data?.id;

  if (eventName === "order_created") {
    const email: string = data?.user_email ?? "";
    const variantId = data?.first_order_item?.variant_id;
    const productSlug = resolveSlug(variantId);

    if (!productSlug) {
      console.warn("[lemon webhook] unknown variant_id:", { variantId });
      return NextResponse.json({ received: true });
    }

    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    const { error } = await supabaseAdmin.from("purchases").insert({
      user_id: existingUser?.id ?? null,
      pending_email: existingUser ? null : email,
      product_slug: productSlug,
      lemon_order_id: orderId,
      status: "active",
    });

    if (error?.code === "23505") {
      // Duplicate lemon_order_id — evento ya procesado (reenvío de LS)
      return NextResponse.json({ received: true });
    }
    if (error) {
      console.error("[lemon webhook] insert error:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // Lógica de habilitación según producto
    if (existingUser?.id) {
      const userId = existingUser.id;

      const includesBootcamp =
        productSlug === "bootcamp" || productSlug === "pack-completo";

      if (includesBootcamp) {
        await supabaseAdmin
          .from("users")
          .update({ bootcamp_active: true })
          .eq("id", userId);

        await initBootcampProgress(userId);
      }
    }
    // TODO: cuando el agente forastero-bim tenga autenticación Supabase,
    // leer bootcamp_active desde users para sincronizar el userProfile del agente.

    // Email de bienvenida
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && email) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        const { subject, html } = buildBienvenidaEmail(productSlug, email);
        await resend.emails.send({
          from: "Forastero Studio <info@forastero.studio>",
          to: email,
          subject,
          html,
        });
      } catch (e) {
        console.error("[lemon webhook] welcome email error:", e);
      }
    }

  } else if (eventName === "order_refunded") {
    await supabaseAdmin
      .from("purchases")
      .update({ status: "refunded" })
      .eq("lemon_order_id", orderId);
  }

  return NextResponse.json({ received: true });
}
