import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>This page doesn&rsquo;t exist</h1>
        <p>It may have moved when the site was rebuilt. These are the best places to start:</p>
      </header>
      <div className="prose">
        <ul>
          <li><Link href="/tools/covered-call-calculator">Covered call calculator</Link></li>
          <li><Link href="/options">Options income articles</Link></li>
          <li><Link href="/psychology">Trading psychology</Link></li>
          <li><Link href="/">Home page</Link></li>
        </ul>
      </div>
    </div>
  );
}
