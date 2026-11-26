import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `What ${site.name} collects when you visit, and what it doesn't.`,
  alternates: { canonical: "/privacy" },
};

// Written for the site as built: no accounts, no cookies, no ads, fonts served
// from this site, Cloudflare Web Analytics (cookieless) for visit counts, and a
// newsletter signup sent to Kit without loading Kit's scripts. Update this page
// before adding ads, affiliate tracking or any other third-party script.
export default function Privacy() {
  const email = site.contact.email;
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Privacy policy</h1>
        <p>Short version: {site.name} doesn&rsquo;t use cookies, only asks for your email address if you choose to subscribe, and doesn&rsquo;t sell anything about you.</p>
      </header>
      <div className="prose">
        <h2>What the site collects</h2>
        <ul>
          <li><strong>The calculators</strong> run entirely in your browser. Numbers you type are never sent to {site.name}.</li>
          <li><strong>Visit statistics.</strong> {site.name} uses Cloudflare Web Analytics to count page views and see which pages are read. It does not use cookies or local storage, and does not build a profile of you or follow you across other sites.</li>
          <li><strong>Server logs.</strong> The site is hosted by Cloudflare, which processes technical information such as your IP address and browser type to deliver pages and protect the site from attacks. See <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare&rsquo;s privacy policy</a>.</li>
          <li><strong>The newsletter.</strong> If you subscribe, your email address is stored by Kit (ConvertKit), the service that sends the newsletter, and used only to send it. You confirm your subscription by email first, and every email has an unsubscribe link. Kit may record whether emails are opened or links clicked. See <a href="https://kit.com/privacy">Kit&rsquo;s privacy policy</a>.</li>
          <li><strong>Emails you send.</strong> If you write in, your message and address are used only to reply.</li>
        </ul>
        <h2>Cookies</h2>
        <p>{site.name} sets no cookies. Cloudflare may set a strictly necessary security cookie if it needs to check that a visitor is not a bot.</p>
        <h2>Your rights</h2>
        <p>
          Under UK data protection law you can ask what personal data is held about you, and ask for it to be corrected or deleted
          {email ? <> by emailing <a href={`mailto:${email}`}>{email}</a></> : null}.
          You can also complain to the <a href="https://ico.org.uk/make-a-complaint/">Information Commissioner&rsquo;s Office</a>.
        </p>
        <h2>Changes</h2>
        <p>If {site.name} starts collecting anything new, this page will be updated first.</p>
      </div>
    </div>
  );
}
