import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use and risk disclosures",
  description: `The terms for using ${site.name}, the risks of options trading, and how the site is funded.`,
  alternates: { canonical: "/disclosures" },
};

// TODO: have this page checked against the rules that apply to you before
// launch, especially before adding any broker or software affiliate links.
export default function Disclosures() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Terms of use and risk disclosures</h1>
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
          <a href="https://www.theocc.com/Company-Information/Documents-and-Archives/Options-Disclosure-Document">
            Characteristics and Risks of Standardized Options
          </a>.
        </p>
        <h2>The calculators</h2>
        <p>
          Calculators show simplified outcomes at expiration. They leave out
          commissions, taxes, dividends and early assignment, and they are
          not a forecast. Check any figure with your broker before acting on it.
        </p>
        <h2>Using the site</h2>
        <ul>
          <li>Articles, calculators and examples are provided as they are, for general education. They may contain errors, and they can go out of date.</li>
          <li>You are responsible for your own investment decisions and for checking figures with your broker.</li>
          <li>{site.name} is not liable for losses arising from use of the site, to the extent the law allows.</li>
          <li>The writing, tools and design are {site.name}&rsquo;s work. You are welcome to link to any page and quote short passages with credit; please don&rsquo;t republish whole articles.</li>
          <li>These terms may change. The current version is always on this page.</li>
        </ul>
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
