// src/components/dashboard/ChartsSection.jsx

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import ExplainButton from "../EcoBot/ExplainButton";
import {
  filterSeries,
  resolveAxisKey,
} from "../../utility/Dashboard/filterUtility";
import CompareMode from "../EcoBot/Comparemode";
import { buildPredictionChartData } from "../../utility/Dashboard/predictionUtility";
import co2Prediction from "../Dashboard/data/co2_predictions.json"
import forestPrediction from "../Dashboard/data/forest_predictions.json"
import AirPrediction from "../Dashboard/data/pm25_predictions.json"
import waterPrediction from "../Dashboard/data/water_predictions.json"
// import EmptyState from "./EmptyState";
const predictionsByMetric = {
  co2: co2Prediction,
  aqi: AirPrediction,
  freshwater_withdrawals: waterPrediction,
  forest_loss: forestPrediction,
};
function formatCompactNumber(value, categoryId = "") {
  if (value === null || value === undefined || isNaN(value)) return "0";

  const absVal = Math.abs(value);
  const cat = (categoryId || "").toLowerCase();

  // 1. Water Category (Handling large cubic meter values)
  if (cat.includes("water")) {
    if (absVal >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`;
    if (absVal >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (absVal >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(1);
  }

  // 2. Forest & General Categories (Forest loss/gain in Hectares)
  if (absVal >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (absVal >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
// Updated Formatter for Water / Large Volumes

// Helper function to calculate severity color based on value & metric
function getThresholdColor(value, categoryId, metricTitle = "") {
  const cat = (categoryId || "").toLowerCase();
  const title = (metricTitle || "").toLowerCase();

  // 1. Climate / CO2 Emissions (Tonnes per person)
  // Benchmark: Global target is ~2.0 tonnes. >10 is critical.
  if (cat.includes("climate") || title.includes("co2")) {
    if (value <= 2.0) return "#2E7D32"; // 🟢 Green (India: 1.7)
    if (value <= 5.0) return "#F59E0B"; // 🟡 Yellow (UK: 4.8)
    if (value <= 10.0) return "#E65100"; // 🟠 Orange (China: 7.6)
    return "#C62828"; // 🔴 Red (USA: 13.8 -> Automatic RED!)
  }

  // 2. Air Quality (PM2.5 in µg/m³)
  // WHO Benchmark: Safe <= 12, Unhealthy > 35, Hazardous > 50
  if (cat.includes("air")) {
    if (value <= 12) return "#2E7D32"; // 🟢 Green (Australia: 5.4, US: 7.5)
    if (value <= 35) return "#F59E0B"; // 🟡 Yellow (China: 31.3)
    if (value <= 50) return "#E65100"; // 🟠 Orange (India: 44.2, Egypt: 41.3)
    return "#C62828"; // 🔴 Red (Pakistan: 53.8, Bangladesh: 65)
  }

  // 3. Forest Loss
  if (cat.includes("forest") || title.includes("Forest Loss")) {
    if (value > 0) return "#2E7D32"; // 🟢 Green (Forest Gain)
    return "#C62828"; // 🔴 Critical
  }
  if (cat.includes("water")) {
    const valB =
      Math.abs(value) >= 1_000_000_000 ? value / 1_000_000_000 : value;

    if (valB <= 20) return "#38BDF8"; // Light Sky Blue (Low Volume)
    if (valB <= 100) return "#0284C7"; // Ocean Blue (Medium Volume)
    if (valB <= 300) return "#0369A1"; // Deep Blue (High Volume)
    return "#1E3A8A";
  }
  return "#10B981"; // Default fallback
}
const PIE_COLORS = [
  "#3B82F6",
  "#EF4444",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

export default function ChartsSection({ category, country, year }) {
  const [chartType, setChartType] = useState("bar");

  const metric = category.metrics[0];
  const axisKey = resolveAxisKey(country, year);

  const data = useMemo(() => {
    const filtered = filterSeries(metric.series, country, year);

    // Always sort descending for cleaner Bar/Pie chart representation
    const sorted = [...filtered].sort((a, b) => b.value - a.value);

    // Limit to Top 10 when viewing "All" countries
    if (country === "All" && sorted.length > 10) {
      return sorted.slice(0, 10);
    }

    return sorted;
  }, [metric.series, country, year]);
  const hasNegativeValues = useMemo(() => {
    return data.some((item) => item.value < 0);
  }, [data]);
  const chartData = [...data].sort((a, b) => {
    const yearA = Number(a[axisKey] || a.year);
    const yearB = Number(b[axisKey] || b.year);
    return yearA - yearB;
  });
  const isCountrySelected = country && country !== "All";
  const firstYear = isCountrySelected
    ? Math.min(...data.map((d) => d.year))
    : null;
  const lastYear = isCountrySelected
    ? Math.max(...data.map((d) => d.year))
    : null;
  const latestYear =
    !isCountrySelected && data.length
      ? Math.max(...data.map((d) => d.year))
      : null;

  const effectiveChart = isCountrySelected ? "line" : chartType;
  const predictionsForMetric = predictionsByMetric[metric.id];
  const predictionChartData = useMemo(() => {
    if (!isCountrySelected || !predictionsForMetric) return null;
    return buildPredictionChartData({
      chartData,
      predictionsForMetric,
      country,
      isCountrySelected,
      axisKey,
    });
  }, [chartData, predictionsForMetric, country, isCountrySelected, axisKey]);
  console.log("metric.id is:", metric.id, "| predictions found:", !!predictionsForMetric);
  if (!data.length) {
    return (
      <div className="db-chart-area">
        <ChartToggle
          chartType={chartType}
          onChange={setChartType}
          isCountrySelected={isCountrySelected}
          hasNegativeValues={hasNegativeValues}
        />
       
      </div>
    );
  }

  return (
    <div className="db-chart-area">
      <div className="db-chart-header">
        <h3>
          {category.icon} {category.name} — {metric.title}
          {isCountrySelected
            ? ` (${country}, ${firstYear}-${lastYear})`
            : ` (${latestYear})`}
        </h3>
        <div className="db-chart-header-actions">
          <ChartToggle
            chartType={chartType}
            onChange={setChartType}
            isCountrySelected={isCountrySelected}
            hasNegativeValues={hasNegativeValues}
          />
        </div>
      </div>

      <ExplainButton
        metric={metric.title}
        unit={metric.unit}
        chartData={data}
      />
      <CompareMode metric={metric.title} unit={metric.unit} chartData={data} />

      <ResponsiveContainer width="100%" height={360}>
        {effectiveChart === "bar" ? (
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 45, top: 10, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />

            {/* X-Axis Tick Formatter */}
            <XAxis
              type="number"
              stroke="var(--db-text-light, #a3b8cc)"
              fontSize={12}
              tickFormatter={(val) => formatCompactNumber(val, category?.id)}
              label={{
                value: metric.unit,
                position: "insideBottom",
                offset: -15,
                fill: "var(--db-text-light, #a3b8cc)",
              }}
            />

            <YAxis
              type="category"
              dataKey={axisKey}
              stroke="var(--db-text, #ffffff)"
              fontSize={12}
              width={110}
              tickLine={false}
            />

            {/* Tooltip Formatter */}
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              formatter={(value) => [
                formatCompactNumber(value, category?.id),
                metric.unit,
              ]}
            />

            <Bar dataKey="value">
              {data.map((entry, index) => {
                const isPositive = entry.value >= 0;
                const barRadius = isPositive ? [0, 6, 6, 0] : [6, 0, 0, 6];

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={getThresholdColor(entry.value, category.id)}
                    radius={barRadius}
                  />
                );
              })}

              {/* LabelList Formatter */}
              <LabelList
                dataKey="value"
                position={(entry) => (entry.value >= 0 ? "right" : "left")}
                fill="var(--db-text-light, #a3b8cc)"
                fontSize={11}
                formatter={(val) => formatCompactNumber(val, category?.id)}
              />
            </Bar>
          </BarChart>
        ) : effectiveChart === "line" ? (
          <LineChart
            data={predictionChartData || chartData}
            margin={{ left: 10, right: 20, top: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey={axisKey}
              stroke="var(--db-text-light, #a3b8cc)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--db-text-light, #a3b8cc)"
              fontSize={12}
              label={{
                value: metric.unit,
                angle: -90,
                position: "insideLeft",
                fill: "var(--db-text-light, #a3b8cc)",
              }}
            />
            <Tooltip contentStyle={tooltipStyle} />

            {predictionChartData ? (
              <>
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke={category.accent || "var(--db-accent)"}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  connectNulls={false}
                  name="Historical"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke={category.accent || "var(--db-accent)"}
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                  dot={{ r: 4 }}
                  connectNulls={false}
                  name="Predicted"
                />
                <Legend />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={category.accent || "var(--db-accent)"}
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            )}
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey={axisKey}
              outerRadius={110}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function ChartToggle({
  chartType,
  onChange,
  isCountrySelected,
  hasNegativeValues,
}) {
  const buttons = isCountrySelected
    ? ["line"]
    : hasNegativeValues
      ? ["bar"]
      : ["bar", "pie"];

  return (
    <div className="db-chart-toggle">
      {buttons.map((type) => {
        // Disable pie chart specifically when there are negative values
        const isDisabled = type === "pie" && hasNegativeValues;

        return (
          <button
            key={type}
            className={chartType === type ? "active" : ""}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(type)}
            title={
              isDisabled ? "Pie charts cannot display negative values" : ""
            }
          >
            {type === "bar"
              ? "Bar Chart"
              : type === "line"
                ? "Line Chart"
                : "Pie Chart"}
          </button>
        );
      })}
    </div>
  );
}

const tooltipStyle = {
  background: "var(--db-surface, #10261e)",
  border: "1px solid var(--db-border, #1e3a2f)",
  borderRadius: 8,
  color: "var(--db-text, #ffffff)",
};
