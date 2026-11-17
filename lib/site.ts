// Everything about the site that you will want to change in one place.
export const site = {
  name: "WealthMack",
  url: "https://wealthmack.com",
  tagline: "Options income, worked through with real numbers",
  description:
    "Calculators and worked examples for covered calls, cash-secured puts and the wheel, plus the psychology behind the decisions that go wrong.",
  // TODO: replace with your real name and background before launch.
  author: {
    name: "",
    bio: "",
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
