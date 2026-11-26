// Everything about the site that you will want to change in one place.
export const site = {
  name: "WealthMack",
  url: "https://wealthmack.com",
  tagline: "Options income, worked through with real numbers",
  description:
    "Calculators and worked examples for covered calls, cash-secured puts and the wheel, plus the psychology behind the decisions that go wrong.",
  // Author details. The About page, article bylines and structured data all
  // read from here.
  author: {
    name: "Tom Patel",
    // One line, shown under the homepage headline.
    credential: "Written by Tom Patel, CISI-qualified and formerly in investment management at a FTSE 250 firm.",
    qualification: "CISI investment management certificate",
    // Paragraphs for the About page.
    bio: [
      "I’m Tom Patel. I worked in investment management at a FTSE 250 firm, involved in the day-to-day running of investments, and hold a CISI investment management certificate.",
      "Working inside a large firm showed me how professionals actually think about income, risk and diversification. My specialities are dividend investing, portfolio theory and fixed income: how to build a portfolio that pays you, how its parts behave together, and what bonds really add. These days I invest my own money.",
      "Most of what the industry knows sits behind adviser fees, paywalls and jargon. WealthMack is my way of giving you the edge professionals have, without the gatekeepers. Every article and calculator shows its working, so you can check it rather than take my word for it.",
    ],
    knowsAbout: ["Dividend investing", "Portfolio theory", "Fixed income", "Options income strategies", "Investor psychology"],
  },
  // The address readers and the privacy policy point to.
  contact: {
    email: "thomas@wealthmack.com",
  },
  // Cloudflare Web Analytics site token (public, safe to commit). Find it in
  // Cloudflare > Web Analytics > Manage site > "Enable with JS Snippet
  // installation": copy the value after "token" in the snippet. Leave empty
  // to turn the analytics script off.
  // Kit (ConvertKit) form that newsletter signups are sent to. The number is
  // in the form's embed code: app.kit.com/forms/<this number>/subscriptions
  newsletter: {
    kitFormId: "3725680",
  },
  analytics: {
    cloudflareToken: "0d27157c7d924c1590aafb5e8ff6e020",
  },
};

export const sections = {
  options: {
    title: "Options income",
    path: "/options",
    intro:
      "Covered calls, cash-secured puts and the wheel, explained with the numbers left in.",
  },
  psychology: {
    title: "Trading psychology",
    path: "/psychology",
    intro:
      "Why sensible plans fall apart at the moment of decision, and what to do about it.",
  },
} as const;

export type SectionKey = keyof typeof sections;
