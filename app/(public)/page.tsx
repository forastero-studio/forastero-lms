import Link from "next/link";
import type { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import HeroMacAnimation from "@/components/HeroMacAnimation";
import MobileNav from "@/components/MobileNav";

function W({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[90%] max-w-[1400px] mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Hero />
      <IntroSection />
      <ProductsSection />
      <PacksSection />
      <TransformationSection />
      <AgentSection />
      <FaqSection />
      <FinalSection />
      <Footer />
    </div>
  );
}

/* ─── Nav ──────────────────────────────────────────────────────────── */

async function Nav() {
  const { userId } = await auth();
  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] border-b border-line backdrop-blur-[18px]"
      style={{ padding: "22px 0", background: "rgba(245,244,242,0.82)" }}
    >
      <W className="flex justify-between items-center">
        <Link
          href="/"
          className="font-sans text-[20px] tracking-[.16em] font-medium lowercase text-ink"
        >
          forastero
        </Link>
        {/* Desktop: idéntico al actual */}
        <div className="hidden md:flex gap-[38px] text-[13px] text-stone items-center">
          <a href="#productos" className="hover:text-ink transition-colors">
            Formaciones
          </a>
          <a href="#precios" className="hover:text-ink transition-colors">
            Precios
          </a>
          {userId ? (
            <Link
              href="/dashboard"
              className="border border-line-strong px-5 rounded-full hover:text-ink transition-colors"
              style={{ padding: "9px 20px", background: "rgba(250,250,249,0.5)" }}
            >
              Mi perfil
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="border border-line-strong rounded-full hover:text-ink transition-colors"
              style={{ padding: "9px 20px", background: "rgba(250,250,249,0.5)" }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile: hamburguesa + CTA */}
        <MobileNav isSignedIn={!!userId} />
      </W>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      className="min-h-screen flex items-center relative"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(60,59,55,0.06), transparent 34%), linear-gradient(to bottom, var(--bg), #efeeeb)",
      }}
    >
      <W>
        <div
          className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] items-center"
          style={{ gap: "70px", paddingTop: "60px" }}
        >
          {/* Left */}
          <div>
            <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-7">
              Para arquitectos que vienen de AutoCAD®
            </p>
            <h1
              className="font-semibold text-ink mb-[30px]"
              style={{ fontSize: "72px", lineHeight: "0.97", letterSpacing: "-3px" }}
            >
              De CAD a BIM,
              <br />
              sin modificar tu
              <br />
              forma de trabajar.
            </h1>
            <p className="text-[19px] leading-[1.7] text-stone" style={{ maxWidth: "640px" }}>
              Sin frustrarte, abandonar o empezar desde cero.
            </p>
            <div className="flex flex-wrap gap-[18px] mt-11">
              <a
                href="#productos"
                className="px-8 bg-ink text-bg rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
                style={{ padding: "17px 32px" }}
              >
                Ver formaciones
              </a>
              <a
                href="#precios"
                className="border border-line-strong text-ink rounded-full transition-all duration-300 hover:border-ink hover:bg-paper"
                style={{ padding: "17px 32px", background: "rgba(250,250,249,0.5)" }}
              >
                Ver precios
              </a>
            </div>
          </div>

          {/* Right: Mac window animation */}
          <HeroMacAnimation />
        </div>
      </W>
    </section>
  );
}

/* ─── Intro ─────────────────────────────────────────────────────────── */

