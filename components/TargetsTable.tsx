"use client";

import { useMemo, Fragment } from "react";
import type { ErrorRow } from "@/lib/types";
import { varCategory, groupByCategory } from "@/lib/categories";
import { fmt } from "@/lib/format";
import { useSortable } from "@/hooks/useSortable";
import { InfoTooltip } from "./InfoTooltip";
import { PctBadge } from "./Badge";
import { TableMessage } from "./TableMessage";

interface Props {
  rows: ErrorRow[];
  areaSearch: string;
  varSearch: string;
  category: string;
}

export function TargetsTable({ rows, areaSearch, varSearch, category }: Props) {
  const filtered = useMemo(() => {
    let out = rows;
    if (category !== "all") out = out.filter((r) => varCategory(r.variable) === category);
    if (areaSearch) out = out.filter((r) => r.area_name === areaSearch);
    if (varSearch)
      out = out.filter((r) => r.variable.toLowerCase().includes(varSearch.toLowerCase()));
    return out;
  }, [rows, category, areaSearch, varSearch]);

  const { sorted, toggle, indicator } = useSortable(filtered, "area_name");
  const groups = useMemo(() => groupByCategory(sorted), [sorted]);

  return (
    <TableMessage count={filtered.length} limit={5000}>
      <div className="card">
        <div className="scroll-table">
          <table>
            <thead>
              <tr>
                <th onClick={() => toggle("area_name")}>
                  Area{indicator("area_name")}{" "}
                  <InfoTooltip tip="Local area name (constituency or local authority)." />
                </th>
                <th onClick={() => toggle("variable")}>
                  Variable{indicator("variable")}{" "}
                  <InfoTooltip tip="Calibration target variable." />
                </th>
                <th onClick={() => toggle("target")} style={{ textAlign: "right" }}>
                  Target{indicator("target")}{" "}
                  <InfoTooltip tip="External benchmark the calibration tries to match (e.g. ONS population, HMRC income total)." />
                </th>
                <th onClick={() => toggle("estimate")} style={{ textAlign: "right" }}>
                  Estimate{indicator("estimate")}{" "}
                  <InfoTooltip tip="Weighted sum from the calibrated FRS: weights \u00d7 household values." />
                </th>
                <th onClick={() => toggle("pct_error")} style={{ textAlign: "right" }}>
                  Error %{indicator("pct_error")}{" "}
                  <InfoTooltip tip="(Estimate \u2212 target) / target. Green: within 10%. Yellow: within 30%. Red: over 30%." />
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <Fragment key={g.category}>
                  <tr className="group-header">
                    <td colSpan={5}>{g.category}</td>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={`${r.area_code}-${r.variable}`}>
                      <td>{r.area_name}</td>
                      <td className="mono">{r.variable}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.target)}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.estimate)}</td>
                      <td style={{ textAlign: "right" }}>
                        <PctBadge pct={r.pct_error} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TableMessage>
  );
}
