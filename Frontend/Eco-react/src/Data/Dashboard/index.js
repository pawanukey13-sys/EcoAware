// src/pages/Dashboard/data/index.js

import airQuality from "./airQuality";
import forest from "./forest";
import plastic from "./water";
import climate from "./climate";
export const categories = [airQuality, forest, plastic, climate];

export const allCountries = [
  ...new Set(
    categories.flatMap((c) => c.metrics.flatMap((m) => m.series.map((s) => s.country)))
  ),
].sort();

export const allYears = [
  ...new Set(
    categories.flatMap((c) => c.metrics.flatMap((m) => m.series.map((s) => s.year)))
  ),
].sort((a, b) => a - b);