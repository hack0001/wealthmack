const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const money = (n: number) => usd.format(n);
export const money0 = (n: number) => usd0.format(n);
export const signedMoney = (n: number) =>
  (n > 0 ? "+" : n < 0 ? "−" : "") + usd.format(Math.abs(n));
export const signedMoney0 = (n: number) =>
  (n > 0 ? "+" : n < 0 ? "−" : "") + usd0.format(Math.abs(n));
export const pct = (n: number, digits = 1) =>
  (n < 0 ? "−" : "") + (Math.abs(n) * 100).toFixed(digits) + "%";
export const longDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
