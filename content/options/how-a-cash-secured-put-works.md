---
title: "How a cash-secured put works, with every number shown"
description: "One trade followed from the day you sell the put to three different endings, and what it means to be paid to wait for a lower price."
date: 2026-11-26
tool: /tools/cash-secured-put-calculator
---

A cash-secured put is a way of getting paid while you wait to buy a share at a lower price. You sell a put option, which obliges you to buy 100 shares at a fixed price, the strike, if the share is below it at expiration. In return the buyer pays you a premium today. Cash-secured means you keep enough money in your account to buy those shares, so you are never forced to borrow if you have to buy them.

It is the mirror image of a [covered call](/options/how-a-covered-call-works). A covered call starts with shares and may end with cash. A cash-secured put starts with cash and may end with shares. Here is one trade worked through.

## The trade

A share trades at $50. You would be happy to own it, but you would rather pay less. You sell one put with a $47.50 strike that expires in 30 days, and receive $1.00 per share.

| Item | Per share | For 100 shares |
|---|---|---|
| Share price today | $50.00 | $5,000 |
| Strike, the price you agree to buy at | $47.50 | $4,750 |
| Premium received | $1.00 | $100 |
| Cash you must keep set aside | | $4,750 |

The $100 is yours whatever happens. If you do end up buying the shares, your real cost is the strike minus the premium: $46.50 a share. That is your breakeven, and it is 7% below today's price.

## Three ways it can end

### The shares finish above $47.50

Say they close at $56. Nobody will sell you shares at $47.50 when the market pays $56, so the put expires worthless. You keep the **$100**, which is 2.1% on the $4,750 you set aside, in 30 days. Your cash is free again.

But you never got the shares. Someone who bought 100 at $50 on day one made $600. This is the real cost of the strategy: in a strong rally you collect a small premium and watch the gain go to someone else.

### The shares finish exactly where they started

Say they close at $50. The put still expires worthless, because $50 is above the strike. You keep the **$100**, and someone who bought the shares at $50 has made nothing.

### The shares finish below $47.50

Say they close at $45. The put is exercised and you buy 100 shares at $47.50, even though they are worth $45. Allowing for the premium, you paid $46.50 a share for something worth $45, so you are down **$150**. Someone who bought at $50 on day one is down $500.

Below $46.50 you are losing money, and the losses keep growing as the price falls. At $40 you would be down **$650**. If you are assigned between $46.50 and $47.50, you buy the shares but still finish slightly ahead: at $47, you are up $50.

## What the three endings tell you

| Shares finish at | Cash-secured put | Bought 100 shares at $50 | Difference |
|---|---|---|---|
| $56.00 | +$100 | +$600 | −$500 |
| $50.00 | +$100 | $0 | +$100 |
| $45.00 | −$150 | −$500 | +$350 |
| $40.00 | −$650 | −$1,000 | +$350 |

Below the strike, the put stays ahead of buying the shares today by a fixed $350: the $2.50 difference between today's price and the strike, plus the $1.00 premium. Above $51, which is today's price plus the premium, buying the shares outright would have paid more.

Three things follow:

- **You are paid to name your price.** If you genuinely want the share and $46.50 is a price you would be glad to pay, the put either buys it for you at that price or pays you for waiting. That is very close to what Benjamin Graham meant by letting [Mr. Market](/psychology/the-intelligent-investor-summary) come to you.
- **Most of the downside is still yours.** The premium cushions the first $1.00 of a fall. A share that drops 30% still costs you nearly as much as if you had bought it outright, just from a lower starting point.
- **The upside is capped at the premium.** However far the shares rise, you make $100. If the share is one you really want to own, missing a rally is a real risk.

## Choosing the strike

The most common mistake is choosing the strike by how much premium it pays. Strikes closer to today's price pay more, because they are more likely to be assigned, and premiums are highest on shares that are falling fast, because the market expects more trouble.

Pick the strike the other way round. Decide what you think the share is worth, and what price would give you a comfortable margin below that, then sell the put at or under it. If the premium at that strike looks too small to bother with, that is useful information too: the market does not expect the share to fall that far.

## Keep the cash really set aside

The strategy is only as safe as the cash behind it. Selling puts without the cash to cover assignment, often on margin, turns a patient buying strategy into leveraged speculation. A sharp fall can then force you to buy shares you cannot afford, or to sell at the worst moment. Keep the full strike value in cash or in a money market fund your broker accepts as collateral. Many brokers pay interest on that cash, which the calculator leaves out but which adds to your return.

## If you are assigned

Being assigned is not a failure. It is the outcome you agreed to. You now own 100 shares at an effective $46.50, and you can hold them like any other investment. Many investors then sell a covered call against them, collecting a second premium while they wait to sell at a higher price. Running puts and calls one after the other like this is known as [the wheel](/options/the-wheel-strategy), and it works only if every share you might be assigned is one you would be happy to hold for years.

## Reading the annualised number

2.1% in 30 days works out to roughly 26% a year. That figure is useful for comparing a 30-day trade with a 45-day one. It is not what you should expect to earn, because it assumes the same premium is available twelve months in a row and that you are never assigned on a share that keeps falling.

## Before you place one

- Would you be glad to own this share at the breakeven price, and still glad if it kept falling afterwards?
- Is the full strike value set aside in cash, not borrowed?
- Have you chosen the strike for the price you want to pay, not for the premium?
- What will you do if you are assigned? Have the answer written down before you sell. Then put your numbers into the [cash-secured put calculator](/tools/cash-secured-put-calculator) and look at where the two lines cross.
