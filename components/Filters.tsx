"use client";

import type { Level, Tab } from "@/lib/types";
import { CATEGORY_ORDER, type Category } from "@/lib/categories";

interface Props {
  tab: Tab;
  setTab: (t: Tab) => void;
  level: Level;
  setLevel: (l: Level) => void;
  category: string;
  setCategory: (c: string) => void;
  areaSearch: string;
  setAreaSearch: (s: string) => void;
  varSearch: string;
  setVarSearch: (s: string) => void;
  areaNames: string[];
}

export function Filters({
  tab,
  setTab,
  level,
  setLevel,
  category,
  setCategory,
  areaSearch,
  setAreaSearch,
  varSearch,
  setVarSearch,
  areaNames,
}: Props) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>View</label>
        <div className="tabs">
          <button
            className={`tab ${tab === "variables" ? "active" : ""}`}
            onClick={() => setTab("variables")}
          >
            Sample size
          </button>
          <button
            className={`tab ${tab === "targets" ? "active" : ""}`}
            onClick={() => setTab("targets")}
          >
            Target error
          </button>
        </div>
      </div>
      <div className="filter-group">
        <label>Geographic level</label>
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value as Level);
            setAreaSearch("");
          }}
        >
          <option value="constituency">Constituency</option>
          <option value="local_authority">Local authority</option>
          <option value="country">Country</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORY_ORDER.map((c: Category) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group grow">
        <label>Area</label>
        <select value={areaSearch} onChange={(e) => setAreaSearch(e.target.value)}>
          <option value="">
            {level === "country" ? "All countries" : "Select an area"}
          </option>
          {areaNames.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group grow">
        <label>Variable</label>
        <input
          className="search"
          placeholder="e.g. age, employment, tenure\u2026"
          value={varSearch}
          onChange={(e) => setVarSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
