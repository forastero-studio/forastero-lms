import { notFound } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import ModuleCard from "@/components/ModuleCard";
import { getCadManagementModule, getCadManagementModules } from "@/lib/content";

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

  const allModules = getCadManagementModules();

  return (
    <ContentArea>
      <p className="eyebrow mb-6">CAD Management</p>
      <h1
        className="text-4xl font-light text-ink mb-2"
        style={{ letterSpacing: "-0.03em" }}
      >
        {content.title}
      </h1>
      <div className="h-px bg-line my-8" />

      <div className="prose prose-sm font-light text-deep leading-relaxed max-w-none mb-16">
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
          if (line.startsWith("### "))
            return (
              <h3 key={i} className="text-lg font-light text-ink mt-6 mb-3">
                {line.slice(4)}
              </h3>
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
      <p className="eyebrow mb-6">Módulos del taller</p>
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
