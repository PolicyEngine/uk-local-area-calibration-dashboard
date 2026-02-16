"use client";

import { useMemo, Fragment } from "react";
import type { SampleSizeRow } from "@/lib/types";
import { varCategory, groupByCategory } from "@/lib/categories";
import { fmt } from "@/lib/format";
import { useSortable } from "@/hooks/useSortable";
import { InfoTooltip } from "./InfoTooltip";
import { EssBadge } from "./Badge";
import { TableMessage } from "./TableMessage";

interface Props {
  rows: SampleSizeRow[];
  areaSearch: string;
  varSearch: string;
  category: string;
}

export function VariablesTable({ rows, areaSearch, varSearch, category }: Props) {
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
                  <InfoTooltip tip="FRS variable used in calibration." />
                </th>
                <th onClick={() => toggle("n_in_area")} style={{ textAlign: "right" }}>
                  Unweighted HHs{indicator("n_in_area")}{" "}
                  <InfoTooltip tip="Households assigned non-zero weight for this area by the optimiser (unweighted count)." />
                </th>
                <th onClick={() => toggle("n_nonzero_weight")} style={{ textAlign: "right" }}>
                  Donor pool{indicator("n_nonzero_weight")}{" "}
                  <InfoTooltip tip="Households with non-zero weight for this area AND non-zero value for this variable." />
                </th>
                <th onClick={() => toggle("weighted_total")} style={{ textAlign: "right" }}>
                  Wtd total{indicator("weighted_total")}{" "}
                  <InfoTooltip tip="Sum of calibration weights — estimated real households in this area." />
                </th>
                <th onClick={() => toggle("weighted_with_value")} style={{ textAlign: "right" }}>
                  Wtd with value{indicator("weighted_with_value")}{" "}
                  <InfoTooltip tip="Weighted count of households with a non-zero value for this variable." />
                </th>
                <th onClick={() => toggle("ess")} style={{ textAlign: "right" }}>
                  ESS{indicator("ess")}{" "}
                  <InfoTooltip tip="Effective sample size: ESS = (\u03A3w\u1D62)\u00B2 / \u03A3w\u1D62\u00B2. Measures how many FRS households meaningfully contribute after calibration. Green \u2265 100, yellow \u2265 30, red < 30." />
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <Fragment key={g.category}>
                  <tr className="group-header">
                    <td colSpan={7}>{g.category}</td>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={`${r.area_code}-${r.variable}`}>
                      <td>{r.area_name}</td>
                      <td className="mono">{r.variable}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.n_in_area)}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.n_nonzero_weight)}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.weighted_total)}</td>
                      <td style={{ textAlign: "right" }}>{fmt(r.weighted_with_value)}</td>
                      <td style={{ textAlign: "right" }}>
                        <EssBadge ess={r.ess} />
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
