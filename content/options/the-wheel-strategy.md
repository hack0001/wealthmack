---
title: "The wheel strategy explained, with a full cycle of numbers"
description: "Sell puts until you are assigned, sell calls until the shares are called away, repeat. How the wheel works, a worked two-month cycle, and the rules that stop it going wrong."
date: 2026-11-26
tool: /tools/cash-secured-put-calculator
---

The wheel is two option strategies run one after the other on the same share. You sell [cash-secured puts](/options/how-a-cash-secured-put-works) until you are assigned and own the shares, then sell [covered calls](/options/how-a-covered-call-works) against them until they are called away and you are back to cash. Then you start again. Each turn of the wheel collects premium at every step.

It is popular because it feels like a machine for producing income. It can be a sensible way to buy shares you want at lower prices and sell them at higher ones, but only if every share you put on the wheel is one you would be happy to own for years. The strategy has no answer to a share that falls and keeps falling.

## The cycle

1. **Start with cash.** Set aside enough to buy 100 shares at the strike you choose.
2. **Sell a cash-secured put** at a price you would be glad to pay. If the shares stay above the strike, keep the premium and sell another put.
3. **If you are assigned, you now own 100 shares.** Your real cost is the strike minus the premium you collected.
4. **Sell a covered call** at a strike above your cost. If the shares stay below the strike, keep the premium and sell another call.
5. **If the shares are called away, you are back to cash,** with both premiums and any gain on the shares. Go back to step 2.

## A full cycle, worked through

This continues the example from the cash-secured put article. Real premiums depend on the share and the market at the time.

### Month one: the put

A share trades at $50. You set aside $4,750 and sell a 30-day put with a $47.50 strike for $1.00 a share, collecting **$100**.

By expiration the share has fallen to $45. You are assigned and buy 100 shares at $47.50. Allowing for the premium, your real cost is $46.50 a share.

### Month two: the call

With the share at $45, you sell a 30-day call with a $47.50 strike for $0.80, collecting **$80**. The strike is above your $46.50 cost, so if the shares are called away you will not have locked in a loss.

Your adjusted cost is now $45.70 a share: $47.50 paid, less $1.00 and $0.80 of premium.

### Three ways month two can end

**The share recovers to $48.** The call is exercised and your shares are sold at $47.50, the same price you paid. Your profit is the two premiums: **$180**, or 3.8% on the $4,750 you set aside, over about two months. Someone who bought 100 shares at $50 on day one is down $200.

**The share falls to $40.** The call expires worthless and you still own the shares. At $40 they are worth $570 less than your adjusted cost of $45.70. Someone who bought at $50 is down $1,000. You are better off, but you are now holding a losing position, and the next call you sell faces an awkward choice (see below).

**The share never fell in the first place.** If it had rallied to $60 in month one, the put would have expired worthless. You would have made $100 while the buyer at $50 made $1,000, and you would have no shares to sell calls against. Your next move would be another put, at a higher strike.

| Outcome | The wheel | Bought 100 shares at $50 |
|---|---|---|
| Assigned, then called away at $48 | +$180 | −$200 |
| Assigned, share falls to $40 | −$570 | −$1,000 |
| Never assigned, share rallies to $60 | +$100 | +$1,000 |

The pattern is the same as for each strategy on its own. The wheel does well when a share drifts sideways or dips and recovers. It lags badly in a strong rally, and it only softens the blow in a steady decline.

## The awkward choice after a fall

When the share falls well below your cost, you have three options, and none is free:

- **Sell calls at or above your cost.** You protect yourself from locking in a loss, but strikes far above the market price pay very little, so the income almost stops.
- **Sell calls closer to the market price.** You collect more premium, but if the share rebounds you may be forced to sell below your cost and turn a paper loss into a real one.
- **Stop selling calls and simply hold.** If you still believe in the company, owning it outright gives you the full recovery if it comes.

This is the point where the wheel stops being a mechanical income strategy and becomes an ordinary investment decision. The only good answer is the one you would give about any holding: is this business worth owning at today's price? If you would not buy it now with fresh money, the premiums will not rescue it.

## Rules that keep the wheel turning

- **Only wheel shares you want to own.** Pick mature, financially strong companies you would hold through a bad year. A dividend helps while you wait. See [covered calls on dividend shares](/options/covered-calls-on-dividend-shares) for which kinds of share suit the call side.
- **Never let the put premium choose the share.** The highest premiums are on the most volatile shares, which are also the most likely to keep falling after you are assigned.
- **Keep the cash really set aside.** Each wheel needs the full strike value in cash: $4,750 in this example. Running wheels on borrowed money turns a patient strategy into a leveraged one.
- **Size it like any other holding.** One wheel on a $50 share commits roughly $5,000 to a single company. Spread across several shares and sectors, as you would with an ordinary portfolio.
- **Sell calls above your cost by default,** and decide in advance what you will do if the share falls well below it.
- **Keep the schedule boring.** Same type of strike, same length of expiry, chosen on the same day each month. The wheel's main danger is not the market but the temptation to tinker with it every week.

## Doing the numbers yourself

Each step of the wheel is one of the two trades the calculators already handle. Use the [cash-secured put calculator](/tools/cash-secured-put-calculator) for the put, including your real purchase price if assigned, and the [covered call calculator](/tools/covered-call-calculator) for the call, entering your adjusted cost as the share price. Annualised returns from either are best used to compare trades, not as a forecast of what a year of wheeling will pay.
