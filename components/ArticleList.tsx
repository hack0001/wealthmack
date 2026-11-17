import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleList({
  articles,
  empty,
}: {
  articles: Article[];
  empty: string;
}) {
  if (articles.length === 0) return <p className="empty">{empty}</p>;
  return (
    <ul className="article-list">
      {articles.map((a) => (
        <li key={a.slug}>
          {a.draft && <span className="draft-flag">Draft, hidden on the live site</span>}
          <Link href={`/${a.section}/${a.slug}`}>{a.title}</Link>
          <p>{a.description}</p>
        </li>
      ))}
    </ul>
  );
}
