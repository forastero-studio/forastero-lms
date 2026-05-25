import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ContentArea from "@/components/ContentArea";
import Link from "next/link";

export const metadata = {
  title: "Cómo recorrer el Bootcamp · Forastero",
};

const sections = [
  {
    label: "01 · antes de empezar",
    title: "Qué vas a necesitar",
    body: `El bootcamp dura 8 semanas. No hay fechas fijas — avanzás a tu ritmo, pero cada semana desbloquea la siguiente cuando subís tu IFC validado.

Necesitás ArchiCAD o Revit instalado y funcional. Si todavía no tenés licencia, instalá la versión de prueba antes de empezar la Semana 1.

También necesitás decidir tu proyecto. Tenés dos opciones reales: el Refugio Alpe di Portola (Suiza, preexistencia de piedra) o la Cabina Patagonia (Argentina, obra nueva en madera). El agente te va a preguntar cuál elegís en el onboarding.`,
  },
  {
    label: "02 · la lógica del viaje",
    title: "Ocho semanas, un modelo",
    body: `No es un curso de clips. Cada semana le agregás una capa al mismo modelo. Empezás con el archivo vacío y terminás con la documentación completa.

La secuencia es intencional: primero la lógica del sistema (Semana 1), después la geometría (Semanas 2-4), después la documentación (Semanas 5-6), después los datos (Semana 7), después la presentación (Semana 8).

No saltes semanas. El modelo BIM funciona así: cada decisión que tomás en la etapa temprana afecta lo que podés hacer en las etapas siguientes.`,
  },
  {
    label: "03 · el agente",
    title: "Cómo usar el agente BIM",
    body: `El agente no es un buscador. Es un interlocutor que sabe en qué semana estás, qué proyecto elegiste y qué software usás.

Preguntale lo que necesitás en el momento en que lo necesitás. "¿Cómo configuro los niveles para el Refugio?" va a darte una respuesta diferente que "¿Cómo configuro los niveles?" — porque el agente sabe las cotas reales de tu proyecto.

Abrís el agente con el botón "Agente" abajo a la derecha, dentro de cualquier semana del bootcamp. Podés tener la semana abierta en la parte principal de la pantalla y el agente en el panel lateral al mismo tiempo.`,
  },
  {
    label: "04 · validación ifc",
    title: "Qué significa validar el IFC",
    body: `Al final de cada semana, exportás tu modelo como IFC y lo subís al agente. El agente lo analiza y te da uno de tres veredictos: verde, amarillo o rojo.

Verde: el modelo está bien. La semana se marca como completada y la siguiente se desbloquea.
Amarillo: hay errores menores. Igual se desbloquea la siguiente, pero el agente te explica qué corregir.
Rojo: hay un problema estructural en el modelo. La semana no se desbloquea hasta que lo resolvés.

El IFC no es el entregable — es la prueba. Lo que aprendés para llegar a un IFC verde es el entregable real.`,
  },
  {
    label: "05 · preguntas frecuentes",
    title: "Lo que suele frenar",
    body: `¿Puedo cambiar de proyecto a mitad del bootcamp? Sí, pero vas a tener que reconstruir las semanas anteriores con el nuevo proyecto. No es obligatorio, pero es la única manera de que el modelo tenga coherencia.

¿Qué pasa si me trabo en una semana? Seguís trabajando. El agente está para eso. No hay tiempo límite entre semanas — podés tardar lo que necesites.

¿Los certificados tienen validez? El certificado de Forastero es una constancia de finalización. No lo van a pedir en ningún concurso público — es una señal para vos y para colegas de que hiciste el ciclo completo.

¿El contenido se actualiza? Sí. Las semanas pueden actualizarse cuando ArchiCAD o Revit cambian su interfaz. Siempre vas a ver la versión más reciente.`,
  },
];

export default async function GuiaPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <ContentArea>
      <p className="technical-header mb-8">forastero · bootcamp · guía del alumno</p>

      <h1 className="font-display text-4xl font-light text-ink mb-2 tracking-tight">
        Cómo recorrer el Bootcamp
      </h1>
      <p className="text-sm text-stone font-light mb-12">
        Lo que necesitás saber antes de empezar, y lo que te va a convenir releer cuando te trabés.
      </p>

      <div className="flex flex-col gap-12">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="eyebrow mb-3">{s.label}</p>
            <h2 className="text-xl font-light text-ink mb-4">{s.title}</h2>
            <div className="text-sm font-light text-ink leading-relaxed space-y-4">
              {s.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-line mt-12 mb-8" />

      <div className="flex gap-6">
        <Link
          href="/bootcamp/dashboard"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink border border-line px-4 py-2 hover:border-ink transition-colors"
        >
          ← Dashboard
        </Link>
        <Link
          href="/bootcamp/semana-1"
          className="font-mono text-[9px] tracking-[.1em] uppercase text-paper bg-rust px-4 py-2 hover:bg-stone transition-colors"
          style={{ background: "var(--rust)" }}
        >
          Empezar Semana 01 →
        </Link>
      </div>

      <p className="technical-header mt-10">forastero · bootcamp · 8 semanas · cad→bim</p>
    </ContentArea>
  );
}
