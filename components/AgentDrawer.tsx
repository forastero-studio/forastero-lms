"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AgentDrawer() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isBootcamp = pathname?.startsWith("/bootcamp");
  const isPublicWeek =
    pathname?.includes("semana-0") || pathname?.includes("semana-1");

  const weekMatch = pathname?.match(/semana-(\d+)/);
  const weekNum = weekMatch ? parseInt(weekMatch[1]) : 0;

  const agentBase = "https://forastero-bim.vercel.app";
  const agentUrl = `${agentBase}?context=lms-drawer${weekNum ? `&currentWeek=${weekNum}` : ""}&currentRoute=${encodeURIComponent(pathname || "")}`;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "forastero_close_agent") {
        setOpen(false);
      }
      if (e.data?.type === "forastero_ifc_validated") {
        const { week, color, profile } = e.data;
        // Sync to Supabase via LMS backend
        if (user?.id && week && color) {
          fetch("/api/bootcamp/complete-week", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, week, validationColor: color }),
          }).catch(() => {});
        }
        if (user?.id && profile) {
          fetch("/api/agent/sync-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, profile }),
          }).catch(() => {});
        }
        // Reload to refresh progress dashboard
        setTimeout(() => window.location.reload(), 800);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [user?.id]);

  if (!isBootcamp || isPublicWeek) return null;

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        style={{ width: 80, height: 32, bottom: 24, right: 24, borderRadius: 2 }}
        className="fixed z-40 bg-paper text-ink font-mono text-[9px] tracking-[.1em] uppercase border border-ink hover:bg-ink hover:text-paper transition-colors duration-150"
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
