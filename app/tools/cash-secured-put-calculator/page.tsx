import type { Metadata } from "next";
import Link from "next/link";
import CashSecuredPutCalculator from "@/components/CashSecuredPutCalculator";
import { site } from "@/lib/site";

const title = "Cash-secured put calculator";
const description =
  "Work out a cash-secured put's return on cash, breakeven, effective purchase price and annualised yield, with a payoff chart against buying the shares today.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/cash-secured-put-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: title,
  description,
  url: `${site.url}/tools/cash-secured-put-calculator`,
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
            Enter today&rsquo;s share price, the strike you would buy at and the
            premium on offer. Drag across the chart to see the outcome at any
            price on expiration day.
          </p>
        </header>
        <CashSecuredPutCalculator />
      </div>

      <div className="prose">
        <h2>How the numbers are worked out</h2>
        <p>
          A cash-secured put is one put option sold, with enough cash set aside
          to buy 100 shares at the strike if you are assigned. Everything below
          is per share; multiply by 100 for each contract.
        </p>
        <table>
          <thead>
            <tr><th>Figure</th><th>Formula</th></tr>
          </thead>
          <tbody>
            <tr><td>Cash to set aside</td><td>Strike × 100</td></tr>
            <tr><td>Maximum profit</td><td>Premium</td></tr>
            <tr><td>Breakeven (real cost if assigned)</td><td>Strike − premium</td></tr>
            <tr><td>Maximum loss</td><td>Strike − premium (shares go to zero)</td></tr>
            <tr><td>Return on cash</td><td>Premium ÷ strike</td></tr>
            <tr><td>Annualised return</td><td>Return on cash × 365 ÷ days to expiration</td></tr>
          </tbody>
        </table>
        <h2>What the calculator leaves out</h2>
        <ul>
          <li>Interest on the cash you set aside, which many brokers pay and which adds to your return.</li>
          <li>Commissions and fees, which vary by broker.</li>
          <li>Taxes on the premium, which depend on where you live.</li>
          <li>Early assignment. The chart shows expiration day only.</li>
        </ul>
        <p>
          Return on cash is measured against the full strike value, because that
          is the money you have to keep available. Annualised figures are for
          comparing trades of different lengths; they assume you could repeat
          the same trade all year at the same premium, which markets rarely allow.
        </p>
        <p>
          New to the strategy? Read{" "}
          <Link href="/options/how-a-cash-secured-put-works">how a cash-secured put works</Link>,
          which walks through this calculator&rsquo;s starting example. Already own the
          shares? The <Link href="/tools/covered-call-calculator">covered call calculator</Link> covers
          the other half of the trade.
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
