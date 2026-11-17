import { getArticles } from "@/lib/content";
import { sections, type SectionKey } from "@/lib/site";
import ArticleList from "./ArticleList";

export default function SectionHub({ section }: { section: SectionKey }) {
  const s = sections[section];
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{s.title}</h1>
        <p>{s.intro}</p>
      </header>
      <div className="prose">
        <ArticleList
          articles={getArticles(section)}
          empty="The first articles are being written."
        />
      </div>
    </div>
  );
}
