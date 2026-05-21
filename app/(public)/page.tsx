import Link from "next/link";
import Button from "@/components/ui/Button";
import BuyButton from "@/components/ui/BuyButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper font-sans">
      <Nav />
      <Hero />
      <ProblemSection />
      <PathsSection />
      <AgentSection />
      <PricingSection />
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
      <p className="text-sm font-medium text-ink">
        Forastero{" "}
        <span className="font-light text-stone ml-2">· LMS</span>
      </p>
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Cursos", href: "#caminos" },
          { label: "Agente", href: "#agente" },
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
          Para arquitectos que vienen de AutoCAD
        </p>
        <h1
          className="text-[clamp(48px,7vw,96px)] leading-[.93] tracking-[-0.06em] font-light text-ink mb-8"
          style={{ letterSpacing: "-0.06em" }}
        >
          De CAD a BIM,
          <br />
          sin romper tu
          <br />
          manera de trabajar.
        </h1>
        <p className="text-xl font-light text-deep leading-[1.5] max-w-xl mb-10">
          Un sistema progresivo para ordenar tu documentación, modernizar
          tu flujo CAD y avanzar hacia BIM sin frustrarte ni empezar
          desde cero.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="#caminos">
            Elegir camino
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
        El problema
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-8 max-w-2xl"
        style={{ letterSpacing: "-0.035em" }}
      >
        No estás atrasado. Estás trabajando con un sistema que ya no
        alcanza.
      </h2>
      <p className="text-lg font-light text-deep leading-[1.65] max-w-2xl mb-12">
        Durante años, AutoCAD fue suficiente. Dibujar, documentar, imprimir,
        corregir, volver a dibujar. Pero el trabajo cambió: hoy te piden más
        velocidad, más precisión, mejores entregas, presupuestos más claros,
        coordinación e información.
      </p>
      <blockquote className="border-l border-ink pl-7 max-w-xl">
        <p
          className="text-[32px] leading-[1.18] font-light text-ink"
          style={{ letterSpacing: "-0.035em" }}
        >
          Tu manera de trabajar tiene valor. No hay que destruirla. Hay que
          volverla más inteligente.
        </p>
      </blockquote>
    </section>
  );
}

/* ─── 2 Caminos ─────────────────────────────────────────────────────────── */

function PathsSection() {
  return (
    <section id="caminos" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Dos caminos
      </p>
      <h2
        className="text-[44px] leading-[1.04] font-light text-ink mb-14 max-w-xl"
        style={{ letterSpacing: "-0.035em" }}
      >
        Elegí el que se ajusta a tu momento.
      </h2>

      <div className="grid md:grid-cols-2 gap-0 border border-line">
        <PathCard
          number="01"
          title="CAD Management"
          tag="Taller"
          description="Ordená tu producción en CAD."
          includes={[
            "Taller de Documentación de Obras",
            "Workshop de Cotización de Obras",
          ]}
          cta="Ver taller"
          href="/cad-management"
        />
        <PathCard
          number="02"
          title="Bootcamp CAD→BIM"
          tag="8 semanas · Con agente Forastero"
          description="La transición completa a BIM."
          includes={[
            "8 semanas de formación progresiva",
            "Agente Forastero integrado en cada semana",
          ]}
          cta="Ver bootcamp"
          href="/bootcamp"
          accent
        />
      </div>
    </section>
  );
}

