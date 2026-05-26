import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import ModuleCard from "@/components/ModuleCard";
import MarkdownBody from "@/components/ui/MarkdownBody";
import { getBootcampWeek, getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress } from "@/lib/db";
import { computeDripStatus } from "@/lib/bootcamp";
import Link from "next/link";

interface Props {
  params: Promise<{ semana: string }>;
}

// Semanas con acceso libre, sin login ni compra
const PUBLIC_SLUGS = ["semana-0", "semana-1"];

export async function generateStaticParams() {
  const weeks = getBootcampWeeks();
  return weeks.map((w) => ({ semana: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { semana } = await params;
  const content = getBootcampWeek(semana);
  if (!content) return {};

  const isPublic = PUBLIC_SLUGS.includes(semana);
  const baseTitle = `${content.title} · Bootcamp CAD→BIM · Forastero`;

  if (!isPublic) {
    return { title: baseTitle, robots: { index: false, follow: false } };
  }

  const descriptions: Record<string, string> = {
    "semana-0":
      "Preparate para la transición de AutoCAD a BIM: setup de ArchiCAD o Revit, lógica de trabajo BIM, y los dos proyectos del bootcamp. Gratis.",
    "semana-1":
      "Creá tu primer archivo BIM desde cero: configuración de niveles, importación de planos CAD de referencia, mentalidad de modelado. Vista previa gratuita.",
  };

  const keywords: Record<string, string> = {
    "semana-0":
      "transición CAD BIM, setup ArchiCAD Revit, AutoCAD a BIM, primer modelo BIM arquitectos",
    "semana-1":
      "primer modelo BIM, configurar niveles BIM, mentalidad BIM, setup Revit ArchiCAD, transición CAD a BIM",
  };

  return {
    title: baseTitle,
    description: descriptions[semana] ?? content.description,
    keywords: keywords[semana],
    robots: { index: true, follow: true },
    openGraph: {
      title: baseTitle,
      description: descriptions[semana] ?? content.description,
      type: "article",
    },
  };
}

export default async function SemanaPage({ params }: Props) {
  const { semana } = await params;
  const content = getBootcampWeek(semana);
  if (!content) notFound();

  const isPublic = PUBLIC_SLUGS.includes(semana);

  // ─── PÁGINAS PÚBLICAS (Semana 0 y Semana 1) ───────────────────────────────
  if (isPublic) {
    return (
      <ContentArea>
        <p className="technical-header mb-2">
          forastero · bootcamp · vista previa
        </p>
        <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
        <h1
          className="font-display text-4xl font-light text-ink mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {content.title}
        </h1>
        {content.duracion_estimada && (
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mt-2">
            {content.duracion_estimada}
          </p>
        )}
        <div className="h-px bg-line my-8" />

        {content.videoDriveId && (
          <div className="aspect-video w-full overflow-hidden mb-10 bg-muted">
            <iframe
              src={`https://drive.google.com/file/d/${content.videoDriveId}/preview`}
              className="w-full h-full border-0"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        )}

        <div className="max-w-none mb-16">
          {content.body.trim() ? (
            <MarkdownBody content={content.body} />
          ) : (
            <div className="border border-line bg-paper p-8 max-w-lg">
              <p className="text-base font-light text-ink mb-2">
                Contenido en preparación.
              </p>
              <p className="text-sm font-light text-stone">
                Lo tenés disponible pronto.{" "}
                <a
                  href="mailto:info@forastero.studio"
                  className="text-ink hover:text-stone transition-colors"
                >
                  info@forastero.studio
                </a>
              </p>
            </div>
          )}
        </div>

        {/* CTA al final de Semana 1 */}
        {semana === "semana-1" && (
          <>
            <div className="h-px bg-line mb-10" />
            <div className="border border-line p-8 max-w-xl mb-12">
              <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone mb-4">
                forastero · bootcamp · vista previa
              </p>
              <p className="text-base font-light text-ink mb-2 leading-snug">
                Hasta acá llega la vista previa.
              </p>
              <p className="text-sm font-light text-stone mb-6 leading-relaxed">
                Si querés seguir con las siguientes 7 semanas —modelado
                completo del Refugio Alpe di Portola o la Cabina Patagonia,
                hasta documentación profesional y certificado verificable—
                accedés al Bootcamp completo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP ?? "/bootcamp"}
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-paper bg-rust px-5 py-3 hover:opacity-80 transition-opacity"
                  style={{ background: "var(--rust)" }}
                >
                  Ver el Bootcamp completo
                </a>
                <Link
                  href="/bootcamp"
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-stone border border-line px-5 py-3 hover:border-ink hover:text-ink transition-colors"
                >
                  ¿Qué incluye?
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Navegación entre semanas públicas */}
        <div className="h-px bg-line mb-8" />
        <div className="flex justify-between gap-4 mb-4">
          {content.prevModulo ? (
            <Link
              href={`/bootcamp/${content.prevModulo}`}
              className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
            >
              ← Anterior
            </Link>
          ) : (
            <span />
          )}
          {content.nextModulo && PUBLIC_SLUGS.includes(content.nextModulo) && (
            <Link
              href={`/bootcamp/${content.nextModulo}`}
              className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
            >
              Siguiente →
            </Link>
          )}
        </div>

        <p className="technical-header mt-10">
          forastero · bootcamp cad→bim · vista previa gratuita
        </p>
      </ContentArea>
    );
  }

  // ─── PÁGINAS PAGAS (Semana 2–8) ────────────────────────────────────────────
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "bootcamp") : false;

  // Drip check
  if (access && userId && content.semana) {
    const completedSlugs = await getProgress(userId, "bootcamp");
    const dripStatus = computeDripStatus(completedSlugs);
    const weekDrip = dripStatus[content.semana - 1];
    if (weekDrip && weekDrip.status === "locked_prev") {
      const lockReason = `Completá la validación IFC de Semana ${content.semana - 1} para desbloquear esta semana.`;
      return (
        <ContentArea>
          <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
          <h1
            className="font-display text-4xl font-light text-ink mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            {content.title}
          </h1>
          <div className="h-px bg-line my-8" />
          <div className="max-w-md">
            <p className="text-base font-light text-ink mb-2">
              Semana no disponible todavía.
            </p>
            <p className="text-sm font-light text-stone mb-6">{lockReason}</p>
            <Link
              href="/bootcamp/dashboard"
              className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
            >
              ← Volver al progreso
            </Link>
          </div>
        </ContentArea>
      );
    }
  }

  if (!access) {
    return (
      <ContentArea>
        <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
        <h1
          className="font-display text-4xl font-light text-ink mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          {content.title}
        </h1>
        <div className="h-px bg-line my-8" />
        <div className="max-w-md">
          <p className="text-base font-light text-ink mb-2">
            Este contenido es exclusivo para alumnos del Bootcamp CAD→BIM.
          </p>
          <p className="text-sm font-light text-stone mb-6">
            8 semanas de transición real de CAD a BIM: organización de
            archivos, familias base, documentación, coordinación y entrega
            final.
          </p>
          <Link
            href="/bootcamp"
            className="inline-block text-xs font-mono tracking-wider uppercase text-paper px-5 py-3 transition-colors"
            style={{ background: "var(--rust)" }}
          >
            Comprar Bootcamp
          </Link>
        </div>
      </ContentArea>
    );
  }

  const allWeeks = getBootcampWeeks().filter((w) => (w.semana ?? 0) >= 1);

  return (
    <div className="flex flex-1">
      <ContentArea>
        <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
        <h1
          className="font-display text-4xl font-light text-ink mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {content.title}
        </h1>
        {content.duracion_estimada && (
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mt-2">
            {content.duracion_estimada}
          </p>
        )}
        <div className="h-px bg-line my-8" />

        {content.videoDriveId && (
          <div className="aspect-video w-full overflow-hidden mb-10 bg-muted">
            <iframe
              src={`https://drive.google.com/file/d/${content.videoDriveId}/preview`}
              className="w-full h-full border-0"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        )}

        <div className="max-w-none mb-10">
          {content.body.trim() ? (
            <MarkdownBody content={content.body} />
          ) : (
            <div className="border border-line bg-paper p-8 max-w-lg">
              <p className="text-base font-light text-ink mb-2">
                Este contenido está en preparación.
              </p>
              <p className="text-sm font-light text-stone">
                Lo vas a tener disponible pronto. Cualquier consulta:{" "}
                <a
                  href="mailto:info@forastero.studio"
                  className="text-ink hover:text-stone transition-colors"
                >
                  info@forastero.studio
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Agente (solo para alumnos con acceso) */}
        <div className="border border-line bg-paper p-6 max-w-md mb-16">
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-2">
            Agente Forastero · BIM
          </p>
          <p className="text-sm font-light text-stone mb-4">
            El agente sabe que estás en {content.title}. Preguntale lo que
            necesitás y subí tu IFC cuando termines la semana.
          </p>
          <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone">
            Usá el botón "Agente" abajo a la derecha.
          </p>
        </div>

        {(content.prevModulo || content.nextModulo) && (
          <>
            <div className="h-px bg-line mb-8" />
            <div className="flex justify-between gap-4 mb-12">
              {content.prevModulo ? (
                <Link
                  href={`/bootcamp/${content.prevModulo}`}
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
                >
                  ← Anterior
                </Link>
              ) : (
                <span />
              )}
              {content.nextModulo && (
                <Link
                  href={`/bootcamp/${content.nextModulo}`}
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
                >
                  Siguiente →
                </Link>
              )}
            </div>
          </>
        )}

        <div className="h-px bg-line mb-8" />
        <p className="eyebrow mb-6">Semanas del bootcamp</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allWeeks.map((w, i) => (
            <ModuleCard
              key={w.slug}
              number={`0${i + 1}`}
              title={w.title}
              description="Bootcamp CAD→BIM"
              href={`/bootcamp/${w.slug}`}
            />
          ))}
        </div>
      </ContentArea>
    </div>
  );
}
