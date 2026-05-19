import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import AgentPanel from "@/components/AgentPanel";
import ModuleCard from "@/components/ModuleCard";
import MarkdownBody from "@/components/ui/MarkdownBody";
import { getBootcampWeek, getBootcampWeeks } from "@/lib/content";
import { hasAccess } from "@/lib/db";
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

        <div className="max-w-none mb-16">
          {content.body.trim() ? (
            <MarkdownBody content={content.body} />
          ) : (
            <div className="border border-line bg-white p-8 max-w-lg">
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-4">
                Cohorte 0
              </p>
              <p className="text-base font-light text-deep mb-2">
                Inicia el lunes 7 de julio de 2026.
              </p>
              <p className="text-sm font-light text-stone">
                Esta semana se desbloquea cuando arranque la cohorte. Vas a
                recibir un email con instrucciones unos días antes del inicio.
              </p>
            </div>
          )}
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