function PathCard({
  number,
  title,
  tag,
  description,
  includes,
  cta,
  href,
  accent = false,
}: {
  number: string;
  title: string;
  tag: string;
  description: string;
  includes: string[];
  cta: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`min-h-[520px] p-8 md:p-10 flex flex-col border-r border-line last:border-r-0 ${
        accent ? "bg-ink text-white" : "bg-white"
      }`}
    >
      <p
        className={`font-mono text-[10px] tracking-[.12em] mb-14 ${
          accent ? "text-stone" : "text-stone"
        }`}
      >
        {number}
      </p>

      <div className="flex-1">
        <h3
          className={`text-[32px] leading-[1.02] font-light mb-3 ${
            accent ? "text-white" : "text-ink"
          }`}
          style={{ letterSpacing: "-0.04em" }}
        >
          {title}
        </h3>
        <p
          className={`text-sm mb-2 ${accent ? "text-amber" : "text-rust"}`}
        >
          {tag}
        </p>
        <p
          className={`text-base font-light leading-relaxed mb-8 ${
            accent ? "text-white/80" : "text-deep"
          }`}
        >
          {description}
        </p>

        <ul className="flex flex-col gap-2 mb-10">
          {includes.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 text-sm font-light ${
                accent ? "text-white/70" : "text-stone"
              }`}
            >
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={href}
        className={`inline-block border px-5 py-3 text-sm font-light transition-colors w-fit ${
          accent
            ? "border-white/40 text-white hover:border-white"
            : "border-ink text-ink hover:border-rust hover:text-rust"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

/* ─── Agente ────────────────────────────────────────────────────────────── */

function AgentSection() {
  const messages = [
    {
      role: "user" as const,
      text: "Vengo de AutoCAD. No entiendo si tengo que modelar todo desde el principio.",
    },
    {
      role: "agent" as const,
      text: "No. Ese es el error que hace abandonar a muchos arquitectos. Primero ordenás el proyecto. Después decidís qué información necesita modelo y qué puede seguir en CAD.",
    },
    {
      role: "user" as const,
      text: "¿Y mis bloques de AutoCAD sirven en Revit?",
    },
    {
      role: "agent" as const,
      text: "Depende. Los bloques de representación pueden quedarse en CAD linkeado. Las familias que tienen datos —puertas, aberturas, equipamiento— conviene convertirlas. Te ayudo a priorizar cuáles.",
    },
  ];

  return (
    <section id="agente" className="px-8 md:px-14 py-24 border-b border-line">
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div>
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
            El agente Forastero
          </p>
          <h2
            className="text-[44px] leading-[1.04] font-light text-ink mb-6"
            style={{ letterSpacing: "-0.035em" }}
          >
            No reemplaza tu criterio. Lo ordena.
          </h2>
          <p className="text-lg font-light text-deep leading-[1.65] mb-8">
            Disponible dentro del Bootcamp CAD→BIM, el agente acompaña
            cada semana del proceso. Responde dudas técnicas, ayuda a
            priorizar decisiones y te orienta sin sacarte del proyecto.
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
                    forastero · bim
                  </p>
                  <p className="text-sm font-light text-deep leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ───────────────────────────────────────────────────────────── */

const DISCLAIMER =
  "Precio en pesos argentinos calculado al momento del pago. Impuestos del país del comprador no incluidos.";

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

      <div className="grid md:grid-cols-3 gap-0 border border-line">
        <PriceCard
          number="01"
          title="CAD Management"
          price="USD 99"
          includes={[
            "Taller de Documentación de Obras",
            "Workshop de Cotización de Obras",
            "Acceso de por vida",
          ]}
          cta="Comprar taller"
          checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_CAD_MANAGEMENT!}
        />
        <PriceCard
          number="02"
          title="Bootcamp CAD→BIM"
          price="USD 297"
          includes={[
            "8 semanas de formación",
            "Agente Forastero integrado",
            "Acceso de por vida",
          ]}
          cta="Comprar bootcamp"
          checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_BOOTCAMP!}
        />
        <PriceCard
          number="03"
          title="Pack completo"
          price="USD 349"
          includes={[
            "CAD Management completo",
            "Bootcamp CAD→BIM completo",
            "Agente Forastero integrado",
            "Acceso de por vida",
          ]}
          cta="Comprar pack"
          checkoutUrl={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PACK!}
          featured
          badge="Mejor valor"
        />
      </div>
    </section>
  );
}

function PriceCard({
  number,
  title,
  price,
  includes,
  cta,
  checkoutUrl,
  featured = false,
  badge,
}: {
  number: string;
  title: string;
  price: string;
  includes: string[];
  cta: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`p-8 flex flex-col border-r border-line last:border-r-0 ${
        featured ? "bg-ink" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between mb-10">
        <p
          className={`font-mono text-[10px] tracking-[.12em] ${
            featured ? "text-white/40" : "text-stone"
          }`}
        >
          {number}
        </p>
        {badge && (
          <span className="font-mono text-[8px] tracking-[.1em] uppercase border border-amber text-amber px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>

      <h3
        className={`text-xl font-light mb-2 ${
          featured ? "text-white" : "text-ink"
        }`}
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h3>

      <p
        className={`text-[52px] font-light leading-none mb-6 ${
          featured ? "text-white" : "text-ink"
        }`}
        style={{ letterSpacing: "-0.05em" }}
      >
        {price}
      </p>

      <ul className="flex flex-col gap-2 mb-8 flex-1">
        {includes.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 text-sm font-light ${
              featured ? "text-white/60" : "text-stone"
            }`}
          >
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current" />
            {item}
          </li>
        ))}
      </ul>

      <p
        className={`text-[11px] font-light leading-relaxed mb-6 ${
          featured ? "text-white/40" : "text-stone"
        }`}
      >
        {DISCLAIMER}
      </p>

      <BuyButton
        checkoutUrl={checkoutUrl}
        className={`inline-block border px-5 py-3 text-sm font-light text-center transition-colors ${
          featured
            ? "border-white/40 text-white hover:border-white"
            : "border-ink text-ink hover:border-rust hover:text-rust"
        }`}
      >
        {cta}
      </BuyButton>
    </div>
  );
}

