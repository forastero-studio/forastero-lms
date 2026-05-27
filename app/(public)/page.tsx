import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper font-sans">
      <Nav />
      <Hero />
      <ProblemSection />
      <PricingSection />
      <AgentSection />
      <BioSection />
      <FaqSection />
      <Footer />
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-14 py-5 border-b border-line">
      <p className="text-sm font-light text-ink" style={{ letterSpacing: "0.05em" }}>
        forastero
      </p>
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Formaciones", href: "#precios" },
          { label: "Precios", href: "#precios" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/sign-in"
          className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <header className="min-h-[88vh] grid md:grid-cols-[1.1fr_.9fr] gap-14 items-end px-8 md:px-14 pt-20 pb-16 border-b border-line">
      <div>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-stone mb-6">
          Para arquitectos que vienen de AutoCAD®
        </p>
        <h1
          className="text-[clamp(48px,7vw,96px)] leading-[.93] font-light text-ink mb-8"
          style={{ letterSpacing: "-0.06em" }}
        >
          De CAD a BIM,
          <br />
          sin modificar tu
          <br />
          forma de trabajar.
        </h1>
        <p className="text-xl font-light text-deep leading-[1.5] max-w-xl mb-10">
          Sin frustrarte, abandonar o empezar desde cero.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="#precios">
            Ver formaciones
          </Button>
          <Button variant="outline" href="#precios">
            Ver precios
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ─── Problema ──────────────────────────────────────────────────────────── */

function ProblemSection() {
  return (
    <section className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        El punto de partida
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-8 max-w-2xl"
        style={{ letterSpacing: "-0.035em" }}
      >
        No es el software. Es el sistema.
      </h2>
      <div className="max-w-2xl mb-12">
        <p className="text-lg font-light text-deep leading-[1.65] mb-5">
          Durante años trabajaste con AutoCAD®. Lo dominás. Tu forma de producir está
          afinada — sabés dónde poner cada línea, qué layer usar, cómo escalar para
          imprimir.
        </p>
        <p className="text-lg font-light text-deep leading-[1.65] mb-5">
          El problema no es el software. El problema es que ahora podés hacer lo mismo
          en la mitad del tiempo, con menos errores, y dejar información que se reutiliza
          en cada proyecto siguiente.
        </p>
        <p className="text-lg font-light text-deep leading-[1.65] mb-5">
          No hace falta descartar lo que ya sabés ni dedicarle meses de tu vida a empezar
          desde cero.
        </p>
        <p className="text-lg font-light text-deep leading-[1.65]">
          Con 30 minutos por día durante 8 semanas, ya estás entregando proyectos con
          criterio BIM, sin perder velocidad ni control.
        </p>
      </div>
      <blockquote className="border-l border-ink pl-7 max-w-xl">
        <p
          className="text-[32px] leading-[1.18] font-light text-ink"
          style={{ letterSpacing: "-0.035em" }}
        >
          Tu manera de trabajar tiene valor. No hay que destruirla. Hay que volverla más
          inteligente.
        </p>
      </blockquote>
    </section>
  );
}

/* ─── Agente ────────────────────────────────────────────────────────────── */

function AgentSection() {
  const messages = [
    {
      role: "user" as const,
      text: "Estoy con AutoCAD® desde hace años. ¿Cuánto tiempo me lleva aprender BIM realmente? No tengo seis meses libres.",
    },
    {
      role: "agent" as const,
      text: "Si ya manejás AutoCAD® a nivel profesional, en 4 semanas estás haciendo plantas BIM básicas funcionales. En 8 semanas estás entregando un proyecto BIM completo con documentación.\n\nNo necesitás dejar tu trabajo. El programa está pensado para 30-45 minutos por día. Mucha gente lo hace al final de la jornada, antes de cerrar la compu.",
    },
    {
      role: "user" as const,
      text: "¿Y si me trabo? No tengo a quién preguntarle.",
    },
    {
      role: "agent" as const,
      text: "Tenés un asistente IA del bootcamp disponible 24/7 que sabe en qué semana estás, qué proyecto modelás, qué software usás. Cuando te trabás, le mostrás el problema y te guía con criterio profesional, no con tutoriales genéricos.",
    },
  ];

  return (
    <section id="agente" className="px-8 md:px-14 py-24 border-b border-line">
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div>
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
            El asistente forastero
          </p>
          <h2
            className="text-[44px] leading-[1.04] font-light text-ink mb-6"
            style={{ letterSpacing: "-0.035em" }}
          >
            No reemplaza tu criterio. Lo acompaña.
          </h2>
          <p className="text-lg font-light text-deep leading-[1.65] mb-8">
            Disponible dentro del Bootcamp CAD→BIM, el asistente acompaña cada semana
            del proceso. Responde dudas técnicas con conocimiento de tu proyecto
            específico — no respuestas genéricas de internet.
          </p>
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
            Incluido en Bootcamp CAD→BIM
          </p>
        </div>

        <div className="bg-white border border-line p-6 md:p-8">
          <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone mb-6">
            Simulación de conversación
          </p>
          <div className="flex flex-col gap-5">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div
                  key={i}
                  className="bg-muted px-4 py-3 ml-10 text-sm font-light text-deep leading-relaxed"
                >
                  {msg.text}
                </div>
              ) : (
                <div key={i} className="border-l border-ink pl-4">
                  <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-2">
                    forastero · asistente
                  </p>
                  {msg.text.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className={`text-sm font-light text-deep leading-relaxed ${j > 0 ? "mt-2" : ""}`}
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

/* ─── Pricing ────────────────────────────────────────────────────────────── */

function PricingSection() {
  return (
    <section id="precios" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Precios
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-14"
        style={{ letterSpacing: "-0.035em" }}
      >
        Acceso de por vida. Sin suscripción.
      </h2>

      {/* Grupo A · Fundamentos */}
      <div className="mb-4">
        <p className="font-mono text-[14px] tracking-[.1em] uppercase text-stone mb-6">
          Fundamentos · documentación y cotización
        </p>
        <div className="grid md:grid-cols-2 gap-0 border border-line">
          {/* Card 1 · Taller */}
          <div className="bg-white p-6 md:p-8 flex flex-col border-r border-line last:border-r-0">
            <h3
              className="text-sm font-light text-ink mb-3 leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              Taller de Documentación de Obras
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4 flex-1">
              Un sistema de trabajo para tener tu estudio y tus proyectos ordenados.
              Aprendés a dibujar planos ejecutivos profesionales y a estructurar el método
              que se aplica a cualquier proyecto.
            </p>
            <ul className="flex flex-col gap-1.5 mb-6">
              {[
                "Método aplicable desde el primer proyecto",
                "Ahorrás 2-4 horas por semana solo con plantillas y CTBs",
                "Acceso de por vida + actualizaciones incluidas",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-light text-stone">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {b}
                </li>
              ))}
            </ul>
            <p
              className="text-[28px] font-light text-ink leading-none mb-8"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 100
            </p>
            <Link
              href="/taller-documentacion-de-obras"
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light text-center transition-colors hover:border-rust hover:text-rust w-fit"
            >
              Ver el Taller
            </Link>
          </div>

          {/* Card 2 · Workshop */}
          <div className="bg-white p-6 md:p-8 flex flex-col">
            <h3
              className="text-sm font-light text-ink mb-3 leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              Workshop Cotización de Obras
            </h3>
            <p className="text-sm font-light text-stone leading-relaxed mb-4 flex-1">
              Sistema para presupuestar obras sin trabarte. Aprendés un método claro para
              computar, valorizar y presentar al cliente, con criterios para decidir qué
              medir y cómo.
            </p>
            <ul className="flex flex-col gap-1.5 mb-6">
              {[
                "Planillas Excel listas para usar y modificar",
                "Cotización profesional en horas en lugar de días",
                "Acceso de por vida + actualizaciones incluidas",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-light text-stone">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {b}
                </li>
              ))}
            </ul>
            <p
              className="text-[28px] font-light text-ink leading-none mb-8"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 80
            </p>
            <Link
              href="/workshop-cotizacion-de-obras"
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light text-center transition-colors hover:border-rust hover:text-rust w-fit"
            >
              Ver el Workshop
            </Link>
          </div>
        </div>
      </div>

      {/* Card 3 · CAD Management · Negro */}
      <div className="border border-line mb-4">
        <div className="bg-ink p-8 md:p-10 flex flex-col md:flex-row md:gap-12 md:items-end">
          <div className="flex-1 mb-8 md:mb-0">
            <h3
              className="text-base font-light text-white mb-1 leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              CAD Management
            </h3>
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-white/40 mb-4">
              Taller + Workshop
            </p>
            <p className="text-sm font-light text-white/70 leading-relaxed mb-4">
              Los dos métodos juntos: el de cómo trabajar y el de cómo cobrar. Para quien
              quiere ordenar el estudio de punta a punta — desde cómo producir cada plano
              hasta cómo cotizar cada obra.
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Sistema completo de documentación + cotización",
                "Mismo lenguaje en todo: tu estudio funciona como una unidad",
                "Pensado para implementar en 30 días sin frenar tu trabajo actual",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-light text-white/60">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <p
              className="text-[42px] font-light text-white leading-none mb-2"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 150
            </p>
            <p className="text-xs font-light text-white/40 mb-8">
              ahorrás USD 30 vs comprarlos por separado
            </p>
            <Link
              href="/cad-management"
              className="inline-block border border-white/40 text-white px-5 py-3 text-sm font-light transition-colors hover:border-white w-fit"
            >
              Ver el pack
            </Link>
          </div>
        </div>
      </div>

      {/* Grupo B · Bootcamp */}
      <div>
        <p className="font-mono text-[14px] tracking-[.1em] uppercase text-stone mb-6">
          Bootcamp · transición BIM
        </p>
        <div className="border border-line">

          {/* Card 4 · Bootcamp · Blanco */}
          <div className="bg-white p-8 md:p-10 flex flex-col md:flex-row md:gap-12 md:items-end border-b border-line">
            <div className="flex-1 mb-8 md:mb-0">
              <h3
                className="text-base font-light text-ink mb-1 leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                Bootcamp CAD→BIM
              </h3>
              <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-4">
                8 semanas · Revit® o ArchiCAD®
              </p>
              <p className="text-sm font-light text-stone leading-relaxed mb-3">
                La transición real a BIM, paso a paso. No teoría suelta — un proyecto
                profesional completo modelado de principio a fin, con un asistente digital
                al lado que sabe en qué semana estás y en qué te trabás.
              </p>
              <p className="text-sm font-light text-stone leading-relaxed mb-4">
                Al final tenés un proyecto BIM terminado, un certificado verificable, y la
                confianza de saber que podés repetir el proceso con cualquier encargo que
                llegue al estudio.
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "30-45 min por día durante 8 semanas",
                  "Elegís entre 2 proyectos guía (refugio alpino o cabina patagónica)",
                  "Asistente IA disponible 24/7 con conocimiento de tu proyecto",
                  "Validación profesional al cierre de cada semana",
                  "Certificado verificable al completar",
                  "Acceso de por vida + actualizaciones incluidas",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-light text-stone">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <p
                className="text-[42px] font-light text-ink leading-none mb-8"
                style={{ letterSpacing: "-0.05em" }}
              >
                USD 350
              </p>
              <Link
                href="/bootcamp"
                className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light transition-colors hover:border-rust hover:text-rust w-fit"
              >
                Ver el Bootcamp
              </Link>
            </div>
          </div>

          {/* Card 5 · Pack Completo · Negro */}
          <div className="bg-ink p-8 md:p-10 flex flex-col md:flex-row md:gap-12 md:items-end">
            <div className="flex-1 mb-8 md:mb-0">
              <h3
                className="text-base font-light text-white mb-1 leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                Pack Completo
              </h3>
              <p className="font-mono text-[9px] tracking-[.08em] uppercase text-white/40 mb-4">
                CAD Management + Bootcamp
              </p>
              <p className="text-sm font-light text-white/70 leading-relaxed mb-3">
                Todo. El orden completo del estudio y la transición técnica a BIM en un solo
                paquete. Para quien decide hacer el cambio en serio y de una vez.
              </p>
              <p className="text-sm font-light text-white/70 leading-relaxed mb-4">
                Empezás ordenando lo que ya hacés con CAD, y mientras tanto modelás tu
                primer proyecto BIM con acompañamiento profesional. Cuando termines, tu
                estudio funciona de manera distinta.
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Las dos formaciones completas con acceso simultáneo",
                  "Podés combinarlas: aplicar el Taller al proyecto del Bootcamp",
                  "Mejor relación entre inversión y resultado",
                  "Certificado del Bootcamp incluido",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-light text-white/60">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <p
                className="text-[42px] font-light text-white leading-none mb-2"
                style={{ letterSpacing: "-0.05em" }}
              >
                USD 450
              </p>
              <p className="text-xs font-light text-white/40 mb-8">
                ahorrás USD 50 vs comprarlos por separado
              </p>
              <Link
                href="/pack-completo"
                className="inline-block border border-white/40 text-white px-5 py-3 text-sm font-light transition-colors hover:border-white w-fit"
              >
                Ver el pack
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Bio ────────────────────────────────────────────────────────────────── */

function BioSection() {
  return (
    <section id="quien-soy" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Quién soy
      </p>
      <div className="grid md:grid-cols-[1fr_2fr] gap-14 items-start max-w-4xl">
        <div>
          <div className="w-full aspect-square bg-muted border border-line max-w-[200px]" />
        </div>
        <div>
          <p className="text-base font-light text-deep leading-[1.65] mb-6">
            Soy Ariel Fragosa, arquitecto. Estudié en La Plata, me especialicé en Valencia,
            trabajé en estudios de Argentina, España, Italia y Suiza. Desde 2022 vivo en
            Grono, en los Alpes del Cantón Graubünden.
          </p>
          <p className="text-base font-light text-deep leading-[1.65] mb-6">
            Después de más de diez años realizando colaboraciones en otros estudios, empecé
            forastero. La idea es simple: pasar lo que aprendí en el oficio real. No la
            teoría — la práctica de trabajar en estudios, lidiar con plazos, mantener el
            modelo en orden cuando las cosas se complican, y llegar a obra con documentación
            que se entienda.
          </p>
          <p className="text-base font-light text-deep leading-[1.65]">
            forastero es la versión ordenada de lo que normalmente se aprende a base de
            errores.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "¿Necesito alguna preparación previa antes de empezar?",
    a: "Para el Taller de Documentación, alcanza con manejar AutoCAD® a nivel intermedio. Para el Bootcamp, lo ideal es haber pasado antes por el Taller o tener experiencia equivalente. El Workshop de Cotización es independiente y no requiere conocimiento previo de CAD.",
  },
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
    a: "Es un certificado emitido por forastero con ID único verificable públicamente. Refleja que completaste un proyecto BIM completo a nivel profesional. No reemplaza una matrícula universitaria, pero sirve para mostrar a clientes y a empleadores que tenés capacidad práctica real.",
  },
  {
    q: "¿Qué hago si quiero algo personalizado para mi estudio?",
    a: "Para asesoría o trabajos a medida sobre flujos de trabajo específicos, escribime a info@forastero.studio. forastero ofrece consultoría puntual para estudios además de los productos formativos.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Preguntas frecuentes
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-14 max-w-xl"
        style={{ letterSpacing: "-0.035em" }}
      >
        Lo que la gente suele preguntar.
      </h2>

      <div className="max-w-2xl border-t border-line">
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

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="px-8 md:px-14 py-16 border-t border-line">
      <p
        className="text-2xl font-light text-ink mb-8"
        style={{ letterSpacing: "0.05em" }}
      >
        forastero
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
              className="font-mono text-[10px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="h-px bg-line mb-6" />
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
        © forastero 2026 · Grono, Cantón Graubünden, Suiza
      </p>
    </footer>
  );
}
