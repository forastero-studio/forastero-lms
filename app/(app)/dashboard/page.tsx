import { auth, currentUser } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import ProgressTracker from "@/components/ProgressTracker";
import { hasAccess, getProgress } from "@/lib/db";
import { getCadManagementModules, getBootcampWeeks } from "@/lib/content";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

  const cadModules = getCadManagementModules();
  const bootcampWeeks = getBootcampWeeks();

  const [cadAccess, bootcampAccess] = await Promise.all([
    hasAccess(userId, "cad-management"),
    hasAccess(userId, "bootcamp"),
  ]);

  const [cadProgress, bootcampProgress] = await Promise.all([
    cadAccess ? getProgress(userId, "cad-management") : Promise.resolve([]),
    bootcampAccess ? getProgress(userId, "bootcamp") : Promise.resolve([]),
  ]);

  const nextCadModule = cadModules.find((m) => !cadProgress.includes(m.slug));
  const nextBootcampWeek = bootcampWeeks.find(
    (w) => !bootcampProgress.includes(w.slug)
  );

  const hasAnyCourse = cadAccess || bootcampAccess;

  return (
    <ContentArea>
      <p className="eyebrow mb-8">Tu progreso</p>
      <h1 className="text-4xl font-light tracking-tight text-ink mb-10">
        Hola, {name}
      </h1>

      {!hasAnyCourse ? (
        <div className="border border-line bg-white p-8 max-w-md">
          <p className="text-base font-light text-deep mb-2">
            Todavía no tenés cursos.
          </p>
          <p className="text-sm font-light text-stone mb-6">
            Explorá las opciones disponibles y empezá a aprender.
          </p>
          <div className="flex gap-4">
            <Link
              href="/cad-management"
              className="text-xs font-mono tracking-wider uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              CAD Management
            </Link>
            <Link
              href="/bootcamp"
              className="text-xs font-mono tracking-wider uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              Bootcamp
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cadAccess && (
            <div className="flex flex-col gap-4">
              <ProgressTracker
                title="CAD Management"
                modules={cadModules.map((m) => ({
                  label: m.title,
                  done: cadProgress.includes(m.slug),
                }))}
              />
              {nextCadModule && (
                <Link
                  href={`/cad-management/${nextCadModule.slug}`}
                  className="text-xs font-mono tracking-wider uppercase text-ink border border-ink px-4 py-2 text-center hover:bg-ink hover:text-paper transition-colors"
                >
                  Continuar
                </Link>
              )}
            </div>
          )}
          {bootcampAccess && (
            <div className="flex flex-col gap-4">
              <ProgressTracker
                title="Bootcamp CAD→BIM"
                modules={bootcampWeeks.map((w) => ({
                  label: w.title,
                  done: bootcampProgress.includes(w.slug),
                }))}
              />
              {nextBootcampWeek && (
                <Link
                  href={`/bootcamp/${nextBootcampWeek.slug}`}
                  className="text-xs font-mono tracking-wider uppercase text-ink border border-ink px-4 py-2 text-center hover:bg-ink hover:text-paper transition-colors"
                >
                  Continuar
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </ContentArea>
  );
}
