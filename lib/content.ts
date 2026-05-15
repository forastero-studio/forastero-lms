import fs from "fs";
import path from "path";

export type ContentFile = {
  slug: string;
  title: string;
  body: string;
};

function readMarkdownDir(dir: string): ContentFile[] {
  const full = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf-8");
      const titleMatch = raw.match(/^#\s+(.+)$/m);
      return {
        slug: file.replace(".md", ""),
        title: titleMatch ? titleMatch[1] : file.replace(".md", ""),
        body: raw,
      };
    });
}

export function getCadManagementModules(): ContentFile[] {
  return readMarkdownDir("cad-management");
}

export function getBootcampWeeks(): ContentFile[] {
  return readMarkdownDir("bootcamp");
}

export function getCadManagementModule(slug: string): ContentFile | null {
  const all = getCadManagementModules();
  return all.find((m) => m.slug === slug) ?? null;
}

export function getBootcampWeek(slug: string): ContentFile | null {
  const all = getBootcampWeeks();
  return all.find((w) => w.slug === slug) ?? null;
}
