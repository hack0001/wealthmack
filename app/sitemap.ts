export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tools", "/tools/covered-call-calculator", "/options", "/psychology", "/about", "/disclosures", "/privacy"];
  const articles = (["options", "psychology"] as const).flatMap((s) =>
    getArticles(s)
      .filter((a) => !a.draft)
      .map((a) => ({ url: `${site.url}/${s}/${a.slug}`, lastModified: a.updated ?? a.date })),
  );
  return [...pages.map((p) => ({ url: site.url + p })), ...articles];
}
