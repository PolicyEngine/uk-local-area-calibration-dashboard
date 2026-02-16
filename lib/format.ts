export function fmt(v: number | null | undefined): string {
  if (v == null) return "\u2013";
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 });
}
