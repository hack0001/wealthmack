"use client";

import { useState } from "react";
import {
  CashSecuredPutInput,
  SHARES_PER_CONTRACT,
  buyNowProfit,
  cashSecuredPut,
  cashSecuredPutProfit,
  isValidPut,
  putCrossover,
} from "@/lib/options";
import { money, money0, pct, signedMoney0 } from "@/lib/format";
import PayoffChart from "./PayoffChart";

const fields = [
  { key: "stockPrice", label: "Share price today", hint: "Used to compare with buying now", step: "0.01", prefix: "$" },
  { key: "strike", label: "Put strike", hint: "The price you agree to buy at", step: "0.5", prefix: "$" },
  { key: "premium", label: "Premium", hint: "Per share, as quoted", step: "0.01", prefix: "$" },
  { key: "days", label: "Days to expiration", hint: "", step: "1", prefix: "" },
  { key: "contracts", label: "Contracts", hint: "100 shares each", step: "1", prefix: "" },
] as const;

type Key = (typeof fields)[number]["key"];

const defaults: Record<Key, string> = {
  stockPrice: "50",
  strike: "47.5",
  premium: "1.00",
  days: "30",
  contracts: "1",
};

export default function CashSecuredPutCalculator() {
  const [raw, setRaw] = useState(defaults);
  const [scrub, setScrub] = useState<number | null>(null);

  const input: CashSecuredPutInput = {
    stockPrice: parseFloat(raw.stockPrice),
    strike: parseFloat(raw.strike),
    premium: parseFloat(raw.premium),
    days: Math.round(parseFloat(raw.days)),
    contracts: Math.round(parseFloat(raw.contracts)),
  };
  const ok = isValidPut(input);

  const form = (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      {fields.map((f) => (
        <label key={f.key} className="field">
          <span className="field-label">{f.label}</span>
          <span className="field-input">
            {f.prefix && <span aria-hidden="true">{f.prefix}</span>}
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step={f.step}
              value={raw[f.key]}
              onChange={(e) => {
                setRaw({ ...raw, [f.key]: e.target.value });
                setScrub(null);
              }}
            />
          </span>
          {f.hint && <span className="field-hint">{f.hint}</span>}
        </label>
      ))}
    </form>
  );

  if (!ok) {
    return (
      <div className="calc">
        {form}
        <p className="calc-error" role="alert">
          {input.premium >= input.strike
            ? "The premium has to be lower than the strike. Premiums are quoted per share, so a $100 contract is entered as 1.00."
            : "Enter a share price, strike and premium above zero, with at least 1 day and 1 contract."}
        </p>
      </div>
    );
  }

  const r = cashSecuredPut(input);
  const lo = Math.max(0, Math.min(input.stockPrice, r.breakeven) * 0.7);
  const hi = Math.max(input.stockPrice * 1.25, putCrossover(input) * 1.1);
  const at = scrub ?? input.stockPrice;
  const putAt = cashSecuredPutProfit(input, at) * r.shares;
  const buyAt = buyNowProfit(input, at) * r.shares;
  const diff = putAt - buyAt;
  const assigned = at < input.strike;

  return (
    <div className="calc">
      {form}

      <div className="calc-chart">
        <PayoffChart
          lo={lo}
          hi={hi}
          strike={input.strike}
          breakeven={r.breakeven}
          profit={(p) => cashSecuredPutProfit(input, p) * r.shares}
          compare={(p) => buyNowProfit(input, p) * r.shares}
          compareLabel="Buy shares today"
          ariaLabel={`Profit at expiration for the cash-secured put compared with buying the shares today. Breakeven ${money(r.breakeven)}, maximum profit ${money0(r.maxProfit)} at or above ${money(input.strike)}.`}
          scrub={at}
          onScrub={setScrub}
        />
        <label className="scrub">
          <span className="scrub-label">
            If the shares finish at <strong>{money(at)}</strong>
          </span>
          <input
            type="range"
            min={lo}
            max={hi}
            step={(hi - lo) / 400}
            value={at}
            onChange={(e) => setScrub(parseFloat(e.target.value))}
          />
        </label>
        <p className="scrub-readout" aria-live="polite">
          {assigned
            ? `You buy ${r.shares} shares at ${money(input.strike)}. `
            : "The put expires and you keep the premium. "}
          Put{" "}
          <strong className={putAt >= 0 ? "up" : "down"}>
            {putAt >= 0 ? "makes" : "loses"} {money0(Math.abs(putAt))}
          </strong>
          . Buying today {buyAt >= 0 ? "makes" : "loses"} {money0(Math.abs(buyAt))}.{" "}
          {Math.abs(diff) < 0.5
            ? "No difference."
            : diff > 0
              ? `The put leaves you ${money0(diff)} better off.`
              : `Buying today would have made ${money0(-diff)} more.`}
        </p>
      </div>

      <dl className="results">
        <div>
          <dt>Premium you keep</dt>
          <dd>{signedMoney0(r.maxProfit)}</dd>
          <dd className="sub">the most you can make</dd>
        </div>
        <div>
          <dt>Return on cash set aside</dt>
          <dd>{pct(r.returnOnCash, 2)}</dd>
          <dd className="sub">
            in {input.days} days, {pct(r.annualisedReturn)} annualised
          </dd>
        </div>
        <div>
          <dt>Breakeven</dt>
          <dd>{money(r.breakeven)}</dd>
          <dd className="sub">
            your real cost per share if assigned
            {r.discountIfAssigned > 0 && `, ${pct(r.discountIfAssigned)} below today`}
          </dd>
        </div>
        <div>
          <dt>Cash to set aside</dt>
          <dd>{money0(r.cashRequired)}</dd>
          <dd className="sub">
            {r.shares} shares at {money(input.strike)}
          </dd>
        </div>
        <div>
          <dt>Most you can lose</dt>
          <dd>{money0(r.maxLoss)}</dd>
          <dd className="sub">if you are assigned and the shares go to zero</dd>
        </div>
      </dl>

      <p className="calc-summary">
        You collect {money0(r.premiumIncome)} today and keep it whatever
        happens. If the shares finish at or above {money(input.strike)}, the
        put expires and that is your whole return. Below{" "}
        {money(input.strike)} you must buy {r.shares} shares at the strike, so
        your real cost is {money(r.breakeven)} a share and you lose money
        below that. If the shares finish above {money(putCrossover(input))},
        buying them today would have paid more. Figures ignore commissions,
        taxes, early assignment and any interest your cash earns while it is
        set aside. One contract covers {SHARES_PER_CONTRACT} shares.
      </p>
    </div>
  );
}
