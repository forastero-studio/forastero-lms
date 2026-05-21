const PRODUCT_NAMES: Record<string, string> = {
  "taller-documentacion": "Taller de Documentación de Obras",
  "workshop-cotizacion": "Workshop de Cotización de Obras",
  "pack-cad-management": "Pack CAD Management",
  "bootcamp": "Bootcamp CAD→BIM",
  "pack-completo": "Pack Completo",
};

const DASHBOARD_URL = "https://forastero-lms.vercel.app/dashboard";

function productName(slug: string): string {
  return PRODUCT_NAMES[slug] ?? slug;
}

function includesBootcamp(slug: string): boolean {
  return slug === "bootcamp" || slug === "pack-completo";
}

export function buildBienvenidaEmail(
  productSlug: string,
  customerEmail: string
): { subject: string; html: string } {
  const product = productName(productSlug);
  const withBootcamp = includesBootcamp(productSlug);

  const bootcampHint = withBootcamp
    ? `<p style="font-size:14px;font-weight:300;line-height:1.6;margin:0 0 16px;color:#444;">Si compraste el Bootcamp, te recomiendo arrancar por la Semana 1. El agente IA está disponible 24/7 desde tu dashboard.</p>`
    : "";

  const html = `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;background:#f7f5ef;padding:40px 32px;">
  <p style="font-family:monospace;font-size:10px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 24px;">Forastero Studio</p>
  <h1 style="font-size:22px;font-weight:300;margin:0 0 16px;">Bienvenido a Forastero</h1>
  <p style="font-size:14px;font-weight:300;line-height:1.6;margin:0 0 8px;">Acabás de comprar: ${product}.</p>
  <p style="font-size:14px;font-weight:300;line-height:1.6;margin:0 0 16px;color:#444;">Tu acceso ya está activo. Entrá con el email ${customerEmail}:</p>
  <a href="${DASHBOARD_URL}" style="display:inline-block;border:1px solid #111;color:#111;text-decoration:none;padding:10px 18px;font-family:monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:24px;">Acceder al LMS →</a>
  ${bootcampHint}
  <p style="font-size:13px;font-weight:300;color:#555;margin:0 0 4px;">Cualquier duda: <a href="mailto:info@forastero.studio" style="color:#111;">info@forastero.studio</a></p>
  <p style="font-size:11px;color:#aaa;margin-top:32px;">Forastero · Grono, Cantón Graubünden</p>
</div>`;

  return {
    subject: `Bienvenido a Forastero · ${product}`,
    html,
  };
}
