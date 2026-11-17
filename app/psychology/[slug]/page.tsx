import ArticlePage, { articleMetadata } from "@/components/ArticlePage";
import { getArticles } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getArticles("psychology").map((a) => ({ slug: a.slug }));
  // A static build needs at least one page per route. While a section has no
  // published articles, build one placeholder that renders as "not found".
  return slugs.length ? slugs : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/psychology/[slug]">) {
  return articleMetadata("psychology", (await params).slug);
}

export default async function Page({ params }: PageProps<"/psychology/[slug]">) {
  return <ArticlePage section="psychology" slug={(await params).slug} />;
}
