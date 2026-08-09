export function filterSeries(series, country, year) {
  // Country selected
  if (country !== "All") {
    return series.filter(item => item.country === country);
  }
  // Year selected
  if (year !== "All") {
    return series.filter(item => item.year === Number(year));
  }
  // Default view -> latest year only
  const latestYear = Math.max(...series.map(item => item.year));
  return series.filter(item => item.year === latestYear);
}
// Decide the most useful x-axis key given current filters:
// - a specific country selected -> show its trend over years
// - "All" countries -> compare countries at a point in time
export function resolveAxisKey(country, year) {

    if(country !== "All")
        return "year";
    return "country";
}
export function resolveDisplayYear(series, year) {
  if (year !== "All") return Number(year);
  return Math.max(...series.map(item => item.year));
}