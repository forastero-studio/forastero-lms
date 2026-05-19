import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { getBootcampWeeks } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

export default async function BootcampProductPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "bootcamp") : false;
  const weeks = getBootcampWeeks();

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-20 max-w-5xl mx-auto">
        <p className="eyebrow mb-6">Bootcamp · 8 semanas</p>
        <h1
          className="text-5xl font-light leading-tight mb-6 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          Bootcamp CAD→BIM
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-10">
          La transición completa a BIM. Con agente Forastero integrado que
          acompaña cada semana del proceso.
        </p>

        {!access && (
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Comprar bootcamp · USD 297
          </BuyButton>
        )}

        {access && (
          <Link
            href={`/bootcamp/${weeks[0]?.slug}`}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Ir a Cohorte 0 →
          </Link>
        )}

        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Programa · Cohorte 0</p>

        <div className="flex flex-col divide-y divide-line border border-line">
          {weeks.map((w, i) => {
            const available = !!w.videoDriveId;
            return (
              <div
                key={w.slug}
                className="flex items-start justify-between gap-6 px-6 py-5 bg-white"
              >
                <div className="flex items-start gap-5 flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[.1em] text-stone shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-light text-ink leading-snug">
                      {w.title}
                    </p>
                    {w.duracion_estimada && (
                      <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mt-1">
                        {w.duracion_estimada}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`font-mono text-[9px] tracking-[.1em] uppercase ${
                      available ? "text-ink" : "text-stone"
                    }`}
                  >
                    {available ? "Disponible" : "Próximamente"}
                  </span>
                  {access ? (
                    <Link
                      href={`/bootcamp/${w.slug}`}
                      className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line px-3 py-1.5 hover:border-ink transition-colors"
                    >
                      Ver →
                    </Link>
                  ) : (
                    <span className="font-mono text-[9px] tracking-[.1em] uppercase text-stone/40 border border-line/40 px-3 py-1.5">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mt-8">
          Cohorte 0 · Inicia el 7 de julio de 2026
        </p>
      </div>
    </main>
  );
}
