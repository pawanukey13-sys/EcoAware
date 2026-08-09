// src/pages/Dashboard/utils/tableUtils.js

import { filterSeries } from "../Dashboard/filterUtility";

// Picks the latest year present in a series, used when the year filter is "All"
function latestYear(series) {
  return Math.max(...series.map((p) => p.year));
}

// Builds rows shaped like: { country, "Air Quality": 156, "Forest": 9.8, ... }
export function buildComparisonRows(categories, { country, year }) {
  const countrySet = new Set();
  const perCategoryLookup = {};

  categories.forEach((cat) => {
    const metric = cat.metrics[0];
    const effectiveYear = year && year !== "All" ? year : latestYear(metric.series);
    const rows = filterSeries(metric.series, country, effectiveYear);

    perCategoryLookup[cat.name] = {};
    rows.forEach((r) => {
      perCategoryLookup[cat.name][r.country] = r.value;
      countrySet.add(r.country);
    });
  });

  return Array.from(countrySet)
    .sort()
    .map((c) => {
      const row = { country: c };
      categories.forEach((cat) => {
        row[cat.name] = perCategoryLookup[cat.name][c] ?? "—";
      });
      return row;
    });
}