export interface SampleSizeRow {
  level: string;
  area_code: string;
  area_name: string;
  variable: string;
  n_total: number;
  n_in_area: number;
  n_with_value: number;
  n_nonzero_weight: number;
  weighted_total: number;
  weighted_with_value: number;
  ess: number;
}

export interface ErrorRow {
  level: string;
  area_code: string;
  area_name: string;
  variable: string;
  target: number;
  estimate: number;
  error: number;
  pct_error: number;
}

export interface SparsityByVariable {
  level: string;
  variable: string;
  n_areas: number;
  n_with_target: number;
  n_missing: number;
  n_zero: number;
  pct_coverage: number;
}

export interface SparsityByArea {
  level: string;
  code: string;
  name: string;
  country: string;
  n_variables: number;
  n_with_target: number;
  n_missing: number;
  n_zero: number;
  pct_coverage: number;
}

export interface Metadata {
  sparsity_by_variable: SparsityByVariable[];
  sparsity_by_area: SparsityByArea[];
  areas_per_country: { level: string; country: string; n_areas: number }[];
  sample_size_context: Record<string, unknown>[];
  targets: { level: string; code: string; name: string; country: string; [key: string]: unknown }[];
}

export interface LevelData {
  sample_sizes: SampleSizeRow[];
  errors: ErrorRow[];
}

export type Level = "constituency" | "local_authority" | "country";
export type Tab = "variables" | "targets";
