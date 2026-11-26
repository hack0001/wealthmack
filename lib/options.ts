// Covered call maths. All prices are per share; one contract covers 100 shares.

export const SHARES_PER_CONTRACT = 100;

export type CoveredCallInput = {
  /** Price paid (or current price) per share */
  stockPrice: number;
  /** Strike of the call sold */
  strike: number;
  /** Premium received per share */
  premium: number;
  /** Days until the call expires */
  days: number;
  /** Number of contracts (100 shares each) */
  contracts: number;
};

export type CoveredCallResult = {
  shares: number;
  /** Cash tied up after collecting the premium */
  netCost: number;
  premiumIncome: number;
  breakeven: number;
  maxProfit: number;
  maxLoss: number;
  /** Return if the shares are called away at the strike */
  returnIfCalled: number;
  /** Return if the share price finishes exactly where it started */
  returnIfUnchanged: number;
  annualisedIfCalled: number;
  annualisedIfUnchanged: number;
  /** How far the shares can fall before the position loses money */
  downsideCushion: number;
};

export function isValid(i: CoveredCallInput): boolean {
  return (
    [i.stockPrice, i.strike, i.premium, i.days, i.contracts].every(
      Number.isFinite,
    ) &&
    i.stockPrice > 0 &&
    i.strike > 0 &&
    i.premium >= 0 &&
    i.premium < i.stockPrice &&
    i.days >= 1 &&
    i.contracts >= 1
  );
}

/** Profit per share at expiration for the covered call. */
export function coveredCallProfit(i: CoveredCallInput, priceAtExpiry: number) {
  return Math.min(priceAtExpiry, i.strike) - i.stockPrice + i.premium;
}

/** Profit per share at expiration for holding the shares alone. */
export function stockProfit(i: CoveredCallInput, priceAtExpiry: number) {
  return priceAtExpiry - i.stockPrice;
}

/** Above this price at expiration, holding the shares alone would have made more. */
export function crossover(i: CoveredCallInput) {
  return i.strike + i.premium;
}

export function coveredCall(i: CoveredCallInput): CoveredCallResult {
  const shares = i.contracts * SHARES_PER_CONTRACT;
  const netPerShare = i.stockPrice - i.premium;
  const calledPerShare = coveredCallProfit(i, i.strike);
  const unchangedPerShare = coveredCallProfit(i, i.stockPrice);
  const returnIfCalled = calledPerShare / netPerShare;
  const returnIfUnchanged = unchangedPerShare / netPerShare;
  // Simple (non-compounded) annualisation: it assumes you could repeat the
  // same trade all year, which you usually cannot. Shown for comparison only.
  const perYear = 365 / i.days;
  return {
    shares,
    netCost: netPerShare * shares,
    premiumIncome: i.premium * shares,
    breakeven: netPerShare,
    maxProfit: calledPerShare * shares,
    maxLoss: netPerShare * shares,
    returnIfCalled,
    returnIfUnchanged,
    annualisedIfCalled: returnIfCalled * perYear,
    annualisedIfUnchanged: returnIfUnchanged * perYear,
    downsideCushion: i.premium / i.stockPrice,
  };
}

// Cash-secured put maths. You sell a put and set aside enough cash to buy
// the shares at the strike if you are assigned.

export type CashSecuredPutInput = {
  /** Today's share price, used for the "buy the shares now" comparison */
  stockPrice: number;
  /** Strike of the put sold: the price you agree to buy at */
  strike: number;
  /** Premium received per share */
  premium: number;
  days: number;
  contracts: number;
};

export type CashSecuredPutResult = {
  shares: number;
  /** Cash set aside to cover assignment (strike x shares) */
  cashRequired: number;
  premiumIncome: number;
  /** Strike minus premium: your real cost per share if assigned */
  breakeven: number;
  maxProfit: number;
  maxLoss: number;
  /** Premium as a share of the cash set aside */
  returnOnCash: number;
  annualisedReturn: number;
  /** How far below today's price your effective purchase price sits */
  discountIfAssigned: number;
};

export function isValidPut(i: CashSecuredPutInput): boolean {
  return (
    [i.stockPrice, i.strike, i.premium, i.days, i.contracts].every(Number.isFinite) &&
    i.stockPrice > 0 &&
    i.strike > 0 &&
    i.premium >= 0 &&
    i.premium < i.strike &&
    i.days >= 1 &&
    i.contracts >= 1
  );
}

/** Profit per share at expiration for the short put. */
export function cashSecuredPutProfit(i: CashSecuredPutInput, priceAtExpiry: number) {
  return i.premium - Math.max(0, i.strike - priceAtExpiry);
}

/** Profit per share for buying the shares today instead. */
export function buyNowProfit(i: CashSecuredPutInput, priceAtExpiry: number) {
  return priceAtExpiry - i.stockPrice;
}

/** Above this price at expiration, buying the shares today would have made more. */
export function putCrossover(i: CashSecuredPutInput) {
  return i.stockPrice + i.premium;
}

export function cashSecuredPut(i: CashSecuredPutInput): CashSecuredPutResult {
  const shares = i.contracts * SHARES_PER_CONTRACT;
  const breakeven = i.strike - i.premium;
  const returnOnCash = i.premium / i.strike;
  return {
    shares,
    cashRequired: i.strike * shares,
    premiumIncome: i.premium * shares,
    breakeven,
    maxProfit: i.premium * shares,
    maxLoss: breakeven * shares,
    returnOnCash,
    // Simple annualisation, for comparing trades of different lengths only.
    annualisedReturn: returnOnCash * (365 / i.days),
    discountIfAssigned: (i.stockPrice - breakeven) / i.stockPrice,
  };
}
