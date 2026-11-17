import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Options calculators",
  description: "Free calculators for options income strategies. Enter your own numbers and see the payoff.",
  alternates: { canonical: "/tools" },
};

// Add each new tool here as it ships.
const tools = [
  {
    href: "/tools/covered-call-calculator",
    title: "Covered call calculator",
    text: "Breakeven, maximum profit, return if called and a payoff chart you can drag through.",
  },
];

export default function Tools() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Tools</h1>
        <p>Put your own numbers in. Every calculator shows its assumptions and runs in your browser, so nothing you enter is sent anywhere.</p>
      </header>
      <div className="prose">
        <ul className="article-list">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>{t.title}</Link>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
