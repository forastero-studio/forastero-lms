import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import { getCadManagementModules, getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress, getPurchases } from "@/lib/db";
import { computeDripStatus } from "@/lib/bootcamp";
import Link from "next/link";

const PRODUCT_NAMES: Record<string, string> = {
  "taller-documentacion": "Taller de Documentación de Obras",
  "workshop-cotizacion": "Workshop de Cotización de Obras",
  "pack-cad-management": "Pack CAD Management",
  "bootcamp": "Bootcamp CAD→BIM",
  "pack-completo": "Pack Completo",
  "cad-management": "CAD Management",
  "pack": "Pack",
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

  const cadModules = getCadManagementModules();
  const bootcampWeeks = getBootcampWeeks();

  const [cadAccess, bootcampAccess, purchases] = await Promise.all([
    hasAccess(userId, "cad-management"),
    hasAccess(userId, "bootcamp"),
    getPurchases(userId),
  ]);

  const hasAnyCourse = cadAccess || bootcampAccess;

  const [cadProgress, bootcampProgress] = await Promise.all([
    cadAccess ? getProgress(userId, "cad-management") : Promise.resolve([]),
    bootcampAccess ? getProgress(userId, "bootcamp") : Promise.resolve([]),
  ]);

  const dripStatus = bootcampAccess ? computeDripStatus(bootcampProgress) : [];
  const completedCount = dripStatus.filter((w) => w.status === "completed").length;

  const currentDrip = dripStatus.find((d) => d.status === "available");
  const nextBootcampWeek = currentDrip
    ? bootcampWeeks.find((w, i) => (w.semana ?? i + 1) === currentDrip.weekNum)
    : null;

  const nextCadModule = cadAccess
    ? cadModules.find((m) => !cadProgress.includes(m.slug))
    : null;

  const nextStep = nextBootcampWeek
    ? { label: `Continuar ${nextBootcampWeek.title}`, href: `/bootcamp/${nextBootcampWeek.slug}` }
    : nextCadModule
    ? { label: `Continuar con ${nextCadModule.title}`, href: `/cad-management/${nextCadModule.slug}` }
    : null;

  return (
    <ContentArea>
      <p className="eyebrow mb-6">Dashboard</p>
      <h1 className="text-4xl font-light tracking-tight text-ink mb-1">{name}</h1>
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
          {/* Próximo paso */}
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

          {/* Mi progreso */}
          <div className="h-px bg-line mt-10 mb-8" />
          <p className="eyebrow mb-6">Mi progreso</p>
          <div className="flex flex-col gap-6 max-w-lg">
            {cadAccess && (
              <div>
                <p className="text-sm font-light text-ink mb-3">
                  Taller de Documentación:{" "}
                  <span className="text-stone">
                    {cadProgress.length} / {cadModules.length} módulos completados
                  </span>
                </p>
                <div className="w-full bg-line h-px relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-ink transition-all"
                    style={{ width: `${(cadProgress.length / cadModules.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {bootcampAccess && (
              <div>
                <p className="text-sm font-light text-ink mb-3">
                  Bootcamp CAD→BIM:{" "}
                  <span className="text-stone">
                    {completedCount < 8
                      ? `Semana ${completedCount + 1} en curso (${completedCount} completadas)`
                      : "8 semanas completadas"}
                  </span>
                </p>
                <div className="w-full bg-line h-px relative">
                  <div
                    className="absolute top-0 left-0 h-px bg-ink transition-all"
                    style={{ width: `${(completedCount / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Validaciones IFC */}
          {bootcampAccess && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-6">Validaciones IFC</p>
              <div className="flex flex-wrap border-t border-l border-line max-w-lg">
                {dripStatus.map(({ weekNum, status }) => (
                  <div
                    key={weekNum}
                    className="w-1/4 border-r border-b border-line px-4 py-3 bg-white"
                  >
                    <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-1">
                      S{weekNum}
                    </p>
                    <p
                      className={`font-mono text-[9px] tracking-[.06em] ${
                        status === "completed"
                          ? "text-green-700"
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
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Certificado */}
          {bootcampAccess && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-4">Certificado</p>
              {completedCount === 8 ? (
                <Link
                  href="/bootcamp/dashboard"
                  className="font-mono text-[10px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
                >
                  Ver certificado →
                </Link>
              ) : (
                <p className="text-sm font-light text-stone max-w-md">
                  En curso · {completedCount} de 8 semanas completadas. Cuando completes
                  las 8 semanas con validación aprobada, el certificado se emite
                  automáticamente y te llega por email.
                </p>
              )}
            </>
          )}

          {/* Mis productos */}
          {purchases.length > 0 && (
            <>
              <div className="h-px bg-line mt-10 mb-8" />
              <p className="eyebrow mb-4">Mis productos</p>
              <div className="flex flex-col gap-2">
                {purchases.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 flex-wrap">
                    <span className="text-[13px] text-green-700">✓</span>
                    <span className="text-sm font-light text-ink">
                      {PRODUCT_NAMES[p.product_slug] ?? p.product_slug}
                    </span>
                    {p.created_at && (
                      <span className="font-mono text-[9px] tracking-[.06em] text-stone">
                        · {formatDate(p.created_at)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </ContentArea>
  );
}
