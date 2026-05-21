"use client";

import { useState } from "react";

interface ExistingCert {
  id: string;
  pdf_url: string | null;
}

interface Props {
  existingCert?: ExistingCert | null;
}

const PROJECTS = [
  { value: "refugio", label: "Refugio Alpe di Portola" },
  { value: "cabina", label: "Cabina Patagonia" },
];

const SOFTWARES = ["Revit", "ArchiCAD", "Otro"];

export default function CertificateRequest({ existingCert }: Props) {
  const [projectSlug, setProjectSlug] = useState("");
  const [software, setSoftware] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExistingCert | null>(existingCert ?? null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/emit-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectSlug, software }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al emitir certificado");
      } else {
        setResult(data);
      }
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="border border-line bg-white p-6 max-w-md">
        <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-2">
          Certificado emitido
        </p>
        <p className="text-sm font-light text-stone mb-5">
          Tu certificado fue generado y enviado a tu email.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`/verify/${result.id}`}
            className="font-mono text-[9px] tracking-[.1em] uppercase text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors inline-block"
          >
            Ver certificado →
          </a>
          {result.pdf_url && (
            <a
              href={result.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] tracking-[.1em] uppercase text-stone border border-line px-4 py-2 hover:border-ink hover:text-ink transition-colors inline-block"
            >
              Descargar PDF →
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white p-6 max-w-md">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-2">
        Certificado Forastero
      </p>
      <p className="text-sm font-light text-stone mb-5">
        Completaste las 8 semanas. Indicá tu proyecto y software para emitir el
        certificado.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-mono text-[9px] tracking-[.08em] uppercase text-stone block mb-1.5">
            Proyecto
          </label>
          <select
            value={projectSlug}
            onChange={(e) => setProjectSlug(e.target.value)}
            required
            className="w-full border border-line bg-paper text-sm font-light text-ink px-3 py-2 focus:outline-none focus:border-ink"
          >
            <option value="">Seleccioná...</option>
            {PROJECTS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono text-[9px] tracking-[.08em] uppercase text-stone block mb-1.5">
            Software
          </label>
          <select
            value={software}
            onChange={(e) => setSoftware(e.target.value)}
            required
            className="w-full border border-line bg-paper text-sm font-light text-ink px-3 py-2 focus:outline-none focus:border-ink"
          >
            <option value="">Seleccioná...</option>
            {SOFTWARES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="font-mono text-[9px] tracking-[.05em] text-rust">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-[9px] tracking-[.1em] uppercase text-paper bg-ink px-4 py-2.5 hover:bg-rust transition-colors disabled:opacity-50 text-left"
        >
          {loading ? "Generando..." : "Emitir certificado →"}
        </button>
      </form>
    </div>
  );
}
