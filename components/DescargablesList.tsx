"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import type { Descargable } from "@/lib/content";

function InlineItem({ item }: { item: Descargable }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line/50 last:border-b-0">
      <div className="flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileText size={13} className="text-stone shrink-0" />
          <span className="text-sm font-light text-deep truncate">{item.nombre}</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line hover:border-ink px-3 py-1.5 transition-colors shrink-0"
        >
          {open ? "Cerrar" : "Ver"}
        </button>
      </div>

      {open && (
        <div className="pb-4">
          <div className="relative w-full bg-muted" style={{ paddingBottom: "129%" }}>
            <iframe
              src={`https://drive.google.com/file/d/${item.fileId}/preview`}
              className="absolute inset-0 w-full h-full rounded-md"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DownloadItem({ item }: { item: Descargable }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-line/50 last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <Download size={13} className="text-stone shrink-0" />
        <span className="text-sm font-light text-deep truncate">{item.nombre}</span>
      </div>
      <a
        href={`https://drive.google.com/uc?export=download&id=${item.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line hover:border-ink px-3 py-1.5 transition-colors shrink-0"
      >
        Descargar
      </a>
    </div>
  );
}

export default function DescargablesList({ items }: { items: Descargable[] }) {
  if (!items.length) return null;

  return (
    <div className="border border-line bg-white divide-y-0">
      {items.map((item, i) =>
        item.tipo === "inline" ? (
          <InlineItem key={i} item={item} />
        ) : (
          <DownloadItem key={i} item={item} />
        )
      )}
    </div>
  );
}