/* ─── Bio ───────────────────────────────────────────────────────────────── */

function BioSection() {
  return (
    <section id="quien-soy" className="px-8 md:px-14 py-24 border-b border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-5">
        Quién soy
      </p>
      <div className="grid md:grid-cols-[1fr_2fr] gap-14 items-start max-w-4xl">
        <div>
          <div className="w-full aspect-square bg-muted border border-line flex items-center justify-center max-w-[200px]">
            <p className="font-mono text-[9px] tracking-[.08em] uppercase text-stone/40 text-center px-4">
              Foto · próximamente
            </p>
          </div>
        </div>
        <div>
          <h2
            className="text-[32px] leading-[1.08] font-light text-ink mb-1"
            style={{ letterSpacing: "-0.035em" }}
          >
            Ariel Fragosa
          </h2>
          <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone mb-8">
            Architetto · Forastero · Grono, Suiza
          </p>
          <p className="text-base font-light text-deep leading-[1.65] mb-8">
            Originalmente de Argentina, basado en Grono (Cantón Graubünden,
            Suiza italiana) desde hace varios años. Combino una práctica
            arquitectónica independiente (Forastero) con trabajo en estudios
            profesionales en el Cantón Ticino. Forastero es una plataforma
            educativa que reúne lo que aprendí en proyectos reales — desde la
            documentación técnica clásica hasta la transición CAD → BIM con
            criterio profesional.
          </p>
          <div className="flex flex-col gap-1.5">
            <a
              href="https://forastero.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[.08em] uppercase text-stone hover:text-ink transition-colors"
            >
              forastero.studio →
            </a>
            <a
              href="mailto:info@forastero.studio"
              className="font-mono text-[10px] tracking-[.08em] uppercase text-stone hover:text-ink transition-colors"
            >
              info@forastero.studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: "¿Cuándo arranca el Bootcamp?",
    a: "No tiene fecha fija. Comprás cuando querés y arrancás cuando querés. La Semana 1 se desbloquea al confirmar tu pago.",
  },
  {
    q: "¿En cuánto tiempo termino el Bootcamp?",
    a: "El bootcamp está diseñado para 8 semanas con dedicación de ~8 horas/semana. Pero podés ir a tu ritmo: las semanas se desbloquean a medida que completás la validación de la anterior.",
  },
  {
    q: "¿Necesito experiencia previa con Revit o ArchiCAD?",
    a: "No. La Semana 0 (opcional) cubre los fundamentos del software. Si ya manejás uno de los dos, saltala.",
  },
  {
    q: "¿Cuál es mejor: Revit o ArchiCAD?",
    a: "Ambos funcionan. Lo importante es la lógica BIM, no el software. En la Semana 0 hay una guía para elegir.",
  },
  {
    q: "¿Qué pasa si me trabo?",
    a: "Tenés un agente IA disponible 24/7 que sabe en qué semana estás y qué proyecto elegiste. Te guía con preguntas concretas.",
  },
  {
    q: "¿Cómo se valida el avance?",
    a: "Al final de cada semana exportás un IFC del modelo. El agente lo valida automáticamente y te da feedback. Si está bien desbloqueás la siguiente semana.",
  },
  {
    q: "¿El certificado tiene validez profesional?",
    a: "Es un certificado emitido por Forastero, no por Autodesk ni Graphisoft. Refleja que completaste un proyecto BIM profesional completo. Es verificable públicamente.",
  },
  {
    q: "¿Puedo combinar el Taller, el Workshop y el Bootcamp?",
    a: "Sí. El Pack CAD Management + Bootcamp incluye todo con descuento.",
  },
  {
    q: "¿Hay reembolso si no me convence?",
    a: "14 días desde la compra sin justificación. Para el Bootcamp, además, siempre que no hayas completado más de 2 validaciones IFC. Detalle completo en la Política de Reembolso.",
  },
  {
    q: "¿Cómo me contacto si tengo dudas antes de comprar?",
    a: "info@forastero.studio · respuesta en 24-48 horas hábiles.",
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

/* ─── Footer ────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="px-8 md:px-14 py-16 flex flex-col md:flex-row justify-between items-start gap-6 border-t border-line">
      <p className="font-mono text-[10px] tracking-[.1em] uppercase text-stone">
        Forastero · Studio
      </p>
      <div className="flex flex-wrap gap-6">
        {[
          { href: "/legal/terminos-y-condiciones", label: "Términos y condiciones" },
          { href: "/legal/privacidad", label: "Política de privacidad" },
          { href: "/legal/reembolso", label: "Política de reembolso" },
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
    </footer>
  );
}
