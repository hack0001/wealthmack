import type { Metadata } from "next";
import Link from "next/link";
import CoveredCallCalculator from "@/components/CoveredCallCalculator";
import { site } from "@/lib/site";

const title = "Covered call calculator";
const description =
  "Work out a covered call's breakeven, maximum profit, return if called and annualised yield, with a payoff chart against simply holding the shares.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/covered-call-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: title,
  description,
  url: `${site.url}/tools/covered-call-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <div className="wrap stack">
      <div>
        <header className="page-head">
          <p className="crumb"><Link href="/tools">Tools</Link></p>
          <h1>{title}</h1>
          <p>
            Enter the share price, the strike you would sell and the premium on
            offer. Drag across the chart to see the outcome at any price on
            expiration day.
          </p>
        </header>
        <CoveredCallCalculator />
      </div>

      <div className="prose">
        <h2>How the numbers are worked out</h2>
        <p>
          A covered call is 100 shares plus one call option sold against them.
          Everything below is per share; multiply by 100 for each contract.
        </p>
        <table>
          <thead>
            <tr><th>Figure</th><th>Formula</th></tr>
          </thead>
          <tbody>
            <tr><td>Breakeven</td><td>Share price − premium</td></tr>
            <tr><td>Maximum profit</td><td>Strike − share price + premium</td></tr>
            <tr><td>Maximum loss</td><td>Share price − premium (shares go to zero)</td></tr>
            <tr><td>Return if called</td><td>Maximum profit ÷ (share price − premium)</td></tr>
            <tr><td>Return if unchanged</td><td>Profit with shares at today&rsquo;s price ÷ (share price − premium)</td></tr>
            <tr><td>Annualised return</td><td>Return × 365 ÷ days to expiration</td></tr>
          </tbody>
        </table>
        <h2>What the calculator leaves out</h2>
        <ul>
          <li>Commissions and fees, which vary by broker.</li>
          <li>Dividends paid before expiration, which add to your return.</li>
          <li>Taxes. Being called away can trigger a capital gain.</li>
          <li>Early assignment. The chart shows expiration day only.</li>
        </ul>
        <p>
          Annualised figures are for comparing trades of different lengths.
          They assume you could place the same trade again and again at the
          same premium, which markets rarely allow.
        </p>
        <p>
          New to the strategy? Read{" "}
          <Link href="/options/how-a-covered-call-works">how a covered call works</Link>,
          which walks through this calculator&rsquo;s starting example line by line.
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
