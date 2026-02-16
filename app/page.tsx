"use client";

import { useState, useEffect, useMemo } from "react";
import type { Level, Tab } from "@/lib/types";
import { useData } from "@/hooks/useData";
import { Filters } from "@/components/Filters";
import { VariablesTable } from "@/components/VariablesTable";
import { TargetsTable } from "@/components/TargetsTable";

export default function Page() {
  const { metadata, levelData, error, loadLevel } = useData();
  const [tab, setTab] = useState<Tab>("variables");
  const [level, setLevel] = useState<Level>("constituency");
  const [category, setCategory] = useState("all");
  const [areaSearch, setAreaSearch] = useState("");
  const [varSearch, setVarSearch] = useState("");

  // Load level data when level changes
  useEffect(() => {
    loadLevel(level);
  }, [level, loadLevel]);

  // Derive area names from the loaded level data
  const areaNames = useMemo(() => {
    if (!levelData) return [];
    const src = levelData.sample_sizes.length ? levelData.sample_sizes : levelData.errors;
    const names = [...new Set(src.map((r) => r.area_name))];
    return names.sort();
  }, [levelData]);

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>Failed to load data: {error}</p>
        </div>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className="container">
        <div className="loading">Loading diagnostics\u2026</div>
      </div>
    );
  }

  const needsArea = !areaSearch && level !== "country";
  const sampleSizes = levelData?.sample_sizes ?? [];
  const errors = levelData?.errors ?? [];

  return (
    <div className="container">
      <Filters
        tab={tab}
        setTab={setTab}
        level={level}
        setLevel={setLevel}
        category={category}
        setCategory={setCategory}
        areaSearch={areaSearch}
        setAreaSearch={setAreaSearch}
        varSearch={varSearch}
        setVarSearch={setVarSearch}
        areaNames={areaNames}
      />

      {!levelData ? (
        <div className="loading">Loading\u2026</div>
      ) : needsArea ? (
        <div className="hint">Select an area above to view results.</div>
      ) : tab === "variables" ? (
        <VariablesTable
          rows={sampleSizes}
          areaSearch={areaSearch}
          varSearch={varSearch}
          category={category}
        />
      ) : (
        <TargetsTable
          rows={errors}
          areaSearch={areaSearch}
          varSearch={varSearch}
          category={category}
        />
      )}
    </div>
  );
}
