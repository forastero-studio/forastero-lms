import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import ModuleCard from "@/components/ModuleCard";
import MarkdownBody from "@/components/ui/MarkdownBody";
import DescargablesList from "@/components/DescargablesList";
import { getCadManagementModule, getCadManagementModules, getTallerModules, getWorkshopModules } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

interface Props {
  params: Promise<{ modulo: string }>;
}

export async function generateStaticParams() {
  const modules = getCadManagementModules();
  return modules.map((m) => ({ modulo: m.slug }));
}

export default async function ModuloPage({ params }: Props) {
  const { modulo } = await params;
  const content = getCadManagementModule(modulo);
  if (!content) notFound();

  const { userId } = await auth();
  const isWorkshopModule = getWorkshopModules().some((m) => m.slug === modulo);
  const productSlug = isWorkshopModule ? "workshop-cotizacion" : "cad-management";
  const access = userId ? await hasAccess(userId, productSlug) : false;

  if (!access) {
    return (
      <ContentArea>
        <p className="eyebrow mb-6">CAD Management</p>
        <h1
          className="text-4xl font-light text-ink mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          {content.title}
        </h1>
        <div className="h-px bg-line my-8" />
        <div className="max-w-md">
          <p className="text-base font-light text-deep mb-2">
            No tenés acceso a esta formación todavía.
          </p>
          <p className="text-sm font-light text-stone mb-6">
            Conseguila desde la página principal.
          </p>
          <Link
            href="/"
            className="inline-block text-xs font-mono tracking-wider uppercase text-paper bg-ink px-5 py-3 hover:bg-rust transition-colors"
          >
            Ver formaciones
          </Link>
        </div>
      </ContentArea>
    );
  }

  const allModules = isWorkshopModule ? getWorkshopModules() : getTallerModules();

  return (
    <ContentArea>
      <p className="eyebrow mb-6">CAD Management</p>
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
        <div className="aspect-video w-full rounded-md overflow-hidden mb-10 bg-surface">
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
            <p className="text-base font-light text-deep mb-2">
              Este contenido está en preparación.
            </p>
            <p className="text-sm font-light text-stone">
              Lo vas a tener disponible antes del 1 de junio. Cualquier
              consulta:{" "}
              <a
                href="mailto:info@forastero.studio"
                className="text-ink hover:text-rust transition-colors"
              >
                info@forastero.studio
              </a>
            </p>
          </div>
        )}
      </div>

      {content.descargables && content.descargables.length > 0 && (
        <div className="mb-16">
          <h2
            className="text-2xl font-light text-ink mt-10 mb-4"
            style={{ letterSpacing: "-0.025em" }}
          >
            Recursos del módulo
          </h2>
          <DescargablesList items={content.descargables} />
        </div>
      )}

      {(content.prevModulo || content.nextModulo) && (
        <>
          <div className="h-px bg-line mb-8" />
          <div className="flex justify-between gap-4 mb-12">
            {content.prevModulo ? (
              <Link
                href={`/cad-management/${content.prevModulo}`}
                className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
              >
                ← Anterior
              </Link>
            ) : (
              <span />
            )}
            {content.nextModulo && (
              <Link
                href={`/cad-management/${content.nextModulo}`}
                className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
              >
                Siguiente →
              </Link>
            )}
          </div>
        </>
      )}

      <div className="h-px bg-line mb-8" />
      <p className="eyebrow mb-6">{isWorkshopModule ? "Clases del workshop" : "Módulos del taller"}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allModules.map((m, i) => (
          <ModuleCard
            key={m.slug}
            number={`0${i + 1}`}
            title={m.title}
            description="CAD Management"
            href={`/cad-management/${m.slug}`}
          />
        ))}
      </div>
    </ContentArea>
  );
}
