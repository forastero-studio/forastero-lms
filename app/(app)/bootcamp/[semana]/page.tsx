import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import AgentPanel from "@/components/AgentPanel";
import ModuleCard from "@/components/ModuleCard";
import MarkdownBody from "@/components/ui/MarkdownBody";
import { getBootcampWeek, getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress } from "@/lib/db";
import { computeDripStatus } from "@/lib/bootcamp";
import Link from "next/link";

interface Props {
  params: Promise<{ semana: string }>;
}

export async function generateStaticParams() {
  const weeks = getBootcampWeeks();
  return weeks.map((w) => ({ semana: w.slug }));
}

export default async function SemanaPage({ params }: Props) {
  const { semana } = await params;
  const content = getBootcampWeek(semana);
  if (!content) notFound();

  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "bootcamp") : false;

  // Drip check: verificar si la semana está desbloqueada para este alumno
  if (access && userId && content.semana) {
    const completedSlugs = await getProgress(userId, "bootcamp");
    const dripStatus = computeDripStatus(completedSlugs);
    const weekDrip = dripStatus[content.semana - 1];
    if (weekDrip && weekDrip.status === "locked_prev") {
      const lockReason = `Completá la validación IFC de Semana ${content.semana - 1} para desbloquear esta semana.`;
      return (
        <ContentArea>
          <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
          <h1 className="text-4xl font-light text-ink mb-4" style={{ letterSpacing: "-0.03em" }}>
            {content.title}
          </h1>
          <div className="h-px bg-line my-8" />
          <div className="max-w-md">
            <p className="text-base font-light text-deep mb-2">Semana no disponible todavía.</p>
            <p className="text-sm font-light text-stone mb-6">{lockReason}</p>
            <Link href="/bootcamp/dashboard" className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors">
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
          className="text-4xl font-light text-ink mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          {content.title}
        </h1>
        <div className="h-px bg-line my-8" />
        <div className="max-w-md">
          <p className="text-base font-light text-deep mb-2">
            Este contenido es exclusivo para alumnos del Bootcamp CAD→BIM.
          </p>
          <p className="text-sm font-light text-stone mb-6">
            8 semanas de transición real de CAD a BIM: organización de archivos,
            familias base, documentación, coordinación y entrega final.
          </p>
          <Link
            href="/bootcamp"
            className="inline-block text-xs font-mono tracking-wider uppercase text-paper bg-ink px-5 py-3 hover:bg-rust transition-colors"
          >
            Comprar Bootcamp
          </Link>
        </div>
      </ContentArea>
    );
  }

  const allWeeks = getBootcampWeeks();

  return (
    <div className="flex flex-1">
      <ContentArea>
        <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
        <h1
          className="text-4xl font-light text-ink mb-2"
          style={{ letterSpacing: "-0.03em" }}
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
          <div className="aspect-video w-full rounded-md overflow-hidden mb-10 bg-muted">
            <iframe
              src={`https://drive.google.com/file/d/${content.videoDriveId}/preview`}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        )}

        <div className="max-w-none mb-10">
          {content.body.trim() ? (
            <MarkdownBody content={content.body} />
          ) : (
            <div className="border border-line bg-white p-8 max-w-lg">
              <p className="text-base font-light text-deep mb-2">
                Este contenido está en preparación.
              </p>
              <p className="text-sm font-light text-stone">
                Lo vas a tener disponible pronto. Cualquier consulta:{" "}
                <a href="mailto:info@forastero.studio" className="text-ink hover:text-rust transition-colors">
                  info@forastero.studio
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Botón al agente */}
        <div className="border border-line bg-white p-6 max-w-md mb-16">
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-2">
            Agente Forastero · BIM
          </p>
          <p className="text-sm font-light text-stone mb-4">
            El agente sabe que estás en {content.title}. Preguntale lo que necesitás
            y subí tu IFC para validación cuando termines la semana.
          </p>
          <a
            href="https://forastero-bim.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
          >
            Abrir agente →
          </a>
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

      <AgentPanel />
    </div>
  );
}
