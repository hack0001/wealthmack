"use client";

import { useId, useRef } from "react";
import {
  CoveredCallInput,
  SHARES_PER_CONTRACT,
  coveredCallProfit,
  stockProfit,
} from "@/lib/options";
import { money, money0, signedMoney0 } from "@/lib/format";

const W = 640;
const H = 340;
const M = { top: 28, right: 20, bottom: 40, left: 72 };

function niceTicks(min: number, max: number, count: number) {
  const span = max - min;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) {
    ticks.push(Math.round(v * 1e6) / 1e6);
  }
  return ticks;
}

export function chartRange(i: CoveredCallInput) {
  const breakeven = i.stockPrice - i.premium;
  const lo = Math.max(0, Math.min(i.stockPrice * 0.7, breakeven * 0.9));
  const hi = Math.max(i.stockPrice * 1.3, (i.strike + i.premium) * 1.1);
  return { lo, hi };
}

export default function PayoffChart({
  input,
  scrub,
  onScrub,
}: {
  input: CoveredCallInput;
  scrub: number;
  onScrub: (price: number) => void;
}) {
  const id = useId();
  const svg = useRef<SVGSVGElement>(null);
  const shares = input.contracts * SHARES_PER_CONTRACT;
  const { lo, hi } = chartRange(input);
  const breakeven = input.stockPrice - input.premium;

  const cc = (p: number) => coveredCallProfit(input, p) * shares;
  const st = (p: number) => stockProfit(input, p) * shares;

  const yMinRaw = Math.min(cc(lo), st(lo));
  const yMaxRaw = Math.max(cc(hi), st(hi));
  const pad = (yMaxRaw - yMinRaw) * 0.08;
  const yMin = yMinRaw - pad;
  const yMax = yMaxRaw + pad;

  const x = (p: number) =>
    M.left + ((p - lo) / (hi - lo)) * (W - M.left - M.right);
  const y = (v: number) =>
    M.top + (1 - (v - yMin) / (yMax - yMin)) * (H - M.top - M.bottom);

  const ccPath = `M${x(lo)},${y(cc(lo))} L${x(input.strike)},${y(cc(input.strike))} L${x(hi)},${y(cc(hi))}`;
  const ccArea = `${ccPath} L${x(hi)},${y(0)} L${x(lo)},${y(0)} Z`;
  const stPath = `M${x(lo)},${y(st(lo))} L${x(hi)},${y(st(hi))}`;

  const xTicks = niceTicks(lo, hi, 6);
  const yTicks = niceTicks(yMinRaw, yMaxRaw, 5);
  const s = Math.min(hi, Math.max(lo, scrub));

  function fromPointer(e: React.PointerEvent) {
    const box = svg.current!.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const t = (px - M.left) / (W - M.left - M.right);
    onScrub(lo + Math.min(1, Math.max(0, t)) * (hi - lo));
  }

  return (
    <svg
      ref={svg}
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Profit at expiration for the covered call compared with holding the shares. Breakeven ${money(breakeven)}, maximum profit ${money0(cc(input.strike))} at or above ${money(input.strike)}.`}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || e.buttons > 0) fromPointer(e);
      }}
    >
      <defs>
        <clipPath id={`${id}-up`}>
          <rect x={M.left} y={0} width={W} height={y(0)} />
        </clipPath>
        <clipPath id={`${id}-down`}>
          <rect x={M.left} y={y(0)} width={W} height={H} />
        </clipPath>
      </defs>

      {yTicks.map((t) => (
        <g key={t}>
          <line
            className={t === 0 ? "chart-zero" : "chart-grid"}
            x1={M.left}
            x2={W - M.right}
            y1={y(t)}
            y2={y(t)}
          />
          <text className="chart-tick" x={M.left - 8} y={y(t) + 4} textAnchor="end">
            {signedMoney0(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text
          key={t}
          className="chart-tick"
          x={x(t)}
          y={H - M.bottom + 18}
          textAnchor="middle"
        >
          {money0(t)}
        </text>
      ))}
      <text className="chart-axis" x={W - M.right} y={H - 4} textAnchor="end">
        Share price at expiration
      </text>

      <path className="chart-profit" d={ccArea} clipPath={`url(#${id}-up)`} />
      <path className="chart-loss" d={ccArea} clipPath={`url(#${id}-down)`} />

      <path className="chart-stock" d={stPath} />
      <path className="chart-line" d={ccPath} />

      <line
        className="chart-marker"
        x1={x(breakeven)}
        x2={x(breakeven)}
        y1={y(0) - 7}
        y2={y(0) + 7}
      />
      <text
        className="chart-label"
        x={x(breakeven)}
        y={y(0) + 21}
        textAnchor="middle"
      >
        Breakeven {money(breakeven)}
      </text>
      <text
        className="chart-label"
        x={x(input.strike)}
        y={y(cc(input.strike)) - 10}
        textAnchor={x(input.strike) > W * 0.7 ? "end" : "start"}
      >
        Strike {money(input.strike)}
      </text>
      <text
        className="chart-label chart-label-muted"
        x={x(hi) - 4}
        y={Math.max(M.top - 8, y(st(hi)) - 8)}
        textAnchor="end"
      >
        Shares only
      </text>

      <line className="chart-scrub" x1={x(s)} x2={x(s)} y1={M.top} y2={H - M.bottom} />
      <circle className="chart-dot-stock" cx={x(s)} cy={y(st(s))} r={4.5} />
      <circle className="chart-dot" cx={x(s)} cy={y(cc(s))} r={6} />
    </svg>
  );
}
