"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Metadata, LevelData, Level } from "@/lib/types";

export function useData() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Partial<Record<Level, LevelData>>>({});
  const [levelData, setLevelData] = useState<LevelData | null>(null);

  // Load metadata on mount
  useEffect(() => {
    fetch("/data/metadata.json")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setMetadata)
      .catch((e) => setError(e.message));
  }, []);

  // Load level data lazily
  const loadLevel = useCallback((level: Level) => {
    if (cache.current[level]) {
      setLevelData(cache.current[level]);
      return;
    }
    setLevelData(null);
    fetch(`/data/${level}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data: LevelData) => {
        cache.current[level] = data;
        setLevelData(data);
      })
      .catch((e) => setError(e.message));
  }, []);

  return { metadata, levelData, error, loadLevel };
}
