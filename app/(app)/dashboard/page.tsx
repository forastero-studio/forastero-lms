import ContentArea from "@/components/ContentArea";
import ProgressTracker from "@/components/ProgressTracker";

export default function DashboardPage() {
  return (
    <ContentArea>
      <p className="eyebrow mb-8">Tu progreso</p>
      <h1 className="text-4xl font-light tracking-tight text-ink mb-10">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressTracker
          title="CAD Management"
          modules={[
            { label: "Taller de Documentación de Obras", done: false },
            { label: "Workshop de Cotización de Obras", done: false },
          ]}
        />
        <ProgressTracker
          title="Bootcamp CAD→BIM"
          modules={[
            { label: "Semana 1 — Fundamentos", done: false },
            { label: "Semana 2 — Organización de archivos", done: false },
            { label: "Semana 3 — Familias base", done: false },
            { label: "Semana 4 — Documentación", done: false },
            { label: "Semana 5 — Coordinación", done: false },
            { label: "Semana 6 — Planillas y datos", done: false },
            { label: "Semana 7 — Renderizado rápido", done: false },
            { label: "Semana 8 — Entrega final", done: false },
          ]}
        />
      </div>
    </ContentArea>
  );
}
