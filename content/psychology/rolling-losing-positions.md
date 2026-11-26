---
title: "Why traders roll losing positions for too long"
description: "Rolling a losing option feels like managing the trade. Often it is a way of not admitting it went wrong. How to tell the difference, with a worked example."
date: 2026-11-26
tool: /tools/cash-secured-put-calculator
---

A short option has gone against you. You can close it and take the loss, or you can roll it: buy it back and sell a new one further out in time, usually for a small credit. Rolling for a credit feels like being paid to wait for the trade to come good. Sometimes it is exactly that. Often it is a way of never having to admit the trade was wrong.

## What rolling actually does

Rolling is two trades presented as one. You close the losing position at a loss, then open a new position with a later expiry, and often a different strike. Brokers show the combined result as a single net credit or debit, which makes it feel like an adjustment to the original trade rather than a fresh decision.

That framing is the problem. The loss on the first leg is real, whether or not you see it as a separate line. The new position is a brand-new commitment, with its own risk, and it deserves to be judged as one.

## Why rolling is so tempting

- **The loss never becomes final.** Closing turns a paper loss into a realised one, and people find that painful. Behavioural finance calls the tendency to hold losers too long and sell winners too early the disposition effect, and rolling is one of its neatest disguises.
- **The credit is visible and the risk is not.** The screen shows the premium you collect on the roll. It does not show that you have extended your exposure to a position that is already going wrong, often for months.
- **It feels like skill.** Adjusting a position looks like active management. Doing the same thing again and again because the alternative hurts is not a plan.
- **It is activity in response to bad news.** The most common mistake I saw among clients in investment management was being too active, reacting to bad news even when doing nothing would have served them better. Rolling a loser can be the same reflex in a more sophisticated form.

## A worked roll

You sold a 30-day put on a $50 share with a $47.50 strike for $1.00. With five days left, the share has dropped to $42 and the put now costs $5.60 to buy back. All figures are per share; multiply by 100 for one contract.

**Option 1: close it.** You pay $5.60 to buy back a put you sold for $1.00. The loss is **$4.60 a share**, or $460, and it is over.

**Option 2: roll it.** You buy back the put for $5.60 and sell a 60-day put with a lower $45 strike for $6.00. The net credit is $0.40. Across both trades you have now collected $1.00 + $6.00 and paid $5.60, a net $1.40, and you are committed to buying the shares at $45 in two months.

What happens next depends entirely on the share:

| Share at the new expiry | Closed in week four | Rolled to $45 |
|---|---|---|
| $46 (recovers) | −$460 | +$140 |
| $42 (stays put) | −$460 | −$160 |
| $35 (keeps falling) | −$460 | −$860 |

Rolling is not automatically wrong. If the share steadies or recovers, the roll does better. But it has exchanged a known $460 loss for a range of outcomes that includes a much bigger one, and it has tied up $4,500 of cash for another two months. That is a fresh bet on the share, and it should be made only if you would make it from scratch.

## How to tell management from avoidance

Ignore the existing position and ask one question: **would I open the new position today, with fresh cash, at this strike and this expiry, on this share?**

If the answer is yes, the roll is a reasonable trade that happens to start where an old one ended. If the answer is no, the roll is about the old loss, not the new opportunity, and closing is the better decision even though it hurts more.

Three warning signs that you are rolling to avoid a loss:

- You are rolling to the same or a lower premium for more time, again and again.
- You can no longer explain why the share should recover, only that it might.
- You are choosing the new strike by whichever one gives a credit, not by the price you want to pay.

## Decide before the trade

The easiest time to make a rational decision about a losing position is before it exists. When you open a short option, write down:

- **The price at which you will close,** whatever a roll might offer.
- **How many times you will roll** before you stop. Many disciplined traders allow one roll, or none.
- **What would have to be true** about the company for you to stay in.

Then, when the trade goes against you, you are following a decision you made calmly rather than making one under pressure. Run the new trade through the [cash-secured put calculator](/tools/cash-secured-put-calculator) as if it were a fresh position, and look at the breakeven and maximum loss before you accept the credit. For more on why sensible plans fall apart at the moment of decision, read [The Psychology of Money](/psychology/the-psychology-of-money-summary).
