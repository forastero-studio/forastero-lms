import { auth } from "@clerk/nextjs/server";
import BuyButton from "@/components/ui/BuyButton";
import { getCadManagementModules } from "@/lib/content";
import { hasAccess } from "@/lib/db";
import Link from "next/link";

export default async function CadManagementProductPage() {
  const { userId } = await auth();
  const access = userId ? await hasAccess(userId, "cad-management") : false;
  const modules = getCadManagementModules();

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-8 md:px-14 py-20 max-w-5xl mx-auto">
        <p className="eyebrow mb-6">Taller</p>
        <h1
          className="text-5xl font-light leading-tight mb-6 text-ink"
          style={{ letterSpacing: "-0.04em" }}
        >
          CAD Management
        </h1>
        <p className="text-xl font-light text-deep leading-relaxed max-w-2xl mb-10">
          Ordená tu producción en CAD. Documentación de obras y cotizaciones con
          un sistema claro y repetible.
        </p>

        {!access && (
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Comprar taller · USD 99
          </BuyButton>
        )}

        {access && (
          <Link
            href={`/cad-management/${modules[0]?.slug}`}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors mb-20"
          >
            Continuar taller →
          </Link>
        )}

        <div className="h-px bg-line mb-10" />
        <p className="eyebrow mb-8">Programa</p>

        <div className="flex flex-col divide-y divide-line border border-line">
          {modules.map((m, i) => {
            const available = !!m.videoDriveId;
            return (
              <div
                key={m.slug}
                className="flex items-start justify-between gap-6 px-6 py-5 bg-white"
              >
                <div className="flex items-start gap-5 flex-1 min-w-0">
                  <span className="font-mono text-[10px] tracking-[.1em] text-stone shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-light text-ink leading-snug">
                      {m.title}
                    </p>
                    {m.duracion_estimada && (
                      <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mt-1">
                        {m.duracion_estimada}
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
                      href={`/cad-management/${m.slug}`}
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
      </div>
    </main>
  );
}
