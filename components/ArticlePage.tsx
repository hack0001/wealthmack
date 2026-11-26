import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle } from "@/lib/content";
import NewsletterSignup from "./NewsletterSignup";
import { longDate } from "@/lib/format";
import { sections, site, type SectionKey } from "@/lib/site";

export function articleMetadata(section: SectionKey, slug: string): Metadata {
  const a = getArticle(section, slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/${section}/${slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.date, modifiedTime: a.updated ?? a.date },
    robots: a.draft ? { index: false } : undefined,
  };
}

export default function ArticlePage({ section, slug }: { section: SectionKey; slug: string }) {
  const a = getArticle(section, slug);
  if (!a) notFound();
  const s = sections[section];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: s.title, item: `${site.url}${s.path}` },
      { "@type": "ListItem", position: 3, name: a.title },
    ],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    mainEntityOfPage: `${site.url}/${section}/${slug}`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    ...(site.author.name && { author: { "@type": "Person", name: site.author.name, url: `${site.url}/about` } }),
  };
  return (
    <article className="wrap">
      <header className="page-head">
        <p className="crumb"><Link href={s.path}>{s.title}</Link></p>
        {a.draft && <span className="draft-flag">Draft, hidden on the live site</span>}
        <h1>{a.title}</h1>
        <p>{a.description}</p>
        <p className="byline">
          {site.author.name && <>By <Link href="/about">{site.author.name}</Link>. </>}
          Published {longDate(a.date)}
          {a.updated && a.updated !== a.date && <>, updated {longDate(a.updated)}</>}
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: a.html }} />
      {a.tool && (
        <aside className="tool-cta">
          <h2>Run it with your own numbers</h2>
          <p>Enter your share price, strike and premium to see your breakeven, returns and payoff at expiration.</p>
          <Link className="button" href={a.tool}>Open the calculator</Link>
        </aside>
      )}
      <div className="article-signup">
        <NewsletterSignup heading="Get the next one by email" />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c") }} />
    </article>
  );
}
