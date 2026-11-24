import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who writes ${site.name} and how the tools and articles are made.`,
  alternates: { canonical: "/about" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.name,
  url: `${site.url}/about`,
  email: `mailto:${site.contact.email}`,
  knowsAbout: site.author.knowsAbout,
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: site.author.qualification,
    recognizedBy: { "@type": "Organization", name: "Chartered Institute for Securities & Investment", url: "https://www.cisi.org" },
  },
  worksFor: { "@type": "Organization", name: site.name, url: site.url },
};

export default function About() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>About {site.name}</h1>
      </header>
      <div className="prose">
        <p>
          {site.name} covers options income strategies, dividend investing and
          the psychology of the people doing it. Every strategy comes with a calculator so
          you can check the claims against your own numbers.
        </p>
        <h2>Who writes it</h2>
        {site.author.bio.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
        <p>
          I don&rsquo;t give personal advice, and nothing on {site.name} tells
          you what to buy or sell. It shows you how to work out what a trade
          would do, so the decision stays yours.
        </p>
        {site.contact.email && (
          <>
            <h2>Get in touch</h2>
            <p>
              Spotted a mistake, or have a question about a calculator? Email{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </div>
  );
}
