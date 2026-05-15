"use client";

import { useState } from "react";

type Message = {
  role: "user" | "agent";
  text: string;
};

const initialMessages: Message[] = [
  {
    role: "user",
    text: "Vengo de AutoCAD. No entiendo si tengo que modelar todo desde el principio.",
  },
  {
    role: "agent",
    text: "No. Ese es el error que hace abandonar a muchos arquitectos. Primero ordenás el proyecto. Después decidís qué información necesita modelo y qué puede seguir en CAD.",
  },
];

export default function AgentPanel() {
  const [messages] = useState<Message[]>(initialMessages);

  return (
    <aside className="w-72 shrink-0 border-l border-line bg-white min-h-screen flex flex-col">
      <div className="px-5 py-4 border-b border-line">
        <p className="font-mono text-[9px] tracking-widest uppercase text-stone">
          Agente Forastero
        </p>
        <p className="text-xs font-light text-deep mt-1">
          Disponible en Bootcamp CAD→BIM
        </p>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div
              key={i}
              className="bg-muted px-4 py-3 ml-6 text-sm font-light text-deep leading-relaxed"
            >
              {msg.text}
            </div>
          ) : (
            <div key={i} className="border-l border-ink pl-4">
              <p className="font-mono text-[9px] tracking-wider uppercase text-stone mb-2">
                forastero · bim
              </p>
              <p className="text-sm font-light text-deep leading-relaxed">
                {msg.text}
              </p>
            </div>
          )
        )}
      </div>

      <div className="px-4 py-4 border-t border-line">
        <div className="border border-line bg-paper px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Preguntale al agente..."
            className="flex-1 bg-transparent text-sm font-light text-ink placeholder:text-stone outline-none"
            disabled
          />
        </div>
        <p className="font-mono text-[8px] tracking-wider uppercase text-stone mt-2 text-center">
          Placeholder — próximamente
        </p>
      </div>
    </aside>
  );
}
