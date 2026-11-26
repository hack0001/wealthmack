---
title: "Covered calls on dividend shares: when the extra income is worth it"
description: "Selling calls against dividend shares can add income, but it caps your growth and invites overtrading. A worked year of numbers, the ex-dividend trap, and the shares to leave alone."
date: 2026-11-26
tool: /tools/covered-call-calculator
---

Selling covered calls against shares you already hold for their dividends sounds like the obvious way to get more income from the same money. Sometimes it is. But it changes what the shares can do for you in ways the extra income does not show, and it adds a monthly decision to a strategy whose main strength is that it needs very few decisions.

## Income first, growth later

When I worked in investment management for retail clients at a FTSE 250 firm, income was the main aim for most of them, ahead of capital growth. Dividends mattered especially while interest rates were low and savings accounts paid almost nothing. Clients saw capital growth as a long-term objective, but they expected income from the start.

That is the right frame for thinking about covered calls. A covered call turns some of a share's possible future growth into cash today. For an income investor, that can look like a natural trade. The question is how much growth you are giving away, and whether you will actually need it.

Covered calls were not something we offered private clients. Their income came from dividends and bonds. That does not make the strategy wrong, but it is worth knowing that a professional income portfolio can run perfectly well without it.

## How the two incomes fit together

A covered call is 100 shares plus one call option sold against them. You collect a premium now, and in return you agree to sell the shares at the strike price if they finish above it at expiration. If you are new to the mechanics, [how a covered call works](/options/how-a-covered-call-works) walks through a single trade.

On a dividend share, you now have two sources of income:

- **Dividends**, paid by the company, usually quarterly in the US and twice a year for many UK companies.
- **Option premiums**, paid by the buyer of each call you sell.

Option prices already allow for expected dividends. When a share goes ex-dividend, its price typically drops by roughly the dividend, and calls are priced with that drop built in. Calls on high-dividend shares are therefore a little cheaper than calls on otherwise identical shares that pay nothing. You are not getting the dividend twice.

## A year of numbers

Here is an illustrative example. Real premiums depend on the share, its volatility and the market at the time.

You own 100 shares bought at $40, or $4,000 in total. The company pays $1.60 a year in dividends, a 4% yield, in four quarterly payments of $0.40. Each quarter you sell a three-month call with a $42 strike, about 5% above the purchase price, for $0.60 a share.

### If the share price goes nowhere

The share ends the year at $40. Every call expires worthless.

| Income | Per share | For 100 shares |
|---|---|---|
| Dividends | $1.60 | $160 |
| Four call premiums | $2.40 | $240 |
| Total | $4.00 | $400 |

That is 10% on $4,000 instead of 4% from dividends alone. This is the case every covered call advert shows you.

### If the share price falls

The share drifts down to $34 over the year, 15% below where you bought it. The calls all expire worthless, so you keep every premium.

| | Shares only | With covered calls |
|---|---|---|
| Fall in share price | −$600 | −$600 |
| Dividends | +$160 | +$160 |
| Call premiums | | +$240 |
| Total | −$440 | −$200 |

The premiums soften the fall, but you are still down. A covered call is not protection, just a partial refund.

### If the share price rises sharply

The company has a good quarter and the share jumps to $50 within the first three months, then stays there. Your $42 call is exercised and your shares are sold.

| | Shares only | With covered calls |
|---|---|---|
| Gain on the shares | +$1,000 | +$200 (sold at $42) |
| Dividends | +$160 for the year | +$40 (one payment before the sale) |
| Call premiums | | +$60 |
| Total | +$1,160 | +$300 |

You have also lost the shares. To own them again you would have to buy back at $50, and the 4% yield you bought them for is now 3.2% on the new price.

Put the three outcomes side by side and the trade is clear: covered calls improve the flat and falling outcomes a little, and make the strongly rising outcome much worse. Whether that suits you depends on which of those outcomes you most need to protect against.

## The ex-dividend trap

There is one risk specific to dividend shares. Most US share options can be exercised at any time before expiration, not only on the last day. Normally that makes no sense for the buyer, but there is one exception: the day before a share goes ex-dividend.

If your call is in the money and the dividend is larger than the time value left in the option, the buyer can exercise early to collect the dividend. You then lose both the shares and the dividend you were holding them for, often with no warning beyond an assignment notice the next morning.

To reduce the risk, check the ex-dividend date before you sell a call, and be wary of strikes close to the current price on expiries that span it. If a call is deep in the money just before ex-dividend, assume it may be exercised and decide in advance whether you are happy with that.

## The bigger risk is doing too much

The most common mistake I saw among income-focused clients was being too active. They reacted to bad news even when their portfolio was delivering a stable, good yield. They switched in and out of holdings and traded far more than they needed to, instead of letting compounding do its work.

Covered calls make this easier, not harder. A monthly call on each holding means twelve decisions a year per share: which strike, which expiry, whether to buy it back when the share rises, whether to roll it, what to do after assignment. Each decision is a chance to react to the news of the week. An income portfolio that once needed a review a few times a year now needs attention every month.

If you do sell calls, decide the rules once and follow them:

- **Pick the holdings in advance.** Only the slow-growing, mature companies you would be content to sell at the strike.
- **Use a fixed approach to strikes and expiries,** for example roughly 5% above the current price, three months out, chosen on the same day each quarter.
- **Decide now what happens if you are assigned.** Either let the shares go and move on, or buy back only at a price you set beforehand. Do not chase.
- **Consider covering only part of a holding.** If you own 300 shares, selling one call leaves two-thirds of the position free to rise. Each call covers 100 shares, so this only works in multiples of 100.

## Shares to leave alone

I would not sell covered calls on smaller companies with high growth potential, the kind that are expanding fast. Their whole appeal is the chance of a large rise, and a covered call hands most of that rise to someone else for a few percent of income. If one of these turns out to be one of the rare holdings that multiplies in value, the call will have cost you far more than it ever paid. Morgan Housel makes the same point in [The Psychology of Money](/psychology/the-psychology-of-money-summary): a small number of big winners drive most long-term returns, and you cannot tell in advance which ones they will be.

The same caution applies to any share you would be upset to lose, shares where a sale would trigger a large tax bill, and companies about to report results or pay a special dividend.

## Who it suits

Covered calls on dividend shares fit best when you hold mature, steady companies, you would be genuinely content to sell them at the strike, and you need more income now more than you need the chance of a large gain later. They fit worst on fast-growing companies, on shares you plan to hold for decades, and for anyone who finds it hard to leave a portfolio alone.

Before you sell a call against a dividend holding, put the numbers into the [covered call calculator](/tools/covered-call-calculator) and look at the price above which simply holding the shares would have paid more. If the share could realistically pass that price, ask whether the premium is really worth it.
