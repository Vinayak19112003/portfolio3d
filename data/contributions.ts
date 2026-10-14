export type Contribution = {
  id: string;
  project: string;
  repository: string;
  number: number;
  title: string;
  summary: string;
  area: string;
  mergedAt: string;
  url: string;
};

// Curated upstream merges, verified through GitHub on 14 October 2026.
// Own repositories and financial/trading project showcases are excluded.
export const contributions: Contribution[] = [
  {
    id: "nodesecure-pbkdf2",
    project: "NodeSecure / js-x-ray",
    repository: "NodeSecure/js-x-ray",
    number: 720,
    title: "Spot weak password-hashing parameters.",
    summary: "Added a static-analysis probe for weak PBKDF2 iteration counts and hardcoded salts, with regression tests and warning documentation.",
    area: "JavaScript security",
    mergedAt: "2026-09-22",
    url: "https://github.com/NodeSecure/js-x-ray/pull/720",
  },
  {
    id: "pylint-positional",
    project: "Pylint",
    repository: "pylint-dev/pylint",
    number: 11573,
    title: "Make method-signature warnings accurate.",
    summary: "Fixed false arguments-differ warnings for positional-only parameters and corrected parameter counts, backed by regression cases.",
    area: "Python developer tools",
    mergedAt: "2026-10-11",
    url: "https://github.com/pylint-dev/pylint/pull/11573",
  },
  {
    id: "pdm-interrupt",
    project: "PDM",
    repository: "pdm-project/pdm",
    number: 3898,
    title: "Let Ctrl+C stop an installation cleanly.",
    summary: "Made install interruptions responsive, cancelled queued work, and replaced raw tracebacks with a clean interrupted-command exit.",
    area: "Python package tooling",
    mergedAt: "2026-10-07",
    url: "https://github.com/pdm-project/pdm/pull/3898",
  },
  {
    id: "narwhals-duckdb",
    project: "Narwhals",
    repository: "narwhals-dev/narwhals",
    number: 3998,
    title: "Keep DuckDB operations on the right connection.",
    summary: "Fixed diagonal concatenation of DuckDB relations on a custom connection by keeping the operation within the relational API.",
    area: "Dataframe interoperability",
    mergedAt: "2026-09-29",
    url: "https://github.com/narwhals-dev/narwhals/pull/3998",
  },
  {
    id: "river-anomaly",
    project: "River",
    repository: "online-ml/river",
    number: 2017,
    title: "Catch constant-score anomaly detectors.",
    summary: "Tightened the ROC AUC check so a constant-score detector fails validation, with tests for both ineffective and valid rankings.",
    area: "Machine-learning validation",
    mergedAt: "2026-09-27",
    url: "https://github.com/online-ml/river/pull/2017",
  },
  {
    id: "pylint-private-import",
    project: "Pylint",
    repository: "pylint-dev/pylint",
    number: 11481,
    title: "Fix a crash in private-import analysis.",
    summary: "Corrected AST traversal in the import-private-name extension so unusual attribute expressions are linted without crashing.",
    area: "Python static analysis",
    mergedAt: "2026-09-29",
    url: "https://github.com/pylint-dev/pylint/pull/11481",
  },
  {
    id: "spoonos-skill",
    project: "SpoonOS",
    repository: "XSpoonAi/spoon-awesome-skill",
    number: 22,
    title: "Contribute an AI agent skill showcase.",
    summary: "Submitted an agent skill centred on risk checks, simulation, and explainable execution plans to the community showcase repository.",
    area: "AI agent community",
    mergedAt: "2026-03-30",
    url: "https://github.com/XSpoonAi/spoon-awesome-skill/pull/22",
  },
];

export const contributionProjects = new Set(contributions.map(item => item.repository)).size;
export const spoonPosts = [
  { label: "SpoonOS post 01", url: "https://x.com/SpoonOS_ai/status/2022205989878112606" },
  { label: "SpoonOS post 02", url: "https://x.com/SpoonOS_ai/status/2032377323425865788" },
];
export const spoonFeatureSource = "https://www.linkedin.com/company/spoonos";
