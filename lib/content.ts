import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Descargable = {
  nombre: string;
  fileId: string;
  tipo: "inline" | "download";
};

export type ContentFile = {
  slug: string;
  title: string;
  body: string;
  videoDriveId?: string;
  prevModulo?: string | null;
  nextModulo?: string | null;
  duracion_estimada?: string;
  clase?: number;
  moduloLetra?: string;
  descargables?: Descargable[];
};

function readMarkdownFiles(dir: string): ContentFile[] {
  const full = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? file.replace(".md", ""),
        title: data.title ?? file.replace(".md", ""),
        body: content,
        videoDriveId: data.videoDriveId || undefined,
        prevModulo: data.prevModulo ?? null,
        nextModulo: data.nextModulo ?? null,
        duracion_estimada: data.duracion_estimada,
        clase: data.clase,
        moduloLetra: data.moduloLetra,
        descargables: Array.isArray(data.descargables) ? data.descargables : undefined,
      };
    });
}

export function getCadManagementModules(): ContentFile[] {
  const taller = readMarkdownFiles("cad-management/taller");
  const workshop = readMarkdownFiles("cad-management/workshop");
  return [...taller, ...workshop];
}

export function getBootcampWeeks(): ContentFile[] {
  return readMarkdownFiles("bootcamp");
}

export function getCadManagementModule(slug: string): ContentFile | null {
  return getCadManagementModules().find((m) => m.slug === slug) ?? null;
}

export function getBootcampWeek(slug: string): ContentFile | null {
  return getBootcampWeeks().find((w) => w.slug === slug) ?? null;
}

export type LegalPage = {
  slug: string;
  title: string;
  ultimaActualizacion?: string;
  body: string;
};

const LEGAL_SLUGS: Record<string, string> = {
  "terminos-y-condiciones": "terminos-y-condiciones",
  privacidad: "politica-privacidad",
  reembolso: "politica-reembolso",
};

export function getLegalPage(slug: string): LegalPage | null {
  const filename = LEGAL_SLUGS[slug];
  if (!filename) return null;

  const full = path.join(process.cwd(), "content", "legal", `${filename}.md`);
  if (!fs.existsSync(full)) return null;

  const raw = fs.readFileSync(full, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    ultimaActualizacion: data.ultimaActualizacion,
    body: content,
  };
}
