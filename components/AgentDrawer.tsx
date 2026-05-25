"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AgentDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isBootcamp = pathname?.startsWith("/bootcamp");

  const weekMatch = pathname?.match(/semana-(\d+)/);
  const weekNum = weekMatch ? parseInt(weekMatch[1]) : 0;

  const agentBase = "https://forastero-bim.vercel.app";
  const agentUrl = `${agentBase}?lms=true${weekNum ? `&week=${weekNum}` : ""}&lmsPage=${encodeURIComponent(pathname || "")}`;

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "forastero_close_agent") {
        setOpen(false);
      }
      if (e.data?.type === "forastero_ifc_validated") {
        // Reload para refrescar progreso cuando el agente valida un IFC
        window.location.reload();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!isBootcamp) return null;

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        style={{ width: 80, height: 32, bottom: 24, right: 24 }}
        className="fixed z-40 bg-ink text-paper font-mono text-[9px] tracking-[.1em] uppercase hover:bg-stone transition-colors"
      >
        Agente
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(10,10,10,0.3)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-paper border-l border-line flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } w-full md:w-[40%]`}
      >
        <div className="flex items-center justify-between px-4 border-b border-line shrink-0" style={{ height: 44 }}>
          <span className="font-mono text-[9px] tracking-[.1em] uppercase text-stone">
            forastero · agente bim
            {weekNum > 0 && ` · semana ${String(weekNum).padStart(2, "0")}`}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
          >
            cerrar ×
          </button>
        </div>
        {open && (
          <iframe
            ref={iframeRef}
            src={agentUrl}
            className="flex-1 border-0 w-full"
            allow="microphone"
            title="Agente Forastero BIM"
          />
        )}
      </div>
    </>
  );
}
