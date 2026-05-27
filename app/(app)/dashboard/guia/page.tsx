import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import Link from "next/link";

export const metadata = {
  title: "Cómo usar la plataforma · Forastero",
};

const sections = [
  {
    label: "01 · tus formaciones",
    title: "Accedé a tus formaciones desde el sidebar",
    body: "En el panel izquierdo encontrás todo lo que compraste. Cada formación se expande mostrando sus clases o semanas. Hacé click en cualquier ítem para ir directamente a ese contenido.",
  },
  {
    label: "02 · recursos",
    title: "Descargá archivos y visualizá PDFs",
    body: "Cada clase tiene videos explicativos, guías en PDF y archivos descargables (DWG, Excel, CTB). Los PDFs se abren dentro de la plataforma. Los archivos se descargan directo a tu computadora. Acceso de por vida — podés volver cuando quieras.",
  },
  {
    label: "03 · soporte",
    title: "¿Tenés dudas o algún archivo no carga?",
    body: "Escribinos a info@forastero.studio. Respondemos dentro de las 24 horas hábiles. Si un archivo no carga desde la plataforma, te lo enviamos directamente por email.",
  },
  {
    label: "04 · sesión",
    title: "Cerrar sesión y volver a entrar",
    body: 'Para cerrar sesión, usá el botón "Cerrar sesión" en la parte inferior del sidebar. Para volver a entrar, hacé click en "Mi perfil" en la landing o andá directo a tu formación — Clerk te va a pedir el email y la contraseña (o el código de acceso si usás magic link).',
  },
];

export default async function GuiaPlatformaPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <ContentArea>
      <p className="technical-header mb-8">forastero · plataforma · guía</p>

      <h1
        className="font-display text-4xl font-light text-ink mb-2 tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        Cómo usar la plataforma
      </h1>
      <p className="text-sm font-light text-stone mb-12">
        Todo lo que necesitás saber para moverte en el LMS de forastero.
      </p>

      <div className="flex flex-col gap-10 max-w-2xl">
        {sections.map((s) => (
          <div key={s.label}>
            <p className="eyebrow mb-3">{s.label}</p>
            <h2 className="text-lg font-light text-ink mb-3">{s.title}</h2>
            <p className="text-sm font-light text-stone leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-line mt-12 mb-8" />
      <Link
        href="/dashboard"
        className="font-mono text-[9px] tracking-[.1em] uppercase text-stone hover:text-ink transition-colors"
      >
        ← Dashboard
      </Link>
    </ContentArea>
  );
}
