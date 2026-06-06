"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 md:hidden">
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="border border-line-strong rounded-full hover:text-ink transition-colors text-[13px] text-stone"
            style={{ padding: "9px 20px", background: "rgba(250,250,249,0.5)" }}
          >
            Mi perfil
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="border border-line-strong rounded-full hover:text-ink transition-colors text-[13px] text-stone"
            style={{ padding: "9px 20px", background: "rgba(250,250,249,0.5)" }}
          >
            Iniciar sesión
          </Link>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="text-ink p-1"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-b border-line"
          style={{ background: "rgba(245,244,242,0.98)" }}
        >
          <div className="w-[90%] max-w-[1400px] mx-auto py-4 flex flex-col gap-1">
            <a
              href="#productos"
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] text-stone hover:text-ink transition-colors border-b border-line"
            >
              Formaciones
            </a>
            <a
              href="#precios"
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] text-stone hover:text-ink transition-colors"
            >
              Precios
            </a>
          </div>
        </div>
      )}
    </>
  );
}
