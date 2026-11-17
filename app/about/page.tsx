import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who writes ${site.name} and how the tools and articles are made.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>About {site.name}</h1>
      </header>
      <div className="prose">
        <p>
          {site.name} covers options income strategies and the psychology of
          the people trading them. Every strategy comes with a calculator so
          you can check the claims against your own numbers.
        </p>
        {/* TODO: fill in site.author in lib/site.ts. Your wealth management
            background is the strongest trust signal the site has, so be
            specific: roles, years, qualifications, and what you did not do. */}
        {site.author.name && (
          <>
            <h2>Who writes it</h2>
            <p>{site.author.bio}</p>
          </>
        )}
        <h2>How the site works</h2>
        <ul>
          <li>Formulas and assumptions are shown next to every tool.</li>
          <li>Examples use round, made-up numbers unless a source is named.</li>
          <li>Nothing here tells you what to trade. It shows you how to work out what a trade would do.</li>
          <li>If something is wrong, it gets corrected and the article shows the date it was updated.</li>
        </ul>
      </div>
    </div>
  );
}
