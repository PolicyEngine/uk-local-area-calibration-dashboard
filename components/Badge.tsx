import { fmt } from "@/lib/format";

export function EssBadge({ ess }: { ess: number | null }) {
  if (ess == null) return <>{"\u2013"}</>;
  const cls = ess >= 100 ? "green" : ess >= 30 ? "yellow" : "red";
  return <span className={`badge ${cls}`}>{fmt(ess)}</span>;
}

export function PctBadge({ pct }: { pct: number | null }) {
  if (pct == null) return <>{"\u2013"}</>;
  const abs = Math.abs(pct);
  const cls = abs <= 10 ? "green" : abs <= 30 ? "yellow" : "red";
  const sign = pct >= 0 ? "+" : "";
  return (
    <span className={`badge ${cls}`}>
      {sign}
      {pct.toFixed(1)}%
    </span>
  );
}
