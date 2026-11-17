import Link from "next/link";
import CoveredCallCalculator from "@/components/CoveredCallCalculator";
import ArticleList from "@/components/ArticleList";
import { getArticles } from "@/lib/content";
import { sections } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>See what a covered call pays before you sell it.</h1>
            <p>
              Change the numbers and watch the trade-off move: the income you
              collect, the upside you give away, and the price where you start
              losing money.
            </p>
            <Link className="button" href="/tools/covered-call-calculator">
              Open the full calculator
            </Link>
          </div>
          <CoveredCallCalculator compact />
        </div>
      </section>

      <section className="band">
        <div className="wrap columns">
          {(["options", "psychology"] as const).map((key) => (
            <div className="column" key={key}>
              <h2>
                <Link href={sections[key].path} style={{ color: "inherit", textDecoration: "none" }}>
                  {sections[key].title}
                </Link>
              </h2>
              <p>{sections[key].intro}</p>
              <ArticleList
                articles={getArticles(key).slice(0, 4)}
                empty="The first articles are being written."
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
