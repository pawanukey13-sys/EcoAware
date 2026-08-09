// src/pages/Dashboard/data/index.js

import airQuality from "./Airquality";
import forest from "./Forest";
import water from "./water";
import climate from "./Climate";
export const categories = [airQuality, forest, water, climate];

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