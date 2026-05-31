import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

export default async function PackCompletoPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "pack-completo") : false;

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
        <p className="eyebrow mb-6">Pack Completo</p>
        <h1
          className="text-5xl font-light leading-tight mb-4 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          CAD Management + Bootcamp
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-4">
          Todo. El orden completo del estudio y la transición técnica a BIM en
          un solo paquete. Para quien decide hacer el cambio en serio y de una
          vez.
        </p>
        <p className="text-lg font-light text-deep leading-relaxed max-w-2xl mb-8">
          Empezás ordenando lo que ya hacés con CAD, y mientras tanto modelás tu
          primer proyecto BIM con acompañamiento profesional. Cuando termines, tu
          estudio funciona de manera distinta.
        </p>

        {!access && (
          <span className="inline-block border border-line text-stone/50 px-5 py-3 text-sm font-light cursor-default mb-20">
            Próximamente
          </span>
        )}
        {access && (
          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              href="/cad-management"
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
            >
              Ir a CAD Management →
            </Link>
            <Link
              href="/bootcamp/dashboard"
              className="inline-block border border-line text-stone px-5 py-3 text-sm font-light hover:border-ink hover:text-ink transition-colors"
            >
              Ir al Bootcamp →
            </Link>
          </div>
        )}

        <div className="h-px bg-line mb-10" />

        {/* Qué incluye */}
        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-10">
          Qué incluye
        </p>

        {/* Bloque CAD Management */}
        <div className="border border-line mb-4">
          <div className="bg-white p-8 md:p-10 border-b border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              1 · CAD Management (Taller + Workshop)
            </p>
            <h2
              className="text-2xl font-light text-ink mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Sistema completo para tu estudio
            </h2>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
              Dos formaciones que se complementan: el método para documentar
              obras (Taller, 4 clases · 7 módulos) y el método para presupuestar
              (Workshop, 2 clases). Podés aplicarlos por separado o en paralelo,
              usando el Taller como base para el proyecto del Bootcamp.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Taller de Documentación de Obras — 4 clases, 7 módulos, archivos DWG y CTB",
                "Workshop Cotización de Obras — 2 clases, planillas Excel listas para usar",
                "Acceso de por vida + actualizaciones incluidas",
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
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs font-light text-stone">
              Valor individual: <span className="text-ink">USD 150</span>
            </p>
          </div>
        </div>

        {/* Bloque Bootcamp */}
        <div className="border border-line mb-16">
          <div className="bg-white p-8 md:p-10 border-b border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-3">
              2 · Bootcamp CAD→BIM
            </p>
            <h2
              className="text-2xl font-light text-ink mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Transición real a BIM en 8 semanas
            </h2>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
              Modelás un proyecto profesional completo — elegís entre el Refugio
              Alpe di Portola (Suiza) o la Cabina Patagonia (Argentina). Un
              asistente IA disponible 24/7 sabe en qué semana estás y qué
              proyecto modelás. Al final: proyecto BIM terminado + certificado
              verificable.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "8 semanas a tu ritmo — 30-45 min por día",
                "Validación profesional al cierre de cada semana",
                "Asistente IA con conocimiento de tu proyecto específico",
                "Certificado verificable al completar",
                "Acceso de por vida + actualizaciones incluidas",
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
          <div className="bg-white p-6 md:p-8">
            <p className="text-xs font-light text-stone">
              Valor individual: <span className="text-ink">USD 350</span>
            </p>
          </div>
        </div>

        {/* Para quién es */}
        <div className="grid md:grid-cols-2 gap-0 border border-line mb-16">
          <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-line">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              Para quién es
            </p>
            <p className="text-sm font-light text-stone leading-relaxed">
              Arquitectos que quieren hacer el cambio completo: ordenar el
              estudio y hacer la transición a BIM. Quien ya sabe que lo quiere
              todo y prefiere no comprar por partes.
            </p>
          </div>
          <div className="bg-white p-8">
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
              Qué necesitás
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "AutoCAD® a nivel profesional",
                "Revit® 2022+ o ArchiCAD® 25+ (licencia educacional o profesional)",
                "30-45 min por día durante las 8 semanas del Bootcamp",
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
            <span className="border border-line text-stone/50 px-5 py-4 text-sm font-light text-center cursor-default">
              Próximamente
            </span>
            <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
              Acceso de por vida · certificado del Bootcamp incluido
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <Link
              href="/cad-management"
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors"
            >
              Ir a CAD Management →
            </Link>
            <Link
              href="/bootcamp/dashboard"
              className="inline-block border border-line text-stone px-5 py-3 text-sm font-light hover:border-ink hover:text-ink transition-colors"
            >
              Ir al Bootcamp →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
