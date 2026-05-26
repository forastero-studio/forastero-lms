import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { getBootcampWeeks } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

const PRICE = "USD 349";
const PUBLIC_SLUGS = ["semana-0", "semana-1"];

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
          Pasá de AutoCAD a BIM modelando un proyecto profesional completo en 8 semanas.
        </p>
        <p className="text-base font-light text-stone leading-relaxed max-w-2xl mb-8">
          Revit o ArchiCAD. A tu ritmo. Agente IA incluido que sabe en qué semana
          estás, qué proyecto elegiste y qué software usás. Validación IFC en cada
          semana. Certificado al final.
        </p>

        {/* Precio */}
        {!access && (
          <p
            className="text-[44px] font-light text-ink leading-none mb-8"
            style={{ letterSpacing: "-0.05em" }}
          >
            {PRICE}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-20">
          {!access && (
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
            >
              Comprar el Bootcamp
            </BuyButton>
          )}
          {access && (
            <Link
              href="/bootcamp/dashboard"
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
            >
              Ir a mi progreso →
            </Link>
          )}
          <a
            href="#semanas"
            className="inline-block border border-line text-stone px-5 py-3 text-sm font-light hover:border-ink hover:text-ink transition-colors"
          >
            Ver el plan completo de 8 semanas →
          </a>
        </div>

        {/* Cómo funciona */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Cómo funciona</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-line mb-16">
          {[
            {
              title: "Acceso inmediato sin esperar",
              body: "Comprás, te llega el acceso, arrancás. Sin fechas fijas. Tu ritmo, tus tiempos.",
            },
            {
              title: "Validación IFC al final de cada semana",
              body: "Exportás el IFC del modelo. Un agente IA lo valida con criterios profesionales y te da feedback concreto. Si está bien, desbloqueás la siguiente semana.",
            },
            {
              title: "Certificado verificable al completar",
              body: "Cuando terminás las 8 semanas con validación verde o amarillo, se emite tu certificado. ID único, verificable públicamente.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 border-r border-line last:border-r-0">
              <p className="text-sm font-light text-ink leading-snug mb-3">{item.title}</p>
              <p className="text-sm font-light text-stone leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Proyectos */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-6">Los 2 proyectos guía</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line mb-4">
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción A · Preexistencia
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Refugio Alpe di Portola
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-3">
              Suiza · intervención sobre preexistencia. ~32 m², 2 niveles, mampostería de
              piedra existente.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone">
              Sistema de fases (existing/new) · modelado patrimonial · intervención reversible
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción B · Obra nueva
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Cabina Patagonia
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-3">
              Argentina · construcción nueva residencial. Planta única, cubierta inclinada
              característica.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone">
              Documentación completa multidisciplinar · coordinación con instalaciones
            </p>
          </div>
        </div>
        <p className="text-sm font-light text-stone mb-16">
          Elegís uno al arrancar Semana 1. Los planos CAD de cada proyecto se descargan
          desde tu dashboard.
        </p>

        {/* Semanas */}
        <div className="h-px bg-line mb-10" />
        <p id="semanas" className="eyebrow mb-8">Programa · 8 semanas</p>
        <div className="flex flex-col divide-y divide-line border border-line mb-16">
          {weeks.map((w) => {
            const weekNum = w.semana ?? 0;
            const isPublic = PUBLIC_SLUGS.includes(w.slug);
            const hasIfc = (w.semana ?? 0) >= 1;

            const rowInner = (
              <div className="flex items-start justify-between gap-6 px-6 py-5 bg-white">
                <div className="flex items-start gap-5 flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[.1em] text-stone shrink-0 pt-0.5">
                    {String(weekNum).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-light text-ink leading-snug">
                        {w.title}
                      </p>
                      {isPublic && (
                        <span className="font-mono text-[8px] tracking-[.1em] uppercase text-stone border border-line px-1.5 py-0.5 shrink-0 leading-none">
                          vista previa
                        </span>
                      )}
                    </div>
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
                    {!isPublic && (
                      <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/40 mt-1">
                        Disponible al comprar el Bootcamp
                      </p>
                    )}
                  </div>
                </div>
                {hasIfc && (
                  <div className="shrink-0 pt-0.5">
                    <span className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/40">
                      IFC ✓
                    </span>
                  </div>
                )}
              </div>
            );

            return isPublic ? (
              <Link
                key={w.slug}
                href={`/bootcamp/${w.slug}`}
                className="hover:bg-muted transition-colors block"
              >
                {rowInner}
              </Link>
            ) : (
              <div key={w.slug} className="opacity-70">
                {rowInner}
              </div>
            );
          })}
        </div>

        {/* Qué necesitás */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Qué necesitás</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line mb-16">
          {[
            {
              label: "Software",
              body: "Revit 2022+ o ArchiCAD 25+. Licencia educacional o profesional. El bootcamp es agnóstico.",
            },
            {
              label: "Computadora",
              body: "16 GB de RAM mínimo, GPU dedicada o iGPU moderna, disco SSD. Mac soporta ArchiCAD nativamente; para Revit necesitás Windows o virtualización.",
            },
            {
              label: "Tiempo",
              body: "~8 horas por semana. Las 8 semanas pueden estirarse según tu ritmo — no hay caducidad del acceso por 24 meses.",
            },
            {
              label: "Conocimiento previo",
              body: "AutoCAD a nivel profesional. Si no manejás AutoCAD, hacé primero el Taller de Documentación de Obras.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 border-r border-b border-line">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
                {item.label}
              </p>
              <p className="text-sm font-light text-stone leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* FAQ específica del Bootcamp */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Preguntas frecuentes</p>
        <div className="max-w-2xl border-t border-line mb-16">
          {[
            {
              q: "¿Cuándo arranca?",
              a: "No tiene fecha fija. Comprás cuando querés y arrancás cuando querés. La Semana 1 se desbloquea al confirmar tu pago.",
            },
            {
              q: "¿En cuánto tiempo termino?",
              a: "Está diseñado para 8 semanas con dedicación de ~8 horas/semana. Podés ir a tu ritmo: las semanas se desbloquean a medida que completás la validación IFC de la anterior.",
            },
            {
              q: "¿Cómo se valida el avance?",
              a: "Al final de cada semana exportás un IFC del modelo. El agente lo valida automáticamente y te da feedback verde, amarillo o rojo. Si está en verde o amarillo, desbloqueás la siguiente semana.",
            },
            {
              q: "¿Hay reembolso?",
              a: "14 días desde la compra sin justificación, siempre que no hayas completado más de 2 validaciones IFC. Detalle completo en la Política de Reembolso.",
            },
          ].map((item, i) => (
            <details key={i} className="group border-b border-line">
              <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
                <span className="text-sm font-light text-ink leading-snug">{item.q}</span>
                <span className="font-mono text-base font-light text-stone shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200 select-none">
                  +
                </span>
              </summary>
              <p className="text-sm font-light text-stone leading-relaxed pb-5 pr-8">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        {/* CTA final */}
        <div className="h-px bg-line mb-10" />
        {!access ? (
          <div className="flex flex-col gap-4 max-w-sm">
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
              className="border border-ink text-ink px-5 py-4 text-sm font-light hover:border-rust hover:text-rust transition-colors text-center"
            >
              Comprar el Bootcamp · {PRICE}
            </BuyButton>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              Acceso inmediato · A tu ritmo
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
