export function buildPredictionChartData({
  chartData,
  predictionsForMetric,
  country,
  isCountrySelected,
  axisKey,
}) {
  const predictedRows =
    isCountrySelected && predictionsForMetric?.[country]
      ? predictionsForMetric[country]
      : [];

  const historicalRows = chartData.map((d) => ({ ...d, predicted: false }));
  const fullLineData = [...historicalRows, ...predictedRows];

  const chartWithSplitKeys = fullLineData.map((d) => ({
    [axisKey]: d[axisKey] ?? d.year,
    actual: d.predicted ? null : d.value,
    forecast: d.predicted ? d.value : null,
  }));

  // Bridge the gap so the dashed line visually connects to the solid line
  const lastActualIndex = [...chartWithSplitKeys]
    .reverse()
    .findIndex((d) => d.actual !== null);

  if (lastActualIndex !== -1) {
    const idx = chartWithSplitKeys.length - 1 - lastActualIndex;
    chartWithSplitKeys[idx].forecast = chartWithSplitKeys[idx].actual;
  }

  return chartWithSplitKeys;
}