import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import { getTallerModules, getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress } from "@/lib/db";
import { computeDripStatus } from "@/lib/bootcamp";
import Link from "next/link";


export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";
  const email = user?.emailAddresses[0]?.emailAddress ?? "";

  const tallerModules = getTallerModules();
  const bootcampWeeks = getBootcampWeeks();

  // Acceso separado por producto
  // TODO: hasAccess("cad-management") cubre taller + pack para backward compat.
  // Usuarios con solo "workshop-cotizacion" pueden no tener cadAccess — verificar.
  const [cadAccess, workshopAccess, bootcampAccess] = await Promise.all([
    hasAccess(userId, "cad-management"),
    hasAccess(userId, "workshop-cotizacion"),
    hasAccess(userId, "bootcamp"),
  ]);

  const tallerAccess = cadAccess;
  const hasAnyCourse = cadAccess || workshopAccess || bootcampAccess;

  // Progreso: todos los slugs CAD se trackean bajo "cad-management"
  // TODO: Migrar a product_slug separados (taller-documentacion / workshop-cotizacion)
  const [cadProgress, bootcampProgress] = await Promise.all([
    cadAccess || workshopAccess
      ? getProgress(userId, "cad-management")
      : Promise.resolve([]),
    bootcampAccess ? getProgress(userId, "bootcamp") : Promise.resolve([]),
  ]);

  const dripStatus = bootcampAccess ? computeDripStatus(bootcampProgress) : [];
  const completedWeeks = dripStatus.filter((w) => w.status === "completed").length;

  const currentDrip = dripStatus.find((d) => d.status === "available");
  const nextBootcampWeek = currentDrip
    ? bootcampWeeks.find((w, i) => (w.semana ?? i + 1) === currentDrip.weekNum)
    : null;

  const nextTallerModule = tallerAccess
    ? tallerModules.find((m) => !cadProgress.includes(m.slug))
    : null;

  // Próximo paso — prioridad: bootcamp > taller
  let nextStep: { label: string; href: string } | null = null;
  if (bootcampAccess) {
    if (nextBootcampWeek) {
      nextStep = {
        label: `Continuar Semana ${currentDrip!.weekNum} del Bootcamp`,
        href: `/bootcamp/${nextBootcampWeek.slug}`,
      };
    } else if (completedWeeks === 0) {
      nextStep = {
        label: "Empezá por la Semana 1 del Bootcamp",
        href: "/bootcamp/semana-1",
      };
    }
  } else if (tallerAccess && nextTallerModule) {
    nextStep = {
      label: `Continuar Módulo ${nextTallerModule.moduloLetra ?? nextTallerModule.slug} del Taller`,
      href: `/cad-management/${nextTallerModule.slug}`,
    };
  }

  return (
    <ContentArea>
      {/* 3.1 Saludo */}
      <h1 className="text-4xl font-semibold tracking-tight text-ink mb-1">
        Hola {name}
      </h1>
      {email && (
        <p className="font-mono text-[10px] tracking-[.08em] text-stone mb-10">{email}</p>
      )}

      {!hasAnyCourse && (
        <>
          <div className="h-px bg-line mb-8" />
          <div className="max-w-md">
            <p className="text-base text-stone mb-2">
              Todavía no tenés formaciones activas.
            </p>
            <p className="text-sm text-stone mb-6">
              Explorá las formaciones disponibles y empezá cuando quieras.
            </p>
            <Link
              href="/"
              className="inline-block font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              Ver formaciones
            </Link>
          </div>
        </>
      )}

      {hasAnyCourse && (
        <>
          {/* 3.3 Próximo paso */}
          {nextStep && (
            <>
              <div className="h-px bg-line mb-8" />
              <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-4">Próximo paso</p>
              <Link
                href={nextStep.href}
                className="inline-block border border-ink text-sm font-light text-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors"
              >
                {nextStep.label} →
              </Link>
            </>
          )}

          {/* Mis formaciones */}
          <div className="h-px bg-line mt-10 mb-8" />
          <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-6">Mis formaciones</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {tallerAccess && (
              <div className="border border-line bg-paper p-6 flex flex-col gap-5">
                <p className="text-sm text-ink leading-snug">
                  Taller de Documentación de Obras
                </p>
                <Link
                  href="/cad-management"
                  className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-line px-4 py-2 hover:border-ink hover:bg-ink hover:text-paper transition-colors self-start"
                >
                  Acceder →
                </Link>
              </div>
            )}
            {workshopAccess && (
              <div className="border border-line bg-paper p-6 flex flex-col gap-5">
                <p className="text-sm text-ink leading-snug">
                  Workshop Cotización de Obras
                </p>
                <Link
                  href="/cad-management/workshop-cotizacion"
                  className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-line px-4 py-2 hover:border-ink hover:bg-ink hover:text-paper transition-colors self-start"
                >
                  Acceder →
                </Link>
              </div>
            )}
            {bootcampAccess && (
              <div className="border border-line bg-paper p-6 flex flex-col gap-5">
                <div>
                  <p className="text-sm font-light text-ink leading-snug mb-1">
                    Bootcamp CAD→BIM
                  </p>
                  <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone">
                    {completedWeeks < 8
                      ? `Semana ${completedWeeks + 1} de 8`
                      : "8 de 8 · completado"}
                  </p>
                </div>
                <Link
                  href="/bootcamp/dashboard"
                  className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-line px-4 py-2 hover:border-ink hover:bg-ink hover:text-paper transition-colors self-start"
                >
                  Acceder →
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </ContentArea>
  );
}