function IntroSection() {
  return (
    <section style={{ padding: "130px 0 0" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px]">
          El punto de partida
        </p>
        <div style={{ maxWidth: "760px" }}>
          <p className="text-[19px] leading-[1.8] text-stone mb-[22px]">
            Durante años trabajaste con AutoCAD®. Lo dominás. Tu forma de producir está
            afinada — sabés dónde poner cada línea, qué layer usar, cómo escalar para imprimir.
          </p>
          <p className="text-[19px] leading-[1.8] text-stone mb-[22px]">
            El problema no es el software. El problema es que ahora podés hacer lo mismo en la
            mitad del tiempo, con menos errores, y dejar información que se reutiliza en cada
            proyecto siguiente.
          </p>
          <p className="text-[19px] leading-[1.8] text-stone mb-[22px]">
            No hace falta descartar lo que ya sabés ni dedicarle meses de tu vida a empezar
            desde cero. Con 30 minutos por día durante 8 semanas, ya estás entregando proyectos
            con criterio BIM, sin perder velocidad ni control.
          </p>
          <blockquote
            className="text-[30px] leading-[1.3] text-ink font-medium border-l-2 border-ink pl-7"
            style={{ marginTop: "50px", letterSpacing: "-0.5px" }}
          >
            Tu manera de trabajar tiene valor. No hay que destruirla. Hay que volverla más
            inteligente.
          </blockquote>
        </div>
      </W>
    </section>
  );
}

/* ─── Products ─────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    href: "/taller-documentacion-de-obras",
    tag: "Documentación",
    title: "Taller de Documentación de Obras",
    desc: "Un sistema de trabajo para tener tu estudio y tus proyectos ordenados. Aprendés a dibujar planos ejecutivos profesionales y a estructurar el método que se aplica a cualquier proyecto.",
    features: [
      "Método aplicable desde el primer proyecto",
      "Ahorrás 2-4 horas por semana solo con plantillas y CTBs",
      "Acceso de por vida + actualizaciones incluidas",
    ],
    price: "USD 100",
    cta: "Ver el Taller",
    primary: false,
  },
  {
    href: "/workshop-cotizacion-de-obras",
    tag: "Cotización",
    title: "Workshop Cotización de Obras",
    desc: "Sistema para presupuestar obras sin trabarte. Aprendés un método claro para computar, valorizar y presentar al cliente, con criterios para decidir qué medir y cómo.",
    features: [
      "Planillas Excel listas para usar y modificar",
      "Cotización profesional en horas en lugar de días",
      "Acceso de por vida + actualizaciones incluidas",
    ],
    price: "USD 80",
    cta: "Ver el Workshop",
    primary: false,
  },
  {
    href: "/bootcamp",
    tag: "Transición BIM",
    title: "Bootcamp CAD → BIM",
    desc: "La transición real a BIM, paso a paso. No teoría suelta — un proyecto profesional completo modelado de principio a fin, con un asistente digital al lado que sabe en qué semana estás.",
    features: [
      "8 semanas con dedicación de 30-45 min por día",
      "Elegís entre 2 proyectos guía: refugio alpino o cabina patagónica",
      "Asistente IA + certificado verificable al completar",
    ],
    price: "USD 350",
    cta: "Ver el Bootcamp",
    primary: true,
    comingSoon: true,
  },
];

function ProductsSection() {
  return (
    <section id="productos" style={{ padding: "130px 0" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px]">
          Las formaciones
        </p>
        <h2
          className="font-semibold text-ink mb-[22px]"
          style={{ fontSize: "52px", lineHeight: "1.02", letterSpacing: "-2px" }}
        >
          El orden del estudio.
          <br />
          La transición a BIM.
        </h2>
        <p className="text-[18px] leading-[1.75] text-stone" style={{ maxWidth: "680px" }}>
          No es solamente aprender software. Es ordenar tu forma de trabajar como arquitecto y
          dar el paso a BIM sin abandonar lo que ya sabés.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 mt-16"
          style={{ gap: "24px" }}
        >
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="bg-paper border border-line rounded-[26px] flex flex-col transition-all duration-[350ms] hover:-translate-y-2 hover:border-line-strong"
              style={{ padding: "36px", boxShadow: "0 14px 50px rgba(40,38,32,.04)" }}
            >
              <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-4">
                {p.tag}
              </p>
              <h3 className="font-semibold text-[28px] text-ink mb-[14px]">{p.title}</h3>
              <p className="text-[15px] leading-[1.65] text-stone mb-6 flex-1">{p.desc}</p>
              <ul className="flex flex-col gap-[9px] mb-[26px]">
                {p.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-[1.5] pl-4 relative"
                    style={{ color: "#52514d" }}
                  >
                    <span className="absolute left-0 text-soft">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className="text-[38px] font-semibold text-ink mb-6"
                style={{ letterSpacing: "-1px" }}
              >
                {p.price}
              </div>
              {p.comingSoon && (
                <p className="font-mono text-[9px] tracking-[.1em] uppercase text-soft mb-3">
                  — Próximamente —
                </p>
              )}
              <span
                className={`self-start rounded-full font-semibold text-[15px] transition-all duration-300 ${
                  p.primary
                    ? "bg-ink text-bg hover:-translate-y-0.5 hover:bg-accent"
                    : "border border-line-strong text-ink hover:border-ink hover:bg-paper"
                }`}
                style={{
                  padding: "17px 32px",
                  ...(!p.primary ? { background: "rgba(250,250,249,0.5)" } : {}),
                }}
              >
                {p.cta}
              </span>
            </Link>
          ))}
        </div>
      </W>
    </section>
  );
}

/* ─── Packs ─────────────────────────────────────────────────────────── */

function PacksSection() {
  return (
    <section id="precios" style={{ padding: "0 0 130px" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px]">
          Los packs · acceso de por vida
        </p>
        <div className="flex flex-col gap-6">

          {/* Pack outline */}
          <div
            className="bg-paper border border-line rounded-[26px] grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center transition-all duration-[350ms] hover:-translate-y-1"
            style={{ padding: "44px", gap: "40px" }}
          >
            <div>
              <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-4">
                Pack · ahorrás USD 30
              </p>
              <h3
                className="font-semibold text-[30px] text-ink mb-[14px]"
                style={{ letterSpacing: "-0.5px" }}
              >
                CAD Management
              </h3>
              <p className="text-[15px] leading-[1.65] text-stone mb-[18px]">
                Los dos métodos juntos: el de cómo trabajar y el de cómo cobrar. Para quien
                quiere ordenar el estudio de punta a punta — desde cómo producir cada plano
                hasta cómo cotizar cada obra.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Sistema completo de documentación + cotización",
                  "Mismo lenguaje en todo: tu estudio funciona como una unidad",
                  "Pensado para implementar en 30 días sin frenar tu trabajo actual",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-[1.5] pl-4 relative"
                    style={{ color: "#52514d" }}
                  >
                    <span className="absolute left-0 text-soft">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right">
              <div
                className="text-[48px] font-semibold text-ink mb-2"
                style={{ letterSpacing: "-1px" }}
              >
                USD 150
              </div>
              <div className="text-[12px] text-stone mb-[22px]" style={{ opacity: 0.62 }}>
                Taller + Workshop
              </div>
              <Link
                href="/cad-management"
                className="inline-block border border-line-strong text-ink rounded-full font-semibold transition-all duration-300 hover:border-ink hover:bg-paper"
                style={{ padding: "16px 30px", background: "rgba(250,250,249,0.5)" }}
              >
                Ver el pack
              </Link>
            </div>
          </div>

          {/* Pack dark */}
          <div
            className="bg-ink rounded-[26px] grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center transition-all duration-[350ms] hover:-translate-y-1"
            style={{ padding: "44px", gap: "40px", border: "1px solid var(--ink)" }}
          >
            <div>
              <p
                className="font-mono text-[11px] tracking-[.12em] uppercase mb-4"
                style={{ color: "#a8a59d" }}
              >
                Pack completo · ahorrás USD 50
              </p>
              <h3
                className="font-semibold text-[30px] text-bg mb-[14px]"
                style={{ letterSpacing: "-0.5px" }}
              >
                Pack Completo
              </h3>
              <p className="text-[15px] leading-[1.65] mb-[18px]" style={{ color: "#cfccc4" }}>
                Todo. El orden completo del estudio y la transición técnica a BIM en un solo
                paquete. Para quien decide hacer el cambio en serio y de una vez.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Las dos formaciones completas con acceso simultáneo",
                  "Podés combinarlas: aplicar el Taller al proyecto del Bootcamp",
                  "Certificado del Bootcamp incluido",
                ].map((f, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-[1.5] pl-4 relative"
                    style={{ color: "#e5e3dd" }}
                  >
                    <span className="absolute left-0" style={{ color: "var(--soft)" }}>
                      —
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right">
              <div
                className="text-[48px] font-semibold text-bg mb-2"
                style={{ letterSpacing: "-1px" }}
              >
                USD 450
              </div>
              <div className="text-[12px] text-bg mb-[22px]" style={{ opacity: 0.62 }}>
                CAD Management + Bootcamp
              </div>
              <p className="font-mono text-[9px] tracking-[.1em] uppercase mb-3" style={{ color: "#a8a59d" }}>
                — Próximamente —
              </p>
              <Link
                href="/pack-completo"
                className="inline-block rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ padding: "16px 30px", background: "var(--bg)", color: "var(--ink)" }}
              >
                Ver el pack
              </Link>
            </div>
          </div>

        </div>
      </W>
    </section>
  );
}

/* ─── Transformation ────────────────────────────────────────────────── */

function TransformationSection() {
  return (
    <section className="bg-muted" style={{ padding: "130px 0" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px]">
          No es el software
        </p>
        <h2
          className="font-semibold text-ink mb-[22px]"
          style={{ fontSize: "52px", lineHeight: "1.02", letterSpacing: "-2px" }}
        >
          Es el sistema.
        </h2>
        <p className="text-[18px] leading-[1.75] text-stone" style={{ maxWidth: "680px" }}>
          El problema no es aprender Revit® o ArchiCAD®. El problema es que tu forma de
          trabajar puede volverse más inteligente sin tirar lo que ya sabés.
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 mt-16"
          style={{ gap: "28px" }}
        >
          {/* Old */}
          <div
            className="rounded-[28px] border border-line"
            style={{ padding: "46px", minHeight: "400px", background: "#f7f6f3" }}
          >
            <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[22px]">
              Hoy
            </p>
            <h3
              className="font-semibold text-ink mb-8"
              style={{ fontSize: "42px", lineHeight: 1, letterSpacing: "-1px" }}
            >
              Arquitecto CAD
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                "Cada proyecto empieza de cero",
                "Documentación que no se reutiliza",
                "Cada presupuesto es un dolor de cabeza",
                "El orden depende de la memoria",
                "BIM se siente como empezar de nuevo",
              ].map((item, i) => (
                <li
                  key={i}
                  className="leading-[1.6] text-stone pl-[18px] relative"
                  style={{ opacity: 0.86 }}
                >
                  <span className="absolute left-[4px]">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* New */}
          <div
            className="bg-ink text-bg rounded-[28px] border border-line"
            style={{ padding: "46px", minHeight: "400px" }}
          >
            <p
              className="font-mono text-[11px] tracking-[.12em] uppercase mb-[22px]"
              style={{ color: "#a8a59d" }}
            >
              Después
            </p>
            <h3
              className="font-semibold text-bg mb-8"
              style={{ fontSize: "42px", lineHeight: 1, letterSpacing: "-1px" }}
            >
              El mismo arquitecto, con método
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                "Un sistema que se aplica a cada proyecto",
                "Información que se reutiliza siempre",
                "Cotización en horas, con criterio",
                "El estudio funciona como una unidad",
                "BIM se suma, no reemplaza lo que sabés",
              ].map((item, i) => (
                <li
                  key={i}
                  className="leading-[1.6] text-bg pl-[18px] relative"
                  style={{ opacity: 0.86 }}
                >
                  <span className="absolute left-[4px]">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </W>
    </section>
  );
}

/* ─── Agent ─────────────────────────────────────────────────────────── */

function AgentSection() {
  return (
    <section style={{ padding: "130px 0" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px]">
          El asistente
        </p>
        <h2
          className="font-semibold text-ink mb-[22px]"
          style={{ fontSize: "52px", lineHeight: "1.02", letterSpacing: "-2px" }}
        >
          No reemplaza tu criterio.
          <br />
          Lo acompaña.
        </h2>
        <p className="text-[18px] leading-[1.75] text-stone" style={{ maxWidth: "680px" }}>
          Un copiloto entrenado para arquitectura, documentación, BIM y workflows reales —
          no un chatbot genérico.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 mt-16"
          style={{ gap: "36px" }}
        >
          {/* Left card: description */}
          <div
            className="bg-paper rounded-[26px] border border-line"
            style={{ padding: "46px", boxShadow: "0 14px 50px rgba(40,38,32,.04)" }}
          >
            <h3
              className="font-semibold text-ink mb-6"
              style={{ fontSize: "34px" }}
            >
              Tu extensión profesional.
            </h3>
            <p className="text-[16px] leading-[1.75] text-stone">
              El objetivo no es reemplazar al arquitecto. Es ampliar sus capacidades.
              Disponible dentro del Bootcamp CAD → BIM, el asistente sabe en qué semana
              estás, qué proyecto modelás y qué software usás. Cuando te trabás, te guía
              con criterio profesional, no con tutoriales genéricos.
            </p>
          </div>

          {/* Right card: chat */}
          <div
            className="bg-paper rounded-[26px] border border-line"
            style={{ padding: "46px", boxShadow: "0 14px 50px rgba(40,38,32,.04)" }}
          >
            <div className="flex flex-col gap-[13px]">
              <div
                className="bg-muted rounded-[18px] text-ink self-end text-[14.5px] leading-[1.55]"
                style={{ padding: "16px 18px", maxWidth: "88%" }}
              >
                Estoy con AutoCAD® desde hace años. ¿Cuánto tiempo me lleva aprender BIM
                realmente?
              </div>
              <div
                className="bg-ink text-bg rounded-[18px] self-start text-[14.5px] leading-[1.55]"
                style={{
                  padding: "16px 18px",
                  maxWidth: "88%",
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[2px] uppercase mb-[6px]"
                  style={{ opacity: 0.6 }}
                >
                  forastero · asistente
                </div>
                Si ya manejás AutoCAD® a nivel profesional, en 4 semanas estás haciendo
                plantas BIM básicas funcionales. En 8 semanas estás entregando un proyecto
                BIM completo con documentación.
              </div>
              <div
                className="bg-muted rounded-[18px] text-ink self-end text-[14.5px] leading-[1.55]"
                style={{ padding: "16px 18px", maxWidth: "88%" }}
              >
                ¿Y si me trabo? No tengo a quién preguntarle.
              </div>
              <div
                className="bg-ink text-bg rounded-[18px] self-start text-[14.5px] leading-[1.55]"
                style={{
                  padding: "16px 18px",
                  maxWidth: "88%",
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[2px] uppercase mb-[6px]"
                  style={{ opacity: 0.6 }}
                >
                  forastero · asistente
                </div>
                Me mostrás el problema y te guío con criterio profesional. Sé en qué semana
                estás y qué proyecto modelás. Te acompaño de principio a fin.
              </div>
            </div>
          </div>
        </div>
      </W>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────────── */

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
    a: "Es un certificado emitido por forastero con ID único verificable públicamente. Refleja que completaste un proyecto BIM completo a nivel profesional. No reemplaza una matrícula universitaria, pero sirve para mostrar a clientes y a empleadores que tenés capacidad práctica real.",
  },
  {
    q: "¿Qué hago si quiero algo personalizado para mi estudio?",
    a: "Para asesoría o trabajos a medida sobre flujos de trabajo específicos, escribime a info@forastero.studio. forastero ofrece consultoría puntual para estudios además de los productos formativos.",
  },
];

function FaqSection() {
  return (
    <section style={{ padding: "0 0 130px" }}>
      <W>
        <p className="font-mono text-[11px] tracking-[.12em] uppercase text-soft mb-[26px] text-center">
          Preguntas frecuentes
        </p>
        <div className="mx-auto" style={{ maxWidth: "820px" }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-line py-[26px] text-center">
              <p className="text-[19px] font-medium text-ink mb-3">{item.q}</p>
              <p
                className="text-[15px] leading-[1.7] text-stone mx-auto"
                style={{ maxWidth: "620px" }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

/* ─── Final ─────────────────────────────────────────────────────────── */

function FinalSection() {
  return (
    <section
      className="text-center"
      style={{
        padding: "130px 0 120px",
        background: "linear-gradient(to bottom, var(--bg), #eae9e5)",
      }}
    >
      <W>
        <h2
          className="font-semibold text-ink mb-7"
          style={{ fontSize: "64px", lineHeight: "0.97", letterSpacing: "-3px" }}
        >
          Tu manera de trabajar
          <br />
          tiene valor.
        </h2>
        <p
          className="text-[19px] leading-[1.85] text-stone mx-auto"
          style={{ maxWidth: "760px" }}
        >
          No hay que destruirla. Hay que volverla más inteligente. forastero es un ecosistema
          de arquitectura y BIM pensado para arquitectos que quieren dar el paso sin perder lo
          que ya saben hacer.
        </p>
        <a
          href="#productos"
          className="inline-block mt-11 bg-ink text-bg rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
          style={{ padding: "17px 32px" }}
        >
          Ver formaciones
        </a>
      </W>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer
      className="border-t border-line"
      style={{ padding: "60px 0", background: "#edece8" }}
    >
      <W className="flex flex-col items-center gap-5 text-center">
        <div className="font-sans text-[24px] font-medium lowercase tracking-[.16em] text-ink">
          forastero
        </div>
        <a
          href="mailto:info@forastero.studio"
          className="text-[15px] text-stone hover:text-ink transition-colors"
        >
          info@forastero.studio
        </a>
        <div className="flex gap-6 text-[13px] text-stone">
          <Link
            href="/legal/terminos-y-condiciones"
            className="hover:text-ink transition-colors"
          >
            Términos y Condiciones
          </Link>
          <Link href="/legal/privacidad" className="hover:text-ink transition-colors">
            Política de Privacidad
          </Link>
        </div>
        <div
          className="font-mono text-[12px] text-soft mt-2"
          style={{ letterSpacing: ".05em" }}
        >
          © forastero 2026 · Grono, Cantón Graubünden, Suiza
        </div>
      </W>
    </footer>
  );
}
