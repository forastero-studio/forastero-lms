import { notFound } from "next/navigation";
import { getLegalPage } from "@/lib/content";
import MarkdownBody from "@/components/ui/MarkdownBody";
import Link from "next/link";

interface Props {
  params: Promise<{ documento: string }>;
}

export async function generateStaticParams() {
  return [
    { documento: "terminos-y-condiciones" },
    { documento: "privacidad" },
    { documento: "reembolso" },
  ];
}

export default async function LegalPage({ params }: Props) {
  const { documento } = await params;
  const page = getLegalPage(documento);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-16 max-w-3xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors mb-12 inline-block"
        >
          ← forastero
        </Link>

        <h1
          className="text-4xl font-light text-ink mb-3"
          style={{ letterSpacing: "-0.03em" }}
        >
          {page.title}
        </h1>

        {page.ultimaActualizacion && (
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-10">
            Última actualización: {page.ultimaActualizacion}
          </p>
        )}

        <div className="h-px bg-line mb-10" />

        <MarkdownBody content={page.body} />

        <div className="h-px bg-line mt-16 mb-8" />
        <div className="flex gap-8">
          {[
            { href: "/legal/terminos-y-condiciones", label: "Términos" },
            { href: "/legal/privacidad", label: "Privacidad" },
            { href: "/legal/reembolso", label: "Reembolso" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
