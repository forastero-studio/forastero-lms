import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/db";
import ContentArea from "@/components/ContentArea";
import Link from "next/link";

export const metadata = {
  title: "Cómo recorrer el Taller · Forastero",
};

export default async function GuiaTallerPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const access = await hasAccess(userId, "cad-management");
  if (!access) redirect("/dashboard");

  return (
    <ContentArea>
      <p className="technical-header mb-8">forastero · taller · guía del alumno</p>

      <h1
        className="font-display text-4xl font-light text-ink mb-2 tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        Cómo recorrer el Taller
      </h1>
      <p className="text-sm font-light text-stone mb-12">
        Lo que necesitás saber antes de empezar el Taller de Documentación de Obras.
      </p>

      <div className="flex flex-col gap-10 max-w-2xl">
        <div>
          <p className="eyebrow mb-3">01 · estructura</p>
          <h2 className="text-lg font-light text-ink mb-3">
            7 módulos organizados en 4 clases
          </h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            El Taller está dividido en 7 módulos (A a G), agrupados en 4 clases.
            Cada módulo tiene un video explicativo, una guía práctica en PDF y
            archivos descargables (DWG, CTB, Excel). Todas las clases están
            disponibles desde el inicio — avanzás a tu ritmo, sin desbloqueos
            por progreso.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">02 · recursos</p>
          <h2 className="text-lg font-light text-ink mb-3">
            Guías, planos y plantillas incluidos
          </h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            Cada módulo incluye los archivos de trabajo que usás en clase
            (planos DWG, plantillas CTB, planillas Excel) y las guías prácticas
            en PDF que explicamos en video. Podés descargarlos directamente
            desde la plataforma.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">03 · dudas</p>
          <h2 className="text-lg font-light text-ink mb-3">Soporte por email</h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            Cualquier consulta sobre el contenido: escribinos a{" "}
            <a
              href="mailto:info@forastero.studio"
              className="text-ink hover:text-stone transition-colors"
            >
              info@forastero.studio
            </a>
            . Acceso de por vida + actualizaciones incluidas.
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
          href="/cad-management/modulo-a"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-paper px-4 py-2 hover:opacity-80 transition-opacity"
          style={{ background: "var(--rust)" }}
        >
          Empezar Módulo A →
        </Link>
      </div>
    </ContentArea>
  );
}
