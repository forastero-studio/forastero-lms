import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import CertificateRequest from "@/components/CertificateRequest";
import { getBootcampWeeks } from "@/lib/content";
import { hasAccess, getProgress, getUserByClerkId } from "@/lib/db";
import { computeDripStatus, WeekStatus } from "@/lib/bootcamp";
import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

function statusLabel(s: WeekStatus): string {
  if (s === "completed") return "IFC validado";
  if (s === "available") return "Disponible";
  return "Completá la semana anterior";
}

function statusClass(s: WeekStatus): string {
  if (s === "completed") return "text-green-700";
  if (s === "available") return "text-ink";
  return "text-stone/50";
}

export default async function BootcampDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const access = await hasAccess(userId, "bootcamp");
  if (!access) redirect("/bootcamp");

  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

  const weeks = getBootcampWeeks().filter((w) => (w.semana ?? 0) >= 1);
  const completedSlugs = await getProgress(userId, "bootcamp");
  const dripStatus = computeDripStatus(completedSlugs);

  const completedCount = dripStatus.filter((w) => w.status === "completed").length;

  // Certificado: buscar si ya tiene uno emitido
  const dbUser = await getUserByClerkId(userId);
  const existingCert = dbUser
    ? await supabaseAdmin
        .from("certificates")
        .select("id, pdf_url")
        .eq("user_id", dbUser.id)
        .eq("revoked", false)
        .maybeSingle()
        .then((r) => r.data)
    : null;

  return (
    <ContentArea>
      <p className="eyebrow mb-6">Bootcamp CAD→BIM</p>
      <h1 className="text-4xl font-light tracking-tight text-ink mb-2">
        {name}
      </h1>
      <p className="text-sm font-light text-stone mb-10">
        {completedCount}/8 semanas con IFC validado
      </p>

      {/* Barra de progreso */}
      <div className="w-full bg-line h-px mb-1 relative">
        <div
          className="absolute top-0 left-0 h-px bg-ink transition-all"
          style={{ width: `${(completedCount / 8) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mb-10">
        <span className="font-mono text-[9px] tracking-[.08em] text-stone">Semana 1</span>
        <span className="font-mono text-[9px] tracking-[.08em] text-stone">Semana 8</span>
      </div>

      {/* Links de acceso rápido */}
      <div className="flex gap-4 mb-10 flex-wrap">
        <Link
          href="/bootcamp/guia"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-stone border border-line px-4 py-2 hover:border-ink hover:text-ink transition-colors"
        >
          Cómo arrancar →
        </Link>
      </div>

      {/* Agente */}
      <div className="border border-line bg-paper p-6 mb-10 max-w-md">
        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-2">
          Agente Forastero · BIM
        </p>
        <p className="text-sm font-light text-stone mb-4">
          Tu asistente sabe en qué semana estás, qué proyecto elegiste y qué
          software usás. Preguntale lo que necesitás y subí tu IFC desde ahí.
        </p>
        <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone">
          Usá el botón "Agente" abajo a la derecha para abrirlo en esta pantalla.
        </p>
      </div>

      {/* Lista de semanas */}
      <div className="h-px bg-line mb-8" />
      <p className="eyebrow mb-6">Tu progreso por semana</p>

      <div className="flex flex-col divide-y divide-line border border-line">
        {weeks.map((w, i) => {
          const drip = dripStatus[i];
          const isLocked = drip.status === "locked_prev";
          const weekLabel = statusLabel(drip.status);
          const labelClass = statusClass(drip.status);

          return (
            <div
              key={w.slug}
              className={`flex items-start justify-between gap-4 px-6 py-5 bg-white ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-5 flex-1 min-w-0">
                <span className="font-mono text-[10px] tracking-[.1em] text-stone shrink-0 pt-0.5">
                  {String(drip.weekNum).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-light text-ink leading-snug">{w.title}</p>
                  {w.duracion_estimada && (
                    <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/50 mt-1">
                      {w.duracion_estimada}
                    </p>
                  )}
                  {drip.status === "locked_prev" && (
                    <p className="font-mono text-[9px] tracking-[.08em] text-stone/40 mt-1">
                      Completá la validación IFC de Semana {drip.weekNum - 1} para desbloquear
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className={`font-mono text-[9px] tracking-[.08em] uppercase ${labelClass}`}>
                  {weekLabel}
                </span>
                {!isLocked && (
                  <Link
                    href={`/bootcamp/${w.slug}`}
                    className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line px-3 py-1.5 hover:border-ink transition-colors"
                  >
                    Abrir →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {completedCount === 8 && (
        <>
          <div className="h-px bg-line mb-8 mt-8" />
          <p className="eyebrow mb-6">Tu certificado</p>
          <CertificateRequest existingCert={existingCert} />
        </>
      )}

      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mt-8">
        Forastero · BIM Bootcamp
      </p>
    </ContentArea>
  );
}
