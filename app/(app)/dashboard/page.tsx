import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import { getTallerModules, getWorkshopModules, getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress, getPurchases } from "@/lib/db";
import { computeDripStatus } from "@/lib/bootcamp";
import Link from "next/link";

const PRODUCT_NAMES: Record<string, string> = {
  "taller-documentacion": "Taller de Documentación de Obras",
  "workshop-cotizacion": "Workshop de Cotización de Obras",
  "pack-cad-management": "Pack CAD Management",
  "bootcamp": "Bootcamp CAD→BIM",
  "pack-completo": "Pack CAD Management + Bootcamp",
  "cad-management": "CAD Management",
  "pack": "Pack",
};

// Primer slug de acceso para cada producto
const PRODUCT_ACCESS_HREF: Record<string, string> = {
  "taller-documentacion": "/cad-management/modulo-a",
  "workshop-cotizacion": "/cad-management/workshop-cotizacion",
  "pack-cad-management": "/cad-management/modulo-a",
  "bootcamp": "/bootcamp/dashboard",
  "pack-completo": "/bootcamp/dashboard",
  "cad-management": "/cad-management/modulo-a",
  "pack": "/bootcamp/dashboard",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

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
  const workshopModules = getWorkshopModules();
  const bootcampWeeks = getBootcampWeeks();

  // Acceso separado por producto
  // TODO: hasAccess("cad-management") cubre taller + pack para backward compat.
  // Usuarios con solo "workshop-cotizacion" pueden no tener cadAccess — verificar.
  const [cadAccess, workshopAccess, bootcampAccess, purchases] = await Promise.all([
    hasAccess(userId, "cad-management"),
    hasAccess(userId, "workshop-cotizacion"),
    hasAccess(userId, "bootcamp"),
    getPurchases(userId),
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

  const tallerSlugs = new Set(tallerModules.map((m) => m.slug));
  const workshopSlugs = new Set(workshopModules.map((m) => m.slug));

  const tallerCompleted = cadProgress.filter((s) => tallerSlugs.has(s)).length;
  const workshopCompleted = cadProgress.filter((s) => workshopSlugs.has(s)).length;

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
      <h1 className="text-4xl font-light tracking-tight text-ink mb-1">
        Hola {name}
      </h1>
      {email && (
        <p className="font-mono text-[10px] tracking-[.08em] text-stone mb-10">{email}</p>
      )}

      {!hasAnyCourse && (
        <>
          <div className="h-px bg-line mb-8" />
          <div className="max-w-md">
            <p className="text-base font-light text-deep mb-2">
              Todavía no tenés cursos activos.
            </p>
            <p className="text-sm font-light text-stone mb-6">
              Explorá las opciones disponibles y empezá.
            </p>
            <div className="flex gap-4">
              <Link
                href="/cad-management"
                className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
              >
                CAD Management
              </Link>
              <Link
                href="/bootcamp"
                className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
              >
                Bootcamp
              </Link>
            </div>
          </div>
        </>
      )}

      {hasAnyCourse && (
        <>
          {/* 3.3 Próximo paso */}
          {nextStep && (
            <>
              <div className="h-px bg-line mb-8" />
              <p className="eyebrow mb-4">Próximo paso</p>
              <Link
                href={nextStep.href}
                className="inline-block border border-ink text-sm font-light text-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors"
              >
                {nextStep.label} →
              </Link>
            </>
          )}

          {/* 3.2 Mi progreso */}
          <div className="h-px bg-line mt-10 mb-8" />
          <p className="eyebrow mb-6">Mi progreso</p>
          <div className="flex flex-col gap-6 max-w-lg">
            {tallerAccess && (
              <div>
                <p className="text-sm font-light text-ink mb-3">
                  Taller de Documentación de Obras —{" "}
                  <span className="text-stone">
                    {tallerCompleted} de {tallerModules.length} módulos completados
                  </span>
                </p>
                <div className="w-full bg-line h-px relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-ink transition-all"
                    style={{
                      width: `${tallerModules.length > 0 ? (tallerCompleted / tallerModules.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {workshopAccess && (
              <div>
                <p className="text-sm font-light text-ink mb-3">
                  Workshop Cotización de Obras —{" "}
                  <span className="text-stone">
                    {workshopCompleted} de {workshopModules.length} módulos completados
                  </span>
                </p>
                <div className="w-full bg-line h-px relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-ink transition-all"
                    style={{
                      width: `${workshopModules.length > 0 ? (workshopCompleted / workshopModules.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {bootcampAccess && (
              <div>
                <p className="text-sm font-light text-ink mb-3">
                  Bootcamp CAD→BIM —{" "}
                  <span className="text-stone">
                    {completedWeeks < 8
                      ? `Semana ${completedWeeks + 1} en curso · ${completedWeeks} de 8 completadas`
                      : "8 semanas completadas"}
                  </span>
                </p>
                <div className="w-full bg-line h-px relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-ink transition-all"
                    style={{ width: `${(completedWeeks / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3.4 Validaciones IFC */}
          {bootcampAccess && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-6">Validaciones IFC</p>
              <div className="flex flex-wrap border-t border-l border-line max-w-lg">
                {dripStatus.map(({ weekNum, status }) => {
                  const week = bootcampWeeks.find((w, i) => (w.semana ?? i + 1) === weekNum);
                  const href = week ? `/bootcamp/${week.slug}` : "#";
                  return (
                    <Link
                      key={weekNum}
                      href={status !== "locked_prev" ? href : "#"}
                      className="w-1/4 border-r border-b border-line px-4 py-3 bg-white hover:bg-muted transition-colors"
                    >
                      <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-1">
                        S{weekNum}
                      </p>
                      <p
                        className={`font-mono text-[9px] tracking-[.06em] ${
                          status === "completed"
                            ? "text-rust"
                            : status === "available"
                            ? "text-ink"
                            : "text-stone/40"
                        }`}
                      >
                        {status === "completed"
                          ? "✓ validado"
                          : status === "available"
                          ? "▶ en curso"
                          : "— bloqueada"}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* 3.5 Certificado */}
          {bootcampAccess && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-4">Certificado</p>
              {completedWeeks === 8 ? (
                <Link
                  href="/bootcamp/dashboard"
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
                >
                  Ver certificado →
                </Link>
              ) : (
                <p className="text-sm font-light text-stone max-w-md">
                  En curso · {completedWeeks} de 8 semanas. Cuando completes las 8 semanas
                  con validación verde o amarillo, el certificado se emite automáticamente
                  y te llega por email.
                </p>
              )}
            </>
          )}

          {/* 3.6 Mis productos */}
          {purchases.length > 0 && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-4">Mis productos</p>
              <div className="flex flex-col gap-3">
                {purchases.map((p, i) => {
                  const href = PRODUCT_ACCESS_HREF[p.product_slug];
                  return (
                    <div key={i} className="flex items-center gap-3 flex-wrap">
                      <span className="text-[13px] text-rust">✓</span>
                      <span className="text-sm font-light text-ink">
                        {PRODUCT_NAMES[p.product_slug] ?? p.product_slug}
                      </span>
                      {p.created_at && (
                        <span className="font-mono text-[9px] tracking-[.06em] text-stone">
                          · comprado {formatDate(p.created_at)}
                        </span>
                      )}
                      {href && (
                        <Link
                          href={href}
                          className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line px-3 py-1 hover:border-ink transition-colors"
                        >
                          Acceder →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </ContentArea>
  );
}
