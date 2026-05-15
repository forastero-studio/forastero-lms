"use client";

import { useState } from "react";

type Module = {
  label: string;
  done: boolean;
};

type Props = {
  title: string;
  modules: Module[];
};

export default function ProgressTracker({ title, modules: initial }: Props) {
  const [modules, setModules] = useState(initial);

  const toggle = (i: number) => {
    setModules((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, done: !m.done } : m))
    );
  };

  const done = modules.filter((m) => m.done).length;
  const pct = Math.round((done / modules.length) * 100);

  return (
    <div className="border border-line bg-white p-6">
      <p className="font-mono text-[9px] tracking-widest uppercase text-stone mb-1">
        Progreso
      </p>
      <h3 className="text-lg font-light tracking-tight text-ink mb-4">
        {title}
      </h3>

      <div className="h-px bg-line mb-4">
        <div
          className="h-px bg-ink transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="font-mono text-[9px] tracking-wider text-stone mb-4">
        {done}/{modules.length} completados
      </p>

      <ul className="flex flex-col gap-2">
        {modules.map((mod, i) => (
          <li key={i} className="flex items-start gap-3">
            <button
              onClick={() => toggle(i)}
              className={`mt-0.5 w-4 h-4 shrink-0 border transition-colors ${
                mod.done
                  ? "border-ink bg-ink"
                  : "border-line bg-transparent hover:border-stone"
              }`}
              aria-label={`Marcar ${mod.label} como ${mod.done ? "pendiente" : "completado"}`}
            />
            <span
              className={`text-sm font-light leading-snug transition-colors ${
                mod.done ? "text-stone line-through" : "text-deep"
              }`}
            >
              {mod.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
