import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  const { data: cert } = await supabaseAdmin
    .from("certificates")
    .select("id, student_name, project_name, software, cohort_number, start_date, end_date, emit_date, pdf_url")
    .eq("id", id)
    .eq("revoked", false)
    .maybeSingle();

  if (!cert) notFound();

  const emitDate = new Date(cert.emit_date);
  const formattedDate = emitDate.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-20 max-w-3xl mx-auto">
        <p className="eyebrow mb-8">Verificación de certificado</p>

        <div className="border border-line bg-white p-10 mb-8">
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-10">
            Forastero Studio · Bootcamp CAD→BIM
          </p>

          <p className="text-xs font-light text-stone mb-3">Se certifica que</p>
          <h1
            className="text-4xl font-light text-ink mb-8"
            style={{ letterSpacing: "-0.03em" }}
          >
            {cert.student_name}
          </h1>

          <div className="h-px bg-line mb-8" />

          <p className="text-sm font-light text-deep leading-relaxed mb-8">
            completó las 8 semanas del Bootcamp CAD→BIM, trabajando sobre el proyecto{" "}
            <span className="text-ink">{cert.project_name}</span> con{" "}
            <span className="text-ink">{cert.software}</span>, con validación IFC aprobada
            en cada semana.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-1">
                Año
              </p>
              <p className="text-sm font-light text-ink">{cert.cohort_number}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-1">
                Fecha de emisión
              </p>
              <p className="text-sm font-light text-ink">{formattedDate}</p>
            </div>
          </div>

          <div className="h-px bg-line mb-6" />

          <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-1">
            ID de verificación
          </p>
          <p className="font-mono text-[10px] text-stone/60 break-all">{cert.id}</p>
        </div>

        <div className="flex items-center gap-6">
          {cert.pdf_url && (
            <a
              href={cert.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
            >
              Descargar PDF →
            </a>
          )}
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
          >
            forastero.studio
          </Link>
        </div>
      </div>
    </main>
  );
}
