import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { getBootcampWeeks } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

const PRICE = "USD 350";
const PUBLIC_SLUGS: string[] = [];

export default async function BootcampProductPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "bootcamp") : false;
  const weeks = getBootcampWeeks();

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-20 max-w-5xl mx-auto">

        {/* Hero */}
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors inline-block mb-12"
        >
          ← forastero
        </Link>
        <p className="eyebrow mb-6">Bootcamp · 8 semanas</p>
        <h1
          className="text-5xl font-light leading-tight mb-6 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          Bootcamp CAD → BIM
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-4">
          8 semanas para pasar de AutoCAD® a BIM modelando un proyecto
          profesional completo.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-20">
          {!access && (
            <span className="inline-block border border-line text-stone/50 px-5 py-3 text-sm font-light cursor-default">
              Próximamente
            </span>
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

        {/* La idea */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">La idea</p>
        <div className="max-w-2xl mb-16">
          <p className="text-base font-light text-deep leading-[1.65] mb-5">
            No vas a "aprender BIM" mirando tutoriales sueltos durante meses. Vas
            a modelar un proyecto real, paso a paso, con un asistente digital al
            lado que sabe en qué semana estás.
          </p>
          <p className="text-base font-light text-deep leading-[1.65]">
            8 semanas con dedicación de 30-45 minutos por día. Al final tenés un
            proyecto BIM terminado, con la documentación profesional que sale del
            modelo y un certificado verificable de forastero.
          </p>
        </div>

        {/* Cómo funciona */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Cómo funciona</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-line mb-16">
          {[
            {
              title: "Una semana = un objetivo concreto",
              body: "Cada semana cubrís una etapa específica del modelado: estructura, aberturas, materiales, cubierta, vistas, documentación, planillas, presentación final. Cada etapa tiene material teórico, paso a paso operativo en Revit® o ArchiCAD®, ejemplos contextuales y un cierre con feedback.",
            },
            {
              title: "Validación al final de cada semana",
              body: "Al cerrar cada semana le mandás tu archivo al asistente del bootcamp. Lo revisa con criterios profesionales y te devuelve un semáforo: verde (seguir), amarillo (corregir esto antes de avanzar), o rojo (acá hay un problema serio para resolver). Si pasás en verde o amarillo, se desbloquea la semana siguiente.",
            },
            {
              title: "Asistente IA durante las 8 semanas",
              body: "Cuando te trabás, escribís al asistente del bootcamp. Sabe qué semana estás cursando, qué proyecto elegiste, qué software usás. Te guía con criterio profesional, no con respuestas genéricas de internet. Te acompaña de principio a fin del bootcamp.",
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
        <p className="text-sm font-light text-stone mb-8">
          Al inicio elegís uno de estos dos proyectos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line mb-16">
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción A · Preexistencia
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Refugio Alpe di Portola · Suiza
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              Pequeño refugio alpino de aproximadamente 32 m², planta única, en
              mampostería de piedra existente, con cubierta de madera a un agua.
            </p>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              El proyecto consiste en una intervención cuidadosa sobre la
              preexistencia: nueva cubierta, nuevo pavimento, sustitución
              de carpinterías.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-3">
              Ideal si te interesa:
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Trabajo sobre construcción existente",
                "Intervenciones reversibles (criterio patrimonial)",
                "Materialidad tradicional (piedra, madera)",
                "Proyectos chicos con detalle cuidado",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-light text-stone">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              Opción B · Obra nueva
            </p>
            <h3 className="text-lg font-light text-ink mb-2">
              Cabina Patagonia · Argentina
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              Cabina residencial nueva, planta única, con cubierta inclinada
              característica de zonas con nieve. Construcción en mampostería con
              aislación térmica.
            </p>
            <p className="text-sm font-light text-stone leading-relaxed mb-4">
              Documentación arquitectónica completa: plantas, cortes, alzados,
              carpinterías, terminaciones y detalles constructivos.
            </p>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-3">
              Ideal si te interesa:
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Construcción residencial nueva",
                "Climas fríos y cubiertas inclinadas",
                "Documentación arquitectónica completa",
                "Proyectos residenciales unifamiliares",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-light text-stone">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Semanas */}
        <div className="h-px bg-line mb-10" />
        <p id="semanas" className="eyebrow mb-8">Programa · 8 semanas</p>
        <div className="flex flex-col divide-y divide-line border border-line mb-16">
          {weeks.map((w) => {
            const weekNum = w.semana ?? 0;
            const isPublic = PUBLIC_SLUGS.includes(w.slug);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-line mb-16">
          {[
            {
              label: "Software",
              body: "Revit® 2022 o más reciente, o ArchiCAD® 25 o más reciente. Licencia educacional o profesional.",
            },
            {
              label: "Tiempo",
              body: "30-45 minutos por día durante 8 semanas. Las semanas pueden estirarse según tu ritmo. Acceso al material de por vida.",
            },
            {
              label: "Conocimiento previo",
              body: "AutoCAD® a nivel intermedio. Si todavía no manejás AutoCAD® en este nivel, empezá primero por el Taller de Documentación de Obras.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 border-r border-line last:border-r-0">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
                {item.label}
              </p>
              <p className="text-sm font-light text-stone leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Cuándo no es para vos */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Cuándo no es para vos</p>
        <div className="max-w-2xl mb-16">
          <ul className="flex flex-col gap-3">
            {[
              "Si buscás formación oficial certificada por Autodesk® o Graphisoft® (este es un programa independiente, no afiliado a esas marcas)",
              "Si tu objetivo es BIM gerencial o BIM management avanzado (este es un programa de modelado profesional BIM)",
              "Si necesitás acreditación universitaria",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light text-stone">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Preguntas frecuentes</p>
        <div className="max-w-2xl border-t border-line mb-16">
          {[
            {
              q: "¿Qué pasa si me trabo y no puedo avanzar?",
              a: "Tenés acceso al asistente IA del bootcamp 24/7. Sabe en qué semana estás y qué proyecto modelás. Te guía con criterio profesional hasta que resuelvas el bloqueo.",
            },
            {
              q: "¿Puedo usar mi propio proyecto en lugar de los dos proyectos guía?",
              a: "Para el material formal del bootcamp se trabaja sobre uno de los dos proyectos guía. Pero podés aplicar en paralelo todo lo que aprendés a un proyecto tuyo. Mucha gente lo hace y acelera el aprendizaje.",
            },
            {
              q: "¿Cuándo emite el certificado?",
              a: "Al completar las 8 semanas con validación en verde o amarillo. La emisión es automática y recibís un PDF más un link verificable público.",
            },
            {
              q: "¿Tengo que terminar en 8 semanas exactas?",
              a: "No hay reloj. Las semanas se desbloquean cuando validás la anterior, a tu ritmo. Acceso de por vida al material desde la compra.",
            },
            {
              q: "¿Esto reemplaza a un curso oficial de Revit® o ArchiCAD®?",
              a: "No. Esto es un bootcamp de transición CAD → BIM con criterio profesional. Para certificación oficial del software, mirá Autodesk® Training o Graphisoft® Learn.",
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
            <span className="border border-line text-stone/50 px-5 py-4 text-sm font-light text-center cursor-default">
              Próximamente
            </span>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              Acceso de por vida · a tu ritmo
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
