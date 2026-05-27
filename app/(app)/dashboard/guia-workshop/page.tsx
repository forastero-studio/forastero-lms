import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/db";
import ContentArea from "@/components/ContentArea";
import Link from "next/link";

export const metadata = {
  title: "Cómo recorrer el Workshop · Forastero",
};

export default async function GuiaWorkshopPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const access = await hasAccess(userId, "workshop-cotizacion");
  if (!access) redirect("/dashboard");

  return (
    <ContentArea>
      <p className="technical-header mb-8">forastero · workshop · guía del alumno</p>

      <h1
        className="font-display text-4xl font-light text-ink mb-2 tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        Cómo recorrer el Workshop
      </h1>
      <p className="text-sm font-light text-stone mb-12">
        Lo que necesitás saber antes de empezar el Workshop de Cotización de Obras.
      </p>

      <div className="flex flex-col gap-10 max-w-2xl">
        <div>
          <p className="eyebrow mb-3">01 · estructura</p>
          <h2 className="text-lg font-light text-ink mb-3">
            2 clases independientes
          </h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            El Workshop está dividido en 2 clases: Cotización de obra y Cómputo
            de obra. Cada clase tiene un video y archivos descargables (Excel,
            DWG). Todas las clases están disponibles desde el inicio — sin
            desbloqueos por progreso. Acceso de por vida + actualizaciones
            incluidas.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">02 · prerequisito</p>
          <h2 className="text-lg font-light text-ink mb-3">
            Conocimiento previo recomendado
          </h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            El Workshop asume que manejás AutoCAD® a nivel intermedio y que
            tenés noción de cómo se organiza un proyecto de documentación.
            Si todavía no hiciste el Taller de Documentación de Obras, te
            recomendamos empezar por ahí.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">03 · dudas</p>
          <h2 className="text-lg font-light text-ink mb-3">Soporte por email</h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            Cualquier consulta:{" "}
            <a
              href="mailto:info@forastero.studio"
              className="text-ink hover:text-stone transition-colors"
            >
              info@forastero.studio
            </a>
            .
          </p>
        </div>
      </div>

      <div className="h-px bg-line mt-12 mb-8" />
      <div className="flex gap-6">
        <Link
          href="/dashboard"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line px-4 py-2 hover:border-ink transition-colors"
        >
          ← Dashboard
        </Link>
        <Link
          href="/cad-management/workshop-cotizacion"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-paper px-4 py-2 hover:opacity-80 transition-opacity"
          style={{ background: "var(--rust)" }}
        >
          Empezar Clase 1 →
        </Link>
      </div>
    </ContentArea>
  );
}
