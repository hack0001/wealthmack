import ArticlePage, { articleMetadata } from "@/components/ArticlePage";
import { getArticles } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getArticles("options").map((a) => ({ slug: a.slug }));
  // A static build needs at least one page per route. While a section has no
  // published articles, build one placeholder that renders as "not found".
  return slugs.length ? slugs : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/options/[slug]">) {
  return articleMetadata("options", (await params).slug);
}

export default async function Page({ params }: PageProps<"/options/[slug]">) {
  return <ArticlePage section="options" slug={(await params).slug} />;
}
