"use client";

import { useState } from "react";
import {
  CoveredCallInput,
  SHARES_PER_CONTRACT,
  coveredCall,
  coveredCallProfit,
  crossover,
  isValid,
  stockProfit,
} from "@/lib/options";
import { money, money0, pct, signedMoney0 } from "@/lib/format";
import PayoffChart from "./PayoffChart";

const fields = [
  { key: "stockPrice", label: "Share price", hint: "What you paid, or today's price", step: "0.01", prefix: "$" },
  { key: "strike", label: "Call strike", hint: "The price you agree to sell at", step: "0.5", prefix: "$" },
  { key: "premium", label: "Premium", hint: "Per share, as quoted", step: "0.01", prefix: "$" },
  { key: "days", label: "Days to expiration", hint: "", step: "1", prefix: "" },
  { key: "contracts", label: "Contracts", hint: "100 shares each", step: "1", prefix: "" },
] as const;

type Key = (typeof fields)[number]["key"];

const defaults: Record<Key, string> = {
  stockPrice: "50",
  strike: "52.5",
  premium: "1.20",
  days: "30",
  contracts: "1",
};

export default function CoveredCallCalculator({ compact = false }: { compact?: boolean }) {
  const [raw, setRaw] = useState(defaults);
  const [scrub, setScrub] = useState<number | null>(null);

  const input: CoveredCallInput = {
    stockPrice: parseFloat(raw.stockPrice),
    strike: parseFloat(raw.strike),
    premium: parseFloat(raw.premium),
    days: Math.round(parseFloat(raw.days)),
    contracts: Math.round(parseFloat(raw.contracts)),
  };
  const ok = isValid(input);
  const shown = compact ? fields.slice(0, 3) : fields;

  const form = (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      {shown.map((f) => (
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
          {!compact && f.hint && <span className="field-hint">{f.hint}</span>}
        </label>
      ))}
    </form>
  );

  if (!ok) {
    return (
      <div className={compact ? "calc calc-compact" : "calc"}>
        {form}
        <p className="calc-error" role="alert">
          {input.premium >= input.stockPrice
            ? "The premium has to be lower than the share price. Premiums are quoted per share, so a $120 contract is entered as 1.20."
            : "Enter a share price, strike and premium above zero, with at least 1 day and 1 contract."}
        </p>
      </div>
    );
  }

  const r = coveredCall(input);
  const breakeven = input.stockPrice - input.premium;
  const lo = Math.max(0, Math.min(input.stockPrice * 0.7, breakeven * 0.9));
  const hi = Math.max(input.stockPrice * 1.3, (input.strike + input.premium) * 1.1);
  const at = scrub ?? input.strike;
  const ccAt = coveredCallProfit(input, at) * r.shares;
  const stAt = stockProfit(input, at) * r.shares;
  const diff = ccAt - stAt;

  return (
    <div className={compact ? "calc calc-compact" : "calc"}>
      {form}

      <div className="calc-chart">
        <PayoffChart
          lo={lo}
          hi={hi}
          strike={input.strike}
          breakeven={breakeven}
          profit={(p) => coveredCallProfit(input, p) * r.shares}
          compare={(p) => stockProfit(input, p) * r.shares}
          compareLabel="Shares only"
          ariaLabel={`Profit at expiration for the covered call compared with holding the shares. Breakeven ${money(breakeven)}, maximum profit ${money0(r.maxProfit)} at or above ${money(input.strike)}.`}
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
          Covered call{" "}
          <strong className={ccAt >= 0 ? "up" : "down"}>
            {ccAt >= 0 ? "makes" : "loses"} {money0(Math.abs(ccAt))}
          </strong>
          . Shares alone {stAt >= 0 ? "make" : "lose"} {money0(Math.abs(stAt))}.{" "}
          {Math.abs(diff) < 0.5
            ? "No difference."
            : diff > 0
              ? `The call leaves you ${money0(diff)} better off.`
              : `The call costs you ${money0(-diff)} of upside.`}
        </p>
      </div>

      <dl className="results">
        <div>
          <dt>Most you can make</dt>
          <dd>{signedMoney0(r.maxProfit)}</dd>
          <dd className="sub">if shares finish at or above {money(input.strike)}</dd>
        </div>
        <div>
          <dt>Breakeven</dt>
          <dd>{money(r.breakeven)}</dd>
          <dd className="sub">{pct(r.downsideCushion)} below the share price</dd>
        </div>
        <div>
          <dt>Return if called away</dt>
          <dd>{pct(r.returnIfCalled, 2)}</dd>
          <dd className="sub">
            in {input.days} days, {pct(r.annualisedIfCalled)} annualised
          </dd>
        </div>
        {!compact && (
          <>
            <div>
              <dt>Return if price is unchanged</dt>
              <dd>{pct(r.returnIfUnchanged, 2)}</dd>
              <dd className="sub">{pct(r.annualisedIfUnchanged)} annualised</dd>
            </div>
            <div>
              <dt>Premium collected</dt>
              <dd>{money0(r.premiumIncome)}</dd>
              <dd className="sub">
                on {r.shares} shares, {money0(r.netCost)} net outlay
              </dd>
            </div>
            <div>
              <dt>Most you can lose</dt>
              <dd>{money0(r.maxLoss)}</dd>
              <dd className="sub">if the shares go to zero</dd>
            </div>
          </>
        )}
      </dl>

      {!compact && (
        <p className="calc-summary">
          You collect {money0(r.premiumIncome)} today and keep it whatever
          happens. Above {money(input.strike)} your shares are sold at the
          strike and your profit stops at {money0(r.maxProfit)}. Below{" "}
          {money(r.breakeven)} you are losing money, just{" "}
          {money0(r.premiumIncome)} less than you would have without the call.
          If the shares finish above {money(crossover(input))}, you would have
          made more by simply holding them. Figures ignore commissions, taxes
          and dividends, and annualised returns assume the same trade could be
          repeated all year. One contract covers {SHARES_PER_CONTRACT} shares.
        </p>
      )}
    </div>
  );
}
