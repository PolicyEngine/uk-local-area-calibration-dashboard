export const CATEGORY_ORDER = [
  "Demographics",
  "Income",
  "Housing & tenure",
  "Benefits",
] as const;

export type Category = (typeof CATEGORY_ORDER)[number];

export function varCategory(v: string): Category {
  if (v.startsWith("age/")) return "Demographics";
  if (v.startsWith("hmrc/") || v.startsWith("ons/net_income") || v === "ons/housing_costs")
    return "Income";
  if (v.startsWith("tenure/") || v.startsWith("rent/")) return "Housing & tenure";
  return "Benefits";
}

export function groupByCategory<T extends { variable: string }>(
  rows: T[],
): { category: Category; rows: T[] }[] {
  const groups: Partial<Record<Category, T[]>> = {};
  for (const r of rows) {
    const cat = varCategory(r.variable);
    (groups[cat] ??= []).push(r);
  }
  return CATEGORY_ORDER.filter((c) => groups[c]).map((c) => ({
    category: c,
    rows: groups[c]!,
  }));
}
