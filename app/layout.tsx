import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { site, sections } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="masthead">
          <div className="wrap">
            <Link href="/" className="wordmark">
              <span className="wordmark-w" aria-hidden="true">W</span>
              WealthMack
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/tools">Tools</Link>
              <Link href={sections.options.path}>{sections.options.title}</Link>
              <Link href={sections.psychology.path}>{sections.psychology.title}</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <footer className="colophon">
          <div className="wrap">
            <p>
              {site.name} is educational. Nothing here is a recommendation to
              buy or sell any security. Options carry substantial risk and are
              not suitable for every investor.
            </p>
            <nav aria-label="Footer">
              <Link href="/about">About</Link>
              <Link href="/disclosures">Terms and risk</Link>
              <Link href="/privacy">Privacy</Link>
            </nav>
          </div>
        </footer>
        {site.analytics.cloudflareToken && (
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: site.analytics.cloudflareToken })}
          />
        )}
      </body>
    </html>
  );
}
