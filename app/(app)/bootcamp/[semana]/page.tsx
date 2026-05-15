import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import AgentPanel from "@/components/AgentPanel";
import ModuleCard from "@/components/ModuleCard";
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
        <div className="h-px bg-line my-8" />

        <div className="font-light text-deep leading-relaxed max-w-none mb-16">
          {content.body.split("\n").map((line, i) => {
            if (line.startsWith("# ")) return null;
            if (line.startsWith("## "))
              return (
                <h2
                  key={i}
                  className="text-2xl font-light text-ink mt-10 mb-4"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {line.slice(3)}
                </h2>
              );
            if (line.startsWith("- "))
              return (
                <p key={i} className="text-deep font-light text-sm mb-1 pl-4">
                  · {line.slice(2)}
                </p>
              );
            if (line.startsWith("> "))
              return (
                <blockquote
                  key={i}
                  className="border-l border-ink pl-5 my-6 text-stone font-light text-sm"
                >
                  {line.slice(2)}
                </blockquote>
              );
            if (line.trim() === "") return <div key={i} className="h-3" />;
            return (
              <p key={i} className="text-deep font-light text-base leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>

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
