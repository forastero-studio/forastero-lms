import BuyButton from "@/components/ui/BuyButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper font-sans">
      <Nav />
      <Hero />
      <IntroSection />
      <ProductsSection />
      <ConversationSection />
      <FaqSection />
      <Footer />
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-14 py-5 border-b border-line">
      <p
        className="text-sm font-light text-ink"
        style={{ letterSpacing: "0.05em" }}
      >
        forastero
      </p>
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Formaciones", href: "#formaciones" },
          { label: "Preguntas", href: "#faq" },
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
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <header className="min-h-[72vh] flex flex-col justify-end px-8 md:px-14 pt-20 pb-16 border-b border-line">
      <h1
        className="text-[clamp(40px,6vw,80px)] leading-[.95] font-light text-ink mb-6 max-w-3xl"
        style={{ letterSpacing: "-0.05em" }}
      >
        De CAD a BIM,
        <br />
        sin modificar tu
        <br />
        forma de trabajar.
      </h1>
      <p className="text-xl font-light text-deep leading-[1.5] max-w-xl">
        Sin frustrarte, abandonar o empezar desde cero.
      </p>
    </header>
  );
}

/* ─── Intro ─────────────────────────────────────────────────────────────── */

function IntroSection() {
  return (
    <section className="px-8 md:px-14 py-24 border-b border-line">
      <div className="max-w-2xl">
        <p className="text-base font-light text-deep leading-[1.65] mb-5">
          Durante años trabajaste con AutoCAD®. Lo dominás. Tu forma de
          producir está afinada — sabés dónde poner cada línea, qué layer
          usar, cómo escalar para imprimir.
        </p>
        <p className="text-base font-light text-deep leading-[1.65] mb-5">
          El problema no es el software. El problema es que ahora podés hacer
          lo mismo en la mitad del tiempo, con menos errores, y dejar
          información que se reutiliza en cada proyecto siguiente.
        </p>
        <p className="text-base font-light text-deep leading-[1.65] mb-5">
          No hace falta descartar lo que ya sabés ni dedicarle meses de tu
          vida a empezar desde cero.
        </p>
        <p className="text-base font-light text-deep leading-[1.65] mb-14">
          Con 30 minutos por día durante 8 semanas, ya estás entregando
          proyectos con criterio BIM, sin perder velocidad ni control.
        </p>
        <blockquote className="border-l border-ink pl-7">
          <p
            className="text-[28px] leading-[1.18] font-light text-ink"
            style={{ letterSpacing: "-0.035em" }}
          >
            Tu manera de trabajar tiene valor. No hay que destruirla. Hay que
            volverla más inteligente.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* ─── Products ──────────────────────────────────────────────────────────── */

function ProductsSection() {
  return (
    <section id="formaciones" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Formaciones
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-14"
        style={{ letterSpacing: "-0.035em" }}
      >
        Elegí tu punto de entrada.
      </h2>

      <div className="border border-line">
        {/* Fila 1: Taller + Workshop lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
          {/* Card 1 · Taller de Documentación de Obras · Blanco */}
          <div className="bg-white p-8 md:p-10 flex flex-col border-b md:border-b-0 md:border-r border-line">
            <h3
              className="text-[22px] font-light text-ink mb-1 leading-snug"
              style={{ letterSpacing: "-0.03em" }}
            >
              Taller de Documentación de Obras
            </h3>
            <p
              className="text-[36px] font-light text-ink mb-6 leading-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 100
            </p>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 flex-1">
              Un sistema de trabajo para tener tu estudio y tus proyectos
              ordenados. Aprendés a dibujar planos ejecutivos profesionales y a
              estructurar el método que se aplica a cualquier proyecto.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Método aplicable desde el primer proyecto",
                "Ahorrás 2-4 horas por semana solo con plantillas y CTBs",
                "Acceso de por vida + actualizaciones incluidas",
              ].map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm font-light text-stone"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {b}
                </li>
              ))}
            </ul>
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_TALLER!}
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors w-fit"
            >
              Empezar
            </BuyButton>
          </div>

          {/* Card 2 · Workshop Cotización de Obras · Blanco */}
          <div className="bg-white p-8 md:p-10 flex flex-col">
            <h3
              className="text-[22px] font-light text-ink mb-1 leading-snug"
              style={{ letterSpacing: "-0.03em" }}
            >
              Workshop Cotización de Obras
            </h3>
            <p
              className="text-[36px] font-light text-ink mb-6 leading-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              USD 80
            </p>
            <p className="text-sm font-light text-stone leading-relaxed mb-6 flex-1">
              Sistema para presupuestar obras sin trabarte. Aprendés un método
              claro para computar, valorizar y presentar al cliente, con
              criterios para decidir qué medir y cómo.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Planillas Excel listas para usar y modificar",
                "Cotización profesional en horas en lugar de días",
                "Acceso de por vida + actualizaciones incluidas",
              ].map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm font-light text-stone"
                >
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                  {b}
                </li>
              ))}
            </ul>
            <BuyButton
              checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_WORKSHOP!}
              className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors w-fit"
            >
              Empezar
            </BuyButton>
          </div>
        </div>

        {/* Fila 2: CAD Management · Negro · ancho completo */}
        <div className="bg-ink p-8 md:p-10 border-b border-line">
          <div className="md:flex md:items-start md:justify-between md:gap-14">
            <div className="flex-1 mb-8 md:mb-0">
              <h3
                className="text-[22px] font-light text-white mb-1 leading-snug"
                style={{ letterSpacing: "-0.03em" }}
              >
                CAD Management
              </h3>
              <p className="font-mono text-[10px] tracking-[.08em] uppercase text-white/40 mb-3">
                Taller + Workshop
              </p>
              <p
                className="text-[36px] font-light text-white mb-6 leading-none"
                style={{ letterSpacing: "-0.05em" }}
              >
                USD 150{" "}
                <span className="text-sm font-light text-white/40">
                  (ahorrás USD 30)
                </span>
              </p>
              <p className="text-sm font-light text-white/70 leading-relaxed mb-6 max-w-xl">
                Los dos métodos juntos: el de cómo trabajar y el de cómo cobrar.
                Para quien quiere ordenar el estudio de punta a punta — desde
                cómo producir cada plano hasta cómo cotizar cada obra.
              </p>
              <ul className="flex flex-col gap-2 mb-8">
                {[
                  "Sistema completo de documentación + cotización",
                  "Mismo lenguaje en todo: tu estudio funciona como una unidad",
                  "Pensado para implementar en 30 días sin frenar tu trabajo actual",
                ].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-light text-white/70"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
            className="inline-block border border-white/40 text-white px-5 py-3 text-sm font-light hover:border-white transition-colors w-fit"
          >
            Empezar
          </BuyButton>
        </div>

        {/* Fila 3: Bootcamp · Blanco · ancho completo */}
        <div className="bg-white p-8 md:p-10 border-b border-line">
          <div className="md:flex md:items-start md:justify-between md:gap-14">
            <div className="flex-1 mb-8 md:mb-0">
              <h3
                className="text-[22px] font-light text-ink mb-1 leading-snug"
                style={{ letterSpacing: "-0.03em" }}
              >
                Bootcamp CAD → BIM
              </h3>
              <p className="font-mono text-[10px] tracking-[.08em] uppercase text-stone mb-3">
                8 semanas
              </p>
              <p
                className="text-[36px] font-light text-ink mb-6 leading-none"
                style={{ letterSpacing: "-0.05em" }}
              >
                USD 350
              </p>
              <p className="text-sm font-light text-stone leading-relaxed mb-4 max-w-xl">
                La transición real a BIM, paso a paso. No teoría suelta — un
                proyecto profesional completo modelado de principio a fin, con un
                asistente digital al lado que sabe en qué semana estás y en qué
                te trabás.
              </p>
              <p className="text-sm font-light text-stone leading-relaxed mb-6 max-w-xl">
                Al final tenés un proyecto BIM terminado, un certificado
                verificable, y la confianza de saber que podés repetir el proceso
                con cualquier encargo que llegue al estudio.
              </p>
              <ul className="flex flex-col gap-2 mb-8">
                {[
                  "8 semanas con dedicación de 30-45 min por día",
                  "Elegís entre 2 proyectos guía (refugio alpino o cabina patagónica)",
                  "Asistente IA disponible 24/7 con conocimiento de tu proyecto",
                  "Validación profesional al cierre de cada semana",
                  "Certificado verificable al completar el bootcamp",
                  "Acceso de por vida + actualizaciones incluidas",
                ].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-light text-stone"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
            className="inline-block border border-ink text-ink px-5 py-3 text-sm font-light hover:border-rust hover:text-rust transition-colors w-fit"
          >
            Empezar
          </BuyButton>
        </div>

        {/* Fila 4: Pack Completo · Negro · ancho completo */}
        <div className="bg-ink p-8 md:p-10">
          <h3
            className="text-[22px] font-light text-white mb-1 leading-snug"
            style={{ letterSpacing: "-0.03em" }}
          >
            Pack Completo
          </h3>
          <p className="font-mono text-[10px] tracking-[.08em] uppercase text-white/40 mb-3">
            CAD Management + Bootcamp
          </p>
          <p
            className="text-[36px] font-light text-white mb-6 leading-none"
            style={{ letterSpacing: "-0.05em" }}
          >
            USD 450{" "}
            <span className="text-sm font-light text-white/40">
              (ahorrás USD 50)
            </span>
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed mb-4 max-w-xl">
            Todo. El orden completo del estudio y la transición técnica a BIM en
            un solo paquete. Para quien decide hacer el cambio en serio y de una
            vez.
          </p>
          <p className="text-sm font-light text-white/70 leading-relaxed mb-6 max-w-xl">
            Empezás ordenando lo que ya hacés con CAD, y mientras tanto modelás
            tu primer proyecto BIM con acompañamiento profesional. Cuando
            termines, tu estudio funciona de manera distinta.
          </p>
          <ul className="flex flex-col gap-2 mb-8">
            {[
              "Las dos formaciones completas con acceso simultáneo",
              "Podés combinarlas: aplicar el Taller al proyecto del Bootcamp",
              "Mejor relación entre inversión y resultado",
              "Certificado del Bootcamp incluido",
            ].map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm font-light text-white/70"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
                {b}
              </li>
            ))}
          </ul>
          <BuyButton
            checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PACK!}
            className="inline-block border border-white/40 text-white px-5 py-3 text-sm font-light hover:border-white transition-colors w-fit"
          >
            Empezar
          </BuyButton>
        </div>
      </div>
    </section>
  );
}

