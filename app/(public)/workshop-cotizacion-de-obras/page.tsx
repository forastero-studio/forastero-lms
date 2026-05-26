import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

export default async function WorkshopPage() {
  const { userId } = await auth();
  const access = userId
    ? (await hasAccess(userId, "workshop-cotizacion")) ||
      (await hasAccess(userId, "cad-management"))
    : false;

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
        <p className="eyebrow mb-6">Workshop Cotización de Obras</p>
        <h1
          className="text-5xl font-light leading-tight mb-4 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          Cotización de Obras
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-4">
          Aprendés un método para presupuestar obras con criterio profesional.
          Estructura de cotización, cómputo desde el plano y valorización en
          Excel.
        </p>

        {!access && (
          <>
            <p
              className="text-[44px] font-light text-ink leading-none mb-4"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 80
            </p>
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_WORKSHOP!}
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
            >
              Acceder al Workshop · USD 80
            </BuyButton>
          </>
        )}
        {access && (
          <Link
            href="/cad-management/workshop-cotizacion"
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Continuar →
          </Link>
        )}

        <div className="h-px bg-line mb-10" />

        {/* Qué incluye */}
        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-10">
          Qué incluye
        </p>

        <div className="border border-line mb-16">
          <div className="bg-white p-8 md:p-10 border-b border-line">
            <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
              Primero entendés qué es presupuestar y cómo se estructura una
              cotización. Después aprendés cómo medir desde el plano y armar el
              cómputo. Todo con planillas listas para usar en tus propios
              proyectos.
            </p>

            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              El Workshop incluye:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "2 videos explicativos (uno por clase)",
                "Excel de cotización global",
                "Excel de cotización detallada",
                "Tabla de costos de construcción por rubro",
                "Tabla de costos de materiales",
                "Porcentaje de incidencia por rubro",
                "Listado de materiales de obra",
                "Ejemplos reales de presupuestos (carpinterías, marmolería, electricidad, corralón, sanitarios)",
                "Base de cómputo y proyecto ejemplo en DWG",
                "Documento de cómputo de hormigón y acero",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm font-light text-stone"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              2 clases
            </p>
          </div>

          <div className="divide-y divide-line">
            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 1 · Cotización
              </p>
              <div className="border-l-2 border-line pl-5">
                <p className="text-sm font-light text-stone leading-relaxed">
                  Qué es presupuestar una obra. Estructura de una cotización
                  global y de una cotización detallada. Sistema de costos por
                  rubros. Porcentaje de incidencia de cada rubro. Análisis de
                  presupuestos reales de carpintería, marmolería, electricidad,
                  sanitarios y corralón.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 2 · Cómputo
              </p>
              <div className="border-l-2 border-line pl-5">
                <p className="text-sm font-light text-stone leading-relaxed">
                  Cómo medir desde el plano. Base de cómputo sobre un proyecto
                  ejemplo en AutoCAD®. Cómputo específico de hormigón y acero.
                  Traducción del cómputo a valorización en Excel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Para quién es */}
        <div className="grid md:grid-cols-2 gap-0 border border-line mb-16">
          <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              Para quién es
            </p>
            <p className="text-sm font-light text-stone leading-relaxed">
              Arquitectos que sienten que cada presupuesto es un dolor de cabeza,
              que no tienen un método claro para cotizar, o que dependen de
              ingenieros o colegas para hacer los números.
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              No es para
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Quien busca software de presupuesto especializado (Revuelo, SIMED, etc.)",
                "Estudios que ya tienen un sistema de presupuesto establecido",
                "Quien busca certificación oficial en medición o valuación",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm font-light text-stone"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA final */}
        <div className="h-px bg-line mb-10" />
        {!access ? (
          <div className="flex flex-col gap-3 max-w-sm">
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_WORKSHOP!}
              className="border border-ink text-ink px-5 py-4 text-sm font-light hover:border-rust hover:text-rust transition-colors text-center"
            >
              Acceder al Workshop · USD 80
            </BuyButton>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              Acceso de por vida · actualizaciones incluidas
            </p>
          </div>
        ) : (
          <Link
            href="/cad-management/workshop-cotizacion"
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
          >
            Continuar →
          </Link>
        )}
      </div>
    </main>
  );
}
