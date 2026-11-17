import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclosures and risk",
  description: `Risk warning, the limits of what ${site.name} provides, and how the site is funded.`,
  alternates: { canonical: "/disclosures" },
};

// TODO: have this page checked against the rules that apply to you before
// launch, especially before adding any broker or software affiliate links.
export default function Disclosures() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Disclosures and risk</h1>
      </header>
      <div className="prose">
        <h2>Education, not advice</h2>
        <p>
          {site.name} publishes general educational material. It does not
          know your circumstances and nothing on it is personal investment,
          tax or legal advice, or a recommendation to buy or sell anything.
        </p>
        <h2>Options risk</h2>
        <p>
          Options are complex and you can lose money quickly. Selling options
          can expose you to losses far larger than the premium received.
          Before trading listed US options, read the Options Clearing
          Corporation&rsquo;s{" "}
          <a href="https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document">
            Characteristics and Risks of Standardized Options
          </a>.
        </p>
        <h2>The calculators</h2>
        <p>
          Calculators show simplified outcomes at expiration. They leave out
          commissions, taxes, dividends and early assignment, and they are
          not a forecast. Check any figure with your broker before acting on it.
        </p>
        <h2>How the site is funded</h2>
        <p>
          {site.name} currently has no advertising and no affiliate
          relationships. If that changes, this page will say so and any link
          that earns a commission will be marked where it appears.
        </p>
      </div>
    </div>
  );
}
