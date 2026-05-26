import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

export default async function CadManagementProductPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "cad-management") : false;

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
        <p className="eyebrow mb-6">Pack CAD Management</p>
        <h1
          className="text-5xl font-light leading-tight mb-4 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          CAD Management
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-4">
          Documentación de obras + Cotización profesional.
        </p>

        {/* Precio */}
        {!access && (
          <p
            className="text-[44px] font-light text-ink leading-none mb-4"
            style={{ letterSpacing: "-0.05em" }}
          >
            USD 150
          </p>
        )}
        {!access && (
          <p className="text-sm font-light text-stone mb-8">
            Pack que incluye Taller + Workshop · ahorrás USD 30 vs comprarlos por
            separado
          </p>
        )}

        {/* CTA */}
        {!access ? (
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Acceder al pack · USD 150
          </BuyButton>
        ) : (
          <Link
            href="/cad-management/modulo-a"
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
        <p className="text-base font-light text-deep leading-relaxed mb-12 max-w-2xl">
          Dos formaciones que se complementan:
        </p>

        {/* ── Bloque 1: Taller ── */}
        <div className="border border-line mb-10">
          <div className="bg-white p-8 md:p-10 border-b border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              1 · Taller de Documentación de Obras
            </p>
            <h2
              className="text-2xl font-light text-ink mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Taller de Documentación de Obras
            </h2>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
              Aprendés a dibujar planos ejecutivos profesionales con AutoCAD®.
              Más allá de las herramientas, es un método completo para documentar
              una obra de principio a fin: desde la organización del archivo,
              pasando por estructura, instalaciones, terminaciones, hasta las
              planillas de cierre.
            </p>

            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              El Taller incluye:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "7 videos explicativos (uno por módulo)",
                "Guías prácticas en PDF",
                "Archivos DWG del proyecto base",
                "Listados de layers organizados",
                "Archivos CTB configurados",
                "Plantillas de planos ejecutivos",
                "Bloques de instalaciones, carpinterías y terminaciones",
                "Esquemas y planillas de itemizado",
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
              4 clases · 7 módulos
            </p>
          </div>

          {/* Clases del Taller */}
          <div className="divide-y divide-line">
            {/* CLASE 1 */}
            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 1
              </p>
              <div className="border-l-2 border-line pl-5">
                <p className="text-sm font-light text-ink mb-1 leading-snug">
                  Módulo A · Setup del proyecto y organización del archivo
                </p>
                <p className="text-sm font-light text-stone leading-relaxed">
                  Organización de archivos, listado de layers, referencias
                  externas, archivos CTB, primeros planos de arquitectura y anexo
                  de organización interna del estudio.
                </p>
              </div>
            </div>

            {/* CLASE 2 */}
            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 2
              </p>
              <div className="flex flex-col gap-5">
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo B · Estructura
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Plano de estructura y trabajo avanzado con referencias
                    externas en AutoCAD®.
                  </p>
                </div>
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo C · Instalaciones sanitarias
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Planos de agua fría y caliente, instalación cloacal, pluvial
                    y de gas, con sus esquemas correspondientes.
                  </p>
                </div>
              </div>
            </div>

            {/* CLASE 3 */}
            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 3
              </p>
              <div className="flex flex-col gap-5">
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo D · Terminaciones y layout
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Planos de marmolería, terminaciones y cielorrasos. Láminas en
                    formato ISO. Uso profesional del layout en AutoCAD®.
                  </p>
                </div>
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo E · Instalaciones eléctricas y termomecánicas
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Planos de iluminación, tomas y corrientes débiles. Aire
                    acondicionado, radiadores y losa radiante. Configuración de
                    impresiones y archivos CTB.
                  </p>
                </div>
              </div>
            </div>

            {/* CLASE 4 */}
            <div className="bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Clase 4
              </p>
              <div className="flex flex-col gap-5">
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo F · Locales húmedos y detalles
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Planos de baños, cocinas y otros locales húmedos. Detalles
                    constructivos asociados.
                  </p>
                </div>
                <div className="border-l-2 border-line pl-5">
                  <p className="text-sm font-light text-ink mb-1 leading-snug">
                    Módulo G · Planillas y cierre
                  </p>
                  <p className="text-sm font-light text-stone leading-relaxed">
                    Planilla de carpinterías, planilla de locales y planilla de
                    itemizado para cerrar la documentación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bloque 2: Workshop ── */}
        <div className="border border-line mb-16">
          <div className="bg-white p-8 md:p-10 border-b border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              2 · Workshop Cotización de Obras
            </p>
            <h2
              className="text-2xl font-light text-ink mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Workshop Cotización de Obras
            </h2>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
              Aprendés un método para presupuestar obras con criterio profesional.
              Primero entendés qué es presupuestar y cómo se estructura una
              cotización. Después aprendés cómo medir desde el plano y armar el
              cómputo.
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

          {/* Clases del Workshop */}
          <div className="divide-y divide-line">
            {/* CLASE 1: COTIZACIÓN */}
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

            {/* CLASE 2: CÓMPUTO */}
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
              Arquitectos independientes o estudios chicos (1-5 personas) que ya
              manejan AutoCAD® pero sienten que cada proyecto empieza de cero,
              que cada presupuesto es un dolor de cabeza, y que el orden interno
              se sostiene con buena memoria.
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              No es para
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Quien recién está aprendiendo AutoCAD®",
                "Estudios grandes con sistemas BIM ya implementados",
                "Quien busca formación oficial certificada por Autodesk®",
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
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
              className="border border-ink text-ink px-5 py-4 text-sm font-light hover:border-rust hover:text-rust transition-colors text-center"
            >
              Acceder al pack · USD 150
            </BuyButton>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              Acceso de por vida · actualizaciones incluidas
            </p>
          </div>
        ) : (
          <Link
            href="/cad-management/modulo-a"
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
          >
            Continuar →
          </Link>
        )}
      </div>
    </main>
  );
}
