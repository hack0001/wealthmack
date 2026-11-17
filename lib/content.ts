import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { SectionKey } from "./site";

// Articles are markdown files in /content/<section>/<slug>.md
// Front matter: title, description, date (YYYY-MM-DD), updated?, draft?, tool?
// Drafts show up in `npm run dev` and are left out of the production build.

export type Article = {
  section: SectionKey;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  draft: boolean;
  /** Path of the tool this article should send readers to */
  tool?: string;
  html: string;
};

const root = path.join(process.cwd(), "content");
const showDrafts = process.env.NODE_ENV !== "production";

function read(section: SectionKey, file: string): Article {
  const raw = fs.readFileSync(path.join(root, section, file), "utf8");
  const { data, content } = matter(raw);
  const day = (v: unknown) =>
    v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
  return {
    section,
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: day(data.date),
    updated: data.updated ? day(data.updated) : undefined,
    draft: Boolean(data.draft),
    tool: data.tool ? String(data.tool) : undefined,
    html: marked.parse(content, { async: false }),
  };
}

export function getArticles(section: SectionKey): Article[] {
  const dir = path.join(root, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(section, f))
    .filter((a) => showDrafts || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(section: SectionKey, slug: string) {
  return getArticles(section).find((a) => a.slug === slug);
}
