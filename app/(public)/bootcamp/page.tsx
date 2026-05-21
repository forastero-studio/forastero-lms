import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { getBootcampWeeks } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import { COHORT_0 } from "@/lib/bootcamp";
import Link from "next/link";

export default async function BootcampProductPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "bootcamp") : false;
  const weeks = getBootcampWeeks();

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-20 max-w-5xl mx-auto">

        {/* Hero */}
        <p className="eyebrow mb-6">Bootcamp · 8 semanas</p>
        <h1
          className="text-5xl font-light leading-tight mb-6 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          Bootcamp CAD→BIM
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-4">
          Pasás de AutoCAD a BIM trabajando sobre un proyecto real tuyo —
          elegido entre dos proyectos reales del estudio.
        </p>
        <p className="text-base font-light text-stone leading-relaxed max-w-2xl mb-10">
          Revit o ArchiCAD. Asincrónico con cohorte. Agente IA incluido que
          sabe en qué semana estás, qué proyecto elegiste y qué software usás.
          Validación IFC en cada semana. Certificado al final.
        </p>

        {!access && (
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-4"
          >
            Comprar bootcamp · USD 297
          </BuyButton>
        )}

        {access && (
          <Link
            href="/bootcamp/dashboard"
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-4"
          >
            Ir a mi progreso →
          </Link>
        )}

        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-20">
          {COHORT_0.label} · {COHORT_0.dateLabel}
        </p>

        {/* Proyectos */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-6">Los 2 proyectos guía</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line mb-16">
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción A · Preexistencia
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Refugio Alpe di Portola
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              Val Grono, Suiza italiana, 2004 m.s.l.m. Mampostería de piedra
              existente, modificaciones reversibles, restricción patrimonial
              real. Enseña el sistema de fases en BIM.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone">
              Ideal si querés aprender intervención sobre lo existente
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción B · Obra nueva
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Cabina Patagonia
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              Patagonia, Argentina. Vivienda nueva en madera estructural,
              cubierta inclinada, documentación completa. Enseña el flujo
              completo de un encargo residencial.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone">
              Ideal si buscás el flujo completo de principio a fin
            </p>
          </div>
        </div>

        {/* Semanas */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Programa · {COHORT_0.label}</p>

        <div className="flex flex-col divide-y divide-line border border-line mb-8">
          {weeks.map((w, i) => {
            const weekNum = w.semana ?? i + 1;
            return (
              <div
                key={w.slug}
                className="flex items-start justify-between gap-6 px-6 py-5 bg-white"
              >
                <div className="flex items-start gap-5 flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[.1em] text-stone shrink-0 pt-0.5">
                    {String(weekNum).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-light text-ink leading-snug">
                      {w.title}
                    </p>
                    {w.description && (
                      <p className="text-xs font-light text-stone mt-1 leading-snug">
                        {w.description}
                      </p>
                    )}
                    {w.duracion_estimada && (
                      <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/60 mt-1">
                        {w.duracion_estimada}
                      </p>
                    )}
                  </div>
                </div>
                <div className="shrink-0 pt-0.5">
                  <span className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/40">
                    IFC ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificado + Agente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line mb-16">
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Validación IFC
            </p>
            <p className="text-sm font-light text-stone leading-relaxed">
              Cada semana subís tu IFC al agente. El sistema lo valida con
              criterio técnico y te da una respuesta verde, amarilla o roja
              con instrucción concreta. No avanzás con cimientos débiles.
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Certificado Forastero
            </p>
            <p className="text-sm font-light text-stone leading-relaxed">
              Al completar la Semana 8 con validación aprobada, el sistema
              emite automáticamente tu certificado. Incluye tu nombre,
              proyecto, software y número de cohorte.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="h-px bg-line mb-10" />
        {!access ? (
          <div className="flex flex-col gap-4 max-w-sm">
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
              className="border border-ink text-ink px-5 py-4 text-sm font-light hover:border-rust hover:text-rust transition-colors text-center"
            >
              Comprar bootcamp · USD 297
            </BuyButton>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              {COHORT_0.label} · {COHORT_0.dateLabel}
            </p>
          </div>
        ) : (
          <Link
            href="/bootcamp/dashboard"
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
          >
            Ir a mi progreso →
          </Link>
        )}
      </div>
    </main>
  );
}
