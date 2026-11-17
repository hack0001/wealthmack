---
title: "How a covered call works, with every number shown"
description: "One trade followed from the day you sell the call to three different endings at expiration."
date: 2026-11-11
tool: /tools/covered-call-calculator
---

A covered call is two things held together: 100 shares you own, and one call option you sell against them. The buyer of that call pays you a premium today. In exchange you agree to sell your shares at a fixed price, the strike, if they are trading above it at expiration.

You are swapping some of your possible upside for cash now. Whether that is a good swap depends entirely on the numbers, so here is one trade worked through.

## The trade

You own 100 shares bought at $50. You sell one call with a $52.50 strike that expires in 30 days, and receive $1.20 per share.

| | Per share | For 100 shares |
|---|---|---|
| Shares bought at | $50.00 | $5,000 |
| Premium received | $1.20 | $120 |
| Net outlay | $48.80 | $4,880 |

The $120 is yours whatever happens next. It lowers the price at which you start losing money from $50.00 to $48.80. That is your breakeven.

## Three ways it can end

### The shares finish above $52.50

Say they close at $56. The call is exercised and your shares are sold at $52.50, not $56.

You make $2.50 per share on the shares plus the $1.20 premium: $3.70 per share, or **$370**. That is 7.6% on your $4,880 in 30 days, and it is the most this trade can ever make. Someone who simply held the shares made $600.

### The shares finish between $48.80 and $52.50

Say they close exactly where they started, at $50. The call expires worthless, you keep your shares and the premium, and you are **$120** ahead: 2.5% in 30 days. The shareholder without the call made nothing.

### The shares finish below $48.80

Say they close at $44. The call expires worthless and you keep the $120, but your shares are down $600. You have lost **$480**. The shareholder without the call lost $600.

## What the three endings tell you

| Shares finish at | Covered call | Shares only | Difference |
|---|---|---|---|
| $56.00 | +$370 | +$600 | −$230 |
| $50.00 | +$120 | $0 | +$120 |
| $44.00 | −$480 | −$600 | +$120 |

The covered call is ahead by exactly the premium everywhere below the strike. Above the strike the gap closes, and past $53.70 (the strike plus the premium) holding the shares alone would have paid more.

Two things follow that are easy to miss when the strategy is described as "income":

- **The downside is almost all still there.** A $1.20 premium on a $50 share is a 2.4% cushion. If the shares fall 20%, you lose 17.6%.
- **The upside is capped but the downside is not.** You keep the small wins and the large losses, and hand the large wins to someone else. That is the price of the premium.

## Reading the annualised number

7.6% in 30 days works out to about 92% a year, and 2.5% in 30 days to about 30%. Those figures are useful for comparing a 30-day trade with a 45-day one. They are not what you should expect to earn, because they assume the same trade is available on the same terms twelve times in a row and that the shares never fall through your breakeven.

## Before you place one

- Would you be content to sell the shares at the strike? If not, the strike is too low.
- Would you still want to own the shares 15% lower? The call does very little to protect you there.
- Is the premium worth the upside you are giving away? Put your own numbers in the calculator and look at where the two lines cross.
