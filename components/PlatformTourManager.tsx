"use client";

import { useEffect, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";

const TOUR_KEY = "forastero-platform-tour-completed";

// translateX applied to the card per step — shifts it toward the element it describes
const CARD_TRANSFORMS = [
  "translateX(0)",       // 01 bienvenida   → centrado
  "translateX(-280px)",  // 02 formaciones  → izquierda, cerca del sidebar
  "translateX(-280px)",  // 03 expande      → izquierda, sidebar
  "translateX(200px)",   // 04 videos       → centro/derecha, área de contenido
  "translateX(0)",       // 05 soporte      → centrado
];

const steps = [
  {
    step: "01",
    title: "Bienvenido a forastero.",
    body: "Te explicamos cómo moverte en la plataforma en 4 pantallas.",
    visual: (
      <div className="flex items-center justify-center h-20">
        <Wordmark />
      </div>
    ),
  },
  {
    step: "02",
    title: "Acá tenés tus formaciones.",
    body: "En el panel izquierdo encontrás todo lo que compraste. Hacé click en cada formación para expandir sus clases o semanas.",
    visual: (
      <div className="flex gap-3 items-start h-20">
        <div className="w-28 border border-line bg-muted p-2 flex flex-col gap-1">
          <div className="h-2 bg-stone/20 rounded-sm w-full" />
          <div className="h-2 bg-stone/20 rounded-sm w-3/4" />
          <div className="h-px bg-line my-0.5" />
          <div className="h-2 bg-rust/30 rounded-sm w-full" />
          <div className="ml-2 h-1.5 bg-stone/15 rounded-sm w-5/6" />
          <div className="ml-2 h-1.5 bg-stone/15 rounded-sm w-5/6" />
          <div className="ml-2 h-1.5 bg-stone/15 rounded-sm w-4/6" />
        </div>
        <div className="text-stone/50 text-lg mt-5">←</div>
      </div>
    ),
  },
  {
    step: "03",
    title: "Cada formación se expande en sus clases.",
    body: "Hacé click en una clase o semana para acceder directamente al video y los materiales. Avanzás a tu ritmo — sin fechas fijas.",
    visual: (
      <div className="flex items-center justify-center gap-4 h-20">
        <div className="flex flex-col gap-1 text-xs font-light text-stone">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px]">▸</span>
            <span>Formación</span>
          </div>
        </div>
        <div className="text-stone/30 text-sm">→</div>
        <div className="flex flex-col gap-1 text-xs font-light text-stone">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-rust">▾</span>
            <span className="text-ink font-medium">Formación</span>
          </div>
          <div className="pl-3 text-stone/70">· Clase 1</div>
          <div className="pl-3 text-stone/70">· Clase 2</div>
          <div className="pl-3 text-stone/70">· Clase 3</div>
        </div>
      </div>
    ),
  },
  {
    step: "04",
    title: "Videos, guías PDF y archivos descargables.",
    body: "Cada clase tiene su video explicativo, guías en PDF para ver en pantalla y archivos de trabajo para descargar (DWG, Excel, CTB). Acceso de por vida + actualizaciones incluidas.",
    visual: (
      <div className="flex flex-col gap-1.5 h-20 justify-center max-w-xs">
        {["Video explicativo", "Guía práctica PDF", "Archivo DWG"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between border border-line px-3 py-1.5 bg-white text-xs font-light text-stone"
          >
            <span>{item}</span>
            <span className="text-[9px] text-stone/50 font-mono uppercase">
              {item.includes("Video") ? "ver" : item.includes("PDF") ? "abrir" : "descargar"}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "05",
    title: "Cualquier duda → info@forastero.studio",
    body: "Podés volver a ver esta guía cuando quieras desde «Cómo usar la plataforma» en el sidebar.",
    visual: (
      <div className="flex items-center justify-center h-20">
        <a
          href="mailto:info@forastero.studio"
          className="font-mono text-[10px] tracking-[.08em] text-stone"
        >
          info@forastero.studio
        </a>
      </div>
    ),
  },
];

export default function PlatformTourManager() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_KEY);
    if (!completed) setShow(true);

    const handler = () => {
      setStep(0);
      setShow(true);
    };
    window.addEventListener("forastero:show-tour", handler);
    return () => window.removeEventListener("forastero:show-tour", handler);
  }, []);

  function complete() {
    localStorage.setItem(TOUR_KEY, "true");
    setShow(false);
  }

  function skip() {
    localStorage.setItem(TOUR_KEY, "true");
    setShow(false);
  }

  if (!show) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="bg-paper border border-line w-full max-w-lg mx-4 flex flex-col"
        style={{
          transform: CARD_TRANSFORMS[step],
          transition: "transform 300ms ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone">
            forastero · {current.step} de {steps.length}
          </p>
          <button
            onClick={skip}
            className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
          >
            Saltar
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          {current.visual}
          <h2
            className="font-display text-xl font-light text-ink mt-4 mb-2"
            style={{ letterSpacing: "-0.01em" }}
          >
            {current.title}
          </h2>
          <p className="text-sm font-light text-stone leading-relaxed">
            {current.body}
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === step ? "bg-ink" : "bg-line"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
              >
                ← Anterior
              </button>
            )}
            {isLast ? (
              <button
                onClick={complete}
                className="font-mono text-[9px] tracking-[.1em] uppercase text-paper px-4 py-2 hover:opacity-80 transition-opacity"
                style={{ background: "var(--rust)" }}
              >
                Empezar
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="font-mono text-[9px] tracking-[.1em] uppercase text-stone border border-line px-4 py-2 hover:border-ink hover:text-ink transition-colors"
              >
                Siguiente →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
