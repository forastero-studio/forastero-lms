import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Button from "@/components/ui/Button";
import Wordmark from "@/components/ui/Wordmark";

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg font-sans">
      <Nav />
      <Hero />
      <ProblemSection />
      <ProductsSection />
      <PacksSection />
      <ComparisonSection />
      <AgentSection />
      <BioSection />
      <FaqSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────────────── */

async function Nav() {
  const { userId } = await auth();

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="flex items-center justify-between px-8 md:px-14 py-4">
        <Wordmark />
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Formaciones", href: "#productos" },
            { label: "Precios", href: "#precios" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] tracking-[.12em] uppercase text-stone hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          {userId ? (
            <Link
              href="/dashboard"
              className="font-mono text-[10px] tracking-[.12em] uppercase text-stone hover:text-ink transition-colors"
            >
              Mi perfil
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="font-mono text-[10px] tracking-[.12em] uppercase text-stone hover:text-ink transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="min-h-[92vh] grid md:grid-cols-[1fr_1fr] items-center gap-0 px-8 md:px-14 py-20 md:py-28 border-b border-line overflow-hidden">
      {/* Texto */}
      <div className="max-w-lg">
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-stone mb-8">
          Para arquitectos que vienen de AutoCAD®
        </p>
        <h1
          className="font-semibold text-ink mb-8"
          style={{
            fontSize: "clamp(44px, 5.5vw, 80px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.99",
          }}
        >
          De CAD a BIM,
          <br />
          sin modificar
          <br />
          tu forma de
          <br />
          trabajar.
        </h1>
        <p className="text-lg font-light text-stone leading-[1.6] max-w-md mb-10">
          Sin frustrarte, abandonar o empezar desde cero.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href="#productos">
            Ver formaciones
          </Button>
          <Button variant="outline" href="#precios">
            Ver precios
          </Button>
        </div>
      </div>

      {/* Ventana Mac (estática) */}
      <div className="hidden md:flex justify-center items-center pl-8">
        <MacWindow />
      </div>
    </section>
  );
}

function MacWindow() {
  const weeks = [
    { n: "S1", label: "Mentalidad BIM y setup", active: true },
    { n: "S2", label: "Niveles, muros y estructura", active: false },
    { n: "S3", label: "Aberturas y envolvente", active: false },
    { n: "S4", label: "Materiales y visualización", active: false },
    { n: "S5", label: "Cubierta y terreno", active: false },
    { n: "S6", label: "Vistas y planos", active: false },
    { n: "S7", label: "Documentación y planillas", active: false },
    { n: "S8", label: "Entrega final", active: false },
  ];

  const files = [
    { icon: "▸", label: "Criterio BIM vs CAD", green: false },
    { icon: "▸", label: "Paso a paso · Revit®", green: false },
    { icon: "▸", label: "Paso a paso · ArchiCAD®", green: false },
    { icon: "▸", label: "Del CAD al BIM", green: false },
    { icon: "✓", label: "Validación IFC", green: true },
  ];

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        className="rounded-xl overflow-hidden border border-black/10 bg-paper"
        style={{
          transform: "rotateX(6deg) rotateY(-10deg)",
          transformStyle: "preserve-3d",
          width: "min(540px, 46vw)",
          boxShadow:
            "0 50px 100px rgba(0,0,0,0.20), 0 20px 40px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Barra de título */}
        <div
          className="flex items-center px-4 py-2.5 border-b"
          style={{ background: "#E8E7E4", borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <p className="flex-1 text-center font-mono pr-10" style={{ fontSize: "9px", color: "var(--soft)", letterSpacing: "0.04em" }}>
            forastero.lms — Bootcamp CAD → BIM
          </p>
        </div>

        {/* Contenido 16:9 */}
        <div className="flex" style={{ aspectRatio: "16/9" }}>
          {/* Sidebar */}
          <div
            className="shrink-0 flex flex-col overflow-hidden border-r"
            style={{ width: "38%", borderColor: "var(--line)", background: "var(--paper)" }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: "var(--line)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "6.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--soft)" }}>
                Bootcamp CAD → BIM
              </p>
            </div>
            <div className="flex-1 overflow-hidden py-1">
              {weeks.map((w) => (
                <div
                  key={w.n}
                  className="flex items-center gap-2 px-3"
                  style={{
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    background: w.active ? "var(--ink)" : "transparent",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "6px",
                      letterSpacing: "0.06em",
                      flexShrink: 0,
                      color: w.active ? "rgba(250,250,249,0.5)" : "var(--soft)",
                    }}
                  >
                    {w.n}
                  </span>
                  <span
                    className="truncate"
                    style={{
                      fontSize: w.active ? "7px" : "6.5px",
                      color: w.active ? "var(--paper)" : "var(--stone)",
                      lineHeight: 1.3,
                    }}
                  >
                    {w.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel principal */}
          <div
            className="flex-1 overflow-hidden"
            style={{ background: "var(--bg)", padding: "5% 6%" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "6.5px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--soft)",
                marginBottom: "6px",
              }}
            >
              Semana 1
            </p>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}
            >
              Mentalidad BIM y setup
            </p>
            <p
              style={{
                fontSize: "7.5px",
                fontWeight: 300,
                color: "var(--stone)",
                lineHeight: 1.55,
                marginBottom: "12px",
              }}
            >
              Establecés la base conceptual y técnica: la diferencia entre dibujar
              y modelar, y la configuración inicial de tu entorno de trabajo.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "6px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--soft)",
                marginBottom: "6px",
              }}
            >
              Contenido
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {files.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "7px", flexShrink: 0, color: f.green ? "var(--green-ok)" : "var(--soft)" }}>
                    {f.icon}
                  </span>
                  <span style={{ fontSize: "7px", color: f.green ? "var(--green-ok)" : "var(--stone)" }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Problema ──────────────────────────────────────────────────────────── */

function ProblemSection() {
  return (
    <section className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-10">
        El punto de partida
      </p>
      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
        <div className="flex flex-col gap-6">
          <p className="text-base font-light text-ink leading-[1.75]">
            Durante años trabajaste con AutoCAD®. Lo dominás. Tu forma de producir está
            afinada — sabés dónde poner cada línea, qué layer usar, cómo escalar para
            imprimir.
          </p>
          <p className="text-base font-light text-ink leading-[1.75]">
            El software no es el obstáculo. Lo que cambia es lo que podés ganar: hacer lo
            mismo en la mitad del tiempo, con menos errores, y dejar información que se
            reutiliza en cada proyecto siguiente.
          </p>
          <p className="text-base font-light text-ink leading-[1.75]">
            No hace falta descartar lo que ya sabés ni dedicarle meses de tu vida a
            empezar desde cero. Con 30 minutos por día durante 8 semanas, ya estás
            entregando proyectos con criterio BIM, sin perder velocidad ni control.
          </p>
        </div>
        <div className="flex items-center">
          <blockquote className="border-l-2 border-ink pl-8">
            <p
              className="text-[28px] font-light text-ink leading-[1.22]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Tu manera de trabajar tiene valor. No hay que destruirla. Hay que volverla
              más inteligente.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ─── Productos ─────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    href: "/taller-documentacion-de-obras",
    eyebrow: "Taller · Fundamentos",
    title: "Taller de Documentación de Obras",
    desc: "Un sistema de trabajo para tener tu estudio y tus proyectos ordenados. Aprendés a dibujar planos ejecutivos profesionales y a estructurar el método que se aplica a cualquier proyecto.",
    features: [
      "Método aplicable desde el primer proyecto",
      "Ahorrás 2-4 horas por semana con plantillas y CTBs",
      "Acceso de por vida + actualizaciones incluidas",
    ],
    price: "USD 100",
    cta: "Ver el Taller",
    available: true,
  },
  {
    href: "/workshop-cotizacion-de-obras",
    eyebrow: "Workshop · Cotización",
    title: "Workshop Cotización de Obras",
    desc: "Sistema para presupuestar obras sin trabarte. Un método claro para computar, valorizar y presentar al cliente, con criterios para decidir qué medir y cómo.",
    features: [
      "Planillas Excel listas para usar y modificar",
      "Cotización profesional en horas en lugar de días",
      "Acceso de por vida + actualizaciones incluidas",
    ],
    price: "USD 80",
    cta: "Ver el Workshop",
    available: true,
  },
  {
    href: "/bootcamp",
    eyebrow: "Bootcamp · Transición BIM",
    title: "Bootcamp CAD → BIM",
    desc: "La transición real a BIM, paso a paso. Un proyecto profesional completo modelado de principio a fin, con un asistente digital al lado que sabe en qué semana estás.",
    features: [
      "30-45 min por día durante 8 semanas",
      "Asistente IA disponible 24/7 con conocimiento de tu proyecto",
      "Certificado verificable al completar",
    ],
    price: "USD 350",
    cta: "Ver el Bootcamp",
    available: false,
  },
];

function ProductsSection() {
  return (
    <section id="productos" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-5">
        Las formaciones
      </p>
      <h2
        className="text-[40px] font-light text-ink mb-3"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.06" }}
      >
        El orden del estudio. La transición a BIM.
      </h2>
      <p className="text-base font-light text-stone mb-14 max-w-xl">
        Tres formaciones independientes. Podés empezar por una, combinarlas o hacerlas todas.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group bg-paper border border-line p-8 flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
          >
            <p className="font-mono text-[9px] tracking-[.12em] uppercase text-soft mb-5">
              {p.eyebrow}
            </p>
            <h3
              className="text-base font-light text-ink mb-3 leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              {p.title}
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 flex-1">
              {p.desc}
            </p>
            <ul className="flex flex-col gap-1.5 mb-8">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-light text-stone">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-soft" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <p
                className="text-[32px] font-light text-ink group-hover:text-accent transition-colors leading-none"
                style={{ letterSpacing: "-0.05em" }}
              >
                {p.price}
              </p>
              {!p.available && (
                <p className="font-mono text-[9px] tracking-[.1em] uppercase text-soft mt-1">
                  — Próximamente —
                </p>
              )}
            </div>
            <span className="font-mono text-[10px] tracking-[.1em] uppercase text-stone group-hover:text-ink transition-colors">
              {p.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Packs ─────────────────────────────────────────────────────────────── */

function PacksSection() {
  return (
    <section id="precios" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-10">
        Los packs · acceso de por vida
      </p>
      <div className="flex flex-col gap-4">
        {/* CAD Management */}
        <Link
          href="/cad-management"
          className="group border border-line bg-paper p-8 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 hover:border-accent transition-colors duration-300"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[9px] tracking-[.12em] uppercase text-soft mb-3">
              Pack · Taller + Workshop
            </p>
            <h3
              className="text-2xl font-light text-ink mb-3"
              style={{ letterSpacing: "-0.03em" }}
            >
              CAD Management
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-3">
              Los dos métodos juntos: el de cómo trabajar y el de cómo cobrar. Para quien
              quiere ordenar el estudio de punta a punta — desde cómo producir cada plano
              hasta cómo cotizar cada obra.
            </p>
            <p className="text-xs font-light text-soft">
              Ahorrás USD 30 vs comprarlos por separado.
            </p>
          </div>
          <div className="shrink-0">
            <p
              className="text-[48px] font-light text-ink group-hover:text-accent transition-colors leading-none mb-4"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 150
            </p>
            <span className="font-mono text-[10px] tracking-[.12em] uppercase text-stone group-hover:text-ink transition-colors">
              Ver el pack →
            </span>
          </div>
        </Link>

        {/* Pack Completo */}
        <Link
          href="/pack-completo"
          className="group bg-ink p-8 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[9px] tracking-[.12em] uppercase text-paper/40 mb-3">
              Pack · CAD Management + Bootcamp
            </p>
            <h3
              className="text-2xl font-light text-paper mb-3"
              style={{ letterSpacing: "-0.03em" }}
            >
              Pack Completo
            </h3>
            <p className="text-sm font-light text-paper/60 leading-relaxed mb-3">
              Todo. El orden completo del estudio y la transición técnica a BIM en un solo
              paquete. Para quien decide hacer el cambio en serio y de una vez.
            </p>
            <p className="text-xs font-light text-paper/30">
              Ahorrás USD 50 vs comprarlos por separado.
            </p>
          </div>
          <div className="shrink-0">
            <p
              className="text-[48px] font-light text-paper leading-none mb-1"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 450
            </p>
            <p className="font-mono text-[9px] tracking-[.1em] uppercase text-paper/40 mb-4">
              — Próximamente —
            </p>
            <span className="font-mono text-[10px] tracking-[.12em] uppercase text-paper/50">
              Ver el pack →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ─── Comparativa ───────────────────────────────────────────────────────── */

const BEFORE = [
  "Dibujás cada elemento repetido en cada plano por separado",
  "Un cambio implica horas de corrección manual en múltiples archivos",
  "La documentación y el presupuesto no se hablan",
  "Cada proyecto empieza desde cero",
  "El plano es un dibujo — no comunica información reutilizable",
];

const AFTER = [
  "Un cambio en el modelo se propaga a todos los planos automáticamente",
  "La corrección se hace una vez; el resto se actualiza solo",
  "El modelo genera planillas y cuantificaciones de forma directa",
  "Cada proyecto nuevo parte de una base ordenada y reusable",
  "El modelo contiene información que se reutiliza en etapas siguientes",
];

function ComparisonSection() {
  return (
    <section className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-5">
        No es el software
      </p>
      <h2
        className="text-[40px] font-light text-ink mb-4"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.06" }}
      >
        Es el sistema.
      </h2>
      <p className="text-base font-light text-stone max-w-2xl mb-14">
        El problema no es aprender Revit® o ArchiCAD®. Es descubrir que tu forma de trabajar
        puede volverse más inteligente sin tirar lo que ya sabés hacer.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-paper border border-line p-8">
          <p className="font-mono text-[9px] tracking-[.12em] uppercase text-soft mb-8">
            Hoy · Arquitecto CAD
          </p>
          <ul className="flex flex-col gap-5">
            {BEFORE.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono text-[9px] text-soft/40 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-light text-stone leading-snug">{b}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-ink p-8">
          <p className="font-mono text-[9px] tracking-[.12em] uppercase text-paper/40 mb-8">
            Después · Arquitecto BIM
          </p>
          <ul className="flex flex-col gap-5">
            {AFTER.map((a, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono text-[9px] text-paper/30 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-light text-paper/70 leading-snug">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Agente ────────────────────────────────────────────────────────────── */

const AGENT_FEATURES = [
  {
    title: "Sabe en qué semana estás",
    desc: "Conoce tu avance, el proyecto que elegiste y el software que usás. No respuestas genéricas.",
  },
  {
    title: "Valida tu modelo",
    desc: "Al cerrar cada semana, analizá tu archivo IFC y te devuelve un semáforo con criterio profesional.",
  },
  {
    title: "Habla tu idioma",
    desc: "Arquitecto a arquitecto. Sin tutoriales de YouTube ni respuestas de manual.",
  },
];

const AGENT_CHAT = [
  {
    role: "user" as const,
    text: "Me trabé en la Semana 3. No entiendo cómo conectar los muros con la cubierta en ArchiCAD sin que quede geometría suelta.",
  },
  {
    role: "agent" as const,
    text: "En ArchiCAD el problema suele estar en el nivel de referencia de la cubierta. Asegurate de que esté anclada al nivel superior de los muros, no al nivel de piso.\n\nSi los muros son de tipo Composite, chequeá que el recubrimiento exterior llegue hasta donde empalma la cubierta. ¿Podés subir un screenshot del corte transversal?",
  },
];

function AgentSection() {
  return (
    <section id="agente" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-5">
        El asistente
      </p>
      <h2
        className="text-[40px] font-light text-ink mb-4 max-w-xl"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.06" }}
      >
        No reemplaza tu criterio. Lo acompaña.
      </h2>
      <p className="text-base font-light text-stone max-w-xl mb-14">
        Disponible dentro del Bootcamp CAD→BIM, el asistente acompaña cada semana del
        proceso. Responde dudas técnicas con conocimiento de tu proyecto específico — no
        respuestas genéricas de internet.
      </p>
      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Features */}
        <div className="flex flex-col gap-0">
          {AGENT_FEATURES.map((f, i) => (
            <div key={i} className="border-t border-line py-6">
              <p className="font-mono text-[9px] tracking-[.12em] uppercase text-soft mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="text-base font-light text-ink mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                {f.title}
              </h3>
              <p className="text-sm font-light text-stone leading-relaxed">{f.desc}</p>
            </div>
          ))}
          <div className="border-t border-line pt-6">
            <p className="font-mono text-[9px] tracking-[.12em] uppercase text-soft">
              Incluido en Bootcamp CAD→BIM
            </p>
          </div>
        </div>

        {/* Chat estático */}
        <div className="bg-paper border border-line p-6 md:p-8">
          <p className="font-mono text-[9px] tracking-[.1em] uppercase text-soft mb-6">
            Ejemplo de conversación
          </p>
          <div className="flex flex-col gap-5">
            {AGENT_CHAT.map((msg, i) =>
              msg.role === "user" ? (
                <div
                  key={i}
                  className="bg-surface px-4 py-3 ml-8 text-sm font-light text-ink leading-relaxed"
                >
                  {msg.text}
                </div>
              ) : (
                <div key={i} className="border-l border-ink pl-4">
                  <p className="font-mono text-[9px] tracking-[.08em] uppercase text-soft mb-2">
                    forastero · asistente
                  </p>
                  {msg.text.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className={`text-sm font-light text-ink leading-relaxed ${j > 0 ? "mt-2" : ""}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bio ───────────────────────────────────────────────────────────────── */

function BioSection() {
  return (
    <section id="quien-soy" className="px-8 md:px-14 py-32 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-10">
        Quién está detrás
      </p>
      <div className="grid md:grid-cols-[260px_1fr] gap-14 items-start max-w-4xl">
        {/* Placeholder foto */}
        <div
          className="w-full bg-muted border border-line"
          style={{ aspectRatio: "3/4", maxWidth: "260px" }}
        />
        {/* Texto */}
        <div>
          <h2
            className="text-3xl font-light text-ink mb-8"
            style={{ letterSpacing: "-0.03em" }}
          >
            Soy Ariel, arquitecto.
          </h2>
          <div className="flex flex-col gap-5 max-w-2xl">
            <p className="text-base font-light text-ink leading-[1.75]">
              Nací en Argentina, y desde que me recibí no paré de moverme. Estudié,
              trabajé y aprendí en cuatro países —Argentina, España, Italia y Suiza— y
              cada lugar me dejó algo: una forma de dibujar, una manera de resolver o un
              premio.
            </p>
            <p className="text-base font-light text-ink leading-[1.75]">
              Me formé como arquitecto en la Universidad Nacional de La Plata, luego hice
              un posgrado MArch en la Universidad Europea de Valencia y en el medio
              colaboré en concursos, equipos y proyectos en cada país por donde pasé.
            </p>
            <p className="text-base font-light text-ink leading-[1.75]">
              Lo que enseño no lo saqué de un manual. Es lo que fui ordenando proyecto a
              proyecto, error tras error, hasta encontrar una forma de trabajar clara. Eso
              es lo que comparto acá.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "No sé si necesito Revit® o ArchiCAD®. ¿Cómo lo decido?",
    a: "El bootcamp incluye una guía corta para decidir según tu mercado, tu equipo y tu presupuesto. Si vas a trabajar internacionalmente o con grandes estudios, Revit®. Si estás en Europa o LATAM y trabajás solo o con un equipo chico, ArchiCAD®. Ambos funcionan para el bootcamp.",
  },
  {
    q: "¿Mis archivos viejos de AutoCAD® se pierden?",
    a: "No. AutoCAD® sigue siendo parte de tu flujo de trabajo incluso cuando trabajés con BIM. Los planos antiguos los seguís leyendo y modificando como siempre. BIM se suma a tus herramientas, no las reemplaza.",
  },
  {
    q: "¿El certificado tiene validez profesional?",
    a: "Es un certificado emitido por forastero con ID único verificable públicamente. Refleja que completaste un proyecto BIM completo a nivel profesional. No reemplaza una matrícula universitaria, pero sirve para mostrar a clientes y empleadores que tenés capacidad práctica real.",
  },
  {
    q: "¿Qué hago si quiero algo personalizado para mi estudio?",
    a: "Para asesoría o trabajos a medida sobre flujos de trabajo específicos, escribime a info@forastero.studio. forastero ofrece consultoría puntual para estudios además de los productos formativos.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone mb-8 text-center">
        Preguntas frecuentes
      </p>
      <div className="max-w-2xl mx-auto border-t border-line">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="group border-b border-line">
            <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
              <span className="text-sm font-light text-ink leading-snug">{item.q}</span>
              <span className="font-mono text-base font-light text-stone shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200 select-none">
                +
              </span>
            </summary>
            <p className="text-sm font-light text-stone leading-relaxed pb-5 pr-8">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ─── Cierre ────────────────────────────────────────────────────────────── */

function ClosingSection() {
  return (
    <section className="px-8 md:px-14 py-32 border-b border-line text-center">
      <h2
        className="font-light text-ink mb-6 mx-auto max-w-2xl"
        style={{
          fontSize: "clamp(32px, 4vw, 56px)",
          letterSpacing: "-0.03em",
          lineHeight: "1.06",
        }}
      >
        Tu manera de trabajar tiene valor.
      </h2>
      <p className="text-base font-light text-stone max-w-lg mx-auto mb-10 leading-[1.7]">
        No hay que destruirla. Hay que volverla más inteligente. forastero.lms es un
        ecosistema de arquitectura y BIM pensado para arquitectos que quieren dar el paso
        sin perder lo que ya saben hacer.
      </p>
      <Button variant="primary" href="#productos">
        Ver formaciones
      </Button>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="px-8 md:px-14 py-16">
      <p className="mb-8">
        <Wordmark />
      </p>
      <div className="h-px bg-line mb-6" />
      <div className="grid md:grid-cols-[2fr_1fr] gap-10 mb-8">
        <a
          href="mailto:info@forastero.studio"
          className="text-sm font-light text-stone hover:text-ink transition-colors"
        >
          info@forastero.studio
        </a>
        <div className="flex flex-col gap-3">
          {[
            { href: "/legal/terminos-y-condiciones", label: "Términos y condiciones" },
            { href: "/legal/privacidad", label: "Política de privacidad" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] tracking-[.12em] uppercase text-stone hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="h-px bg-line mb-6" />
      <p className="font-mono text-[10px] tracking-[.12em] uppercase text-stone">
        © forastero 2026 · Grono, Cantón Graubünden, Suiza
      </p>
    </footer>
  );
}
