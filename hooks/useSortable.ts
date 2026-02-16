"use client";

import { useState, useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSortable<T extends Record<string, any>>(
  data: T[],
  defaultKey: keyof T & string,
  defaultAsc = true,
) {
  const [sortKey, setSortKey] = useState<string>(defaultKey);
  const [asc, setAsc] = useState(defaultAsc);

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "string" && typeof vb === "string")
        return asc ? va.localeCompare(vb) : vb.localeCompare(va);
      return asc ? Number(va) - Number(vb) : Number(vb) - Number(va);
    });
    return copy;
  }, [data, sortKey, asc]);

  const toggle = (key: string) => {
    if (key === sortKey) {
      setAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setAsc(key === "area_name" || key === "variable" || key === "name");
    }
  };

  const indicator = (key: string) => (key === sortKey ? (asc ? " \u25B2" : " \u25BC") : "");

  return { sorted, toggle, indicator };
}