/* ─── Conversación ──────────────────────────────────────────────────────── */

function ConversationSection() {
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
      text: "Tenés un asistente IA del bootcamp disponible 24/7 que sabe en qué semana estás, qué proyecto modelás, qué software usás. Cuando te trabás, le mostrás el problema y te guía con criterio profesional, no con tutoriales genéricos.\n\nEstá integrado en cada semana del bootcamp y te acompaña de principio a fin.",
    },
  ];

  return (
    <section className="px-8 md:px-14 py-24 border-b border-line">
      <div className="max-w-2xl">
        <p className="font-mono text-[9px] tracking-[.1em] uppercase text-stone mb-8">
          Simulación de conversación
        </p>
        <div className="flex flex-col gap-6">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div
                key={i}
                className="bg-muted px-5 py-4 ml-8 text-sm font-light text-deep leading-relaxed"
              >
                {msg.text}
              </div>
            ) : (
              <div key={i} className="border-l border-ink pl-5">
                <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone mb-2">
                  forastero · asistente
                </p>
                {msg.text.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className={`text-sm font-light text-deep leading-relaxed ${j > 0 ? "mt-3" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "¿Y si compro y después no me da el tiempo?",
    a: "Tenés 7 días para pedir reembolso si algo no encaja. El acceso al material es de por vida, así que si te trabás un mes (o varios), podés retomar cuando puedas. No hay cohortes ni fechas fijas.",
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
              <span className="text-sm font-light text-ink leading-snug">
                {item.q}
              </span>
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
    <footer className="px-8 md:px-14 py-16">
      <p
        className="text-2xl font-light text-ink mb-8"
        style={{ letterSpacing: "0.05em" }}
      >
        forastero
      </p>
      <div className="h-px bg-line mb-6" />
      <a
        href="mailto:info@forastero.studio"
        className="text-sm font-light text-stone hover:text-ink transition-colors block mb-6"
      >
        info@forastero.studio
      </a>
      <div className="flex flex-wrap gap-6 mb-8">
        {[
          { href: "/legal/terminos-y-condiciones", label: "Términos y Condiciones" },
          { href: "/legal/privacidad", label: "Política de Privacidad" },
          { href: "/legal/reembolso", label: "Política de Reembolso" },
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
      <div className="h-px bg-line mb-6" />
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
        © forastero 2026 · Grono, Cantón Graubünden, Suiza
      </p>
    </footer>
  );
}
