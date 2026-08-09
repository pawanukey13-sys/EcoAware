import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Climate.css";

// ---- Static data for the temperature-rise chart ----
// Replace these numbers with real IPCC/NASA dataset values if you have them.
const tempData = [
  { year: 1900, temp: 0 },
  { year: 1940, temp: 0.2 },
  { year: 1980, temp: 0.4 },
  { year: 2000, temp: 0.6 },
  { year: 2020, temp: 1.0 },
  { year: 2024, temp: 1.2 },
];

const causes = [
  {
    title: "Burning Fossil Fuels",
    desc: "Coal, oil, and gas release CO2 when burned for electricity, heat, and transport — the single biggest driver of warming.",
  },
  {
    title: "Deforestation",
    desc: "Trees absorb CO2. Cutting them down removes this natural buffer and releases stored carbon back into the air.",
  },
  {
    title: "Industrial Agriculture",
    desc: "Livestock farming and fertilizer use release methane and nitrous oxide, both far more potent than CO2.",
  },
];

const effects = [
  { stat: "3.3 mm/yr", label: "Sea level rise rate" },
  { stat: "2x", label: "More frequent heatwaves since 1950" },
  { stat: "1M+", label: "Species at risk of extinction" },
];

const actions = [
  "Switch to renewable energy where possible (solar, wind).",
  "Reduce, reuse, and recycle — cut down on single-use items.",
  "Support policies that price carbon and fund clean energy.",
  "Talk about it — public pressure drives corporate and political change.",
];

export default function ClimatePage() {
  return (
    <main className="climate-page">
      {/* Signature visual: real "warming stripes" climate data motif */}
      <div className="warming-stripes"></div>

      {/* ---------- HERO ---------- */}
      <section className="climate-hero">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="climate-hero-tag">CLIMATE CHANGE</div>
        <h1 className="climate-hero-title">
          The planet has warmed <em>1.2°C</em> since 1900 — and it's
          accelerating.
        </h1>
        <p className="climate-hero-sub">
          Greenhouse gases trap heat in the atmosphere, driving extreme
          weather, rising seas, and shrinking ecosystems worldwide.
        </p>
      </section>

      {/* ---------- OVERVIEW ---------- */}
      <section className="climate-section">
        <div className="climate-section-eyebrow">The Science</div>
        <h2 className="climate-section-title">What's happening</h2>
        <p className="climate-section-text">
          Since the industrial era began, human activity has released
          billions of tons of carbon dioxide and other greenhouse gases into
          the atmosphere. These gases trap heat that would otherwise escape
          into space, gradually raising the planet's average temperature.
          What seems like a small number — just over one degree — is enough
          to shift weather patterns, melt polar ice, and destabilize
          ecosystems that took thousands of years to balance.
        </p>
      </section>

      {/* ---------- CHART ---------- */}
      <section className="climate-section climate-chart-section">
        <div className="climate-section-eyebrow">The Data</div>
        <h2 className="climate-section-title">Temperature rise over time</h2>
        <div className="climate-chart-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a2f" />
              <XAxis dataKey="year" stroke="#a9b8ab" />
              <YAxis
                stroke="#a9b8ab"
                label={{
                  value: "°C above 1900 baseline",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#a9b8ab",
                }}
              />
              <Tooltip
                contentStyle={{ background: "#1c261f", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#ff6b4a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ---------- CAUSES ---------- */}
      <section className="climate-section">
        <div className="climate-section-eyebrow">The Drivers</div>
        <h2 className="climate-section-title">What's causing it</h2>
        <div className="climate-cause-grid">
          {causes.map((c) => (
            <div className="climate-cause-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- EFFECTS ---------- */}
      <section className="climate-section climate-effects-section">
        <div className="climate-section-eyebrow">The Impact</div>
        <h2 className="climate-section-title">The consequences</h2>
        <div className="climate-effects-grid">
          {effects.map((e) => (
            <div className="climate-effect-card" key={e.label}>
              <div className="climate-effect-stat">{e.stat}</div>
              <div className="climate-effect-label">{e.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SOLUTIONS / ACTIONS ---------- */}
      <section className="climate-section">
        <div className="climate-section-eyebrow">The Response</div>
        <h2 className="climate-section-title">What you can do</h2>
        <ul className="climate-actions-list">
          {actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      {/* ---------- CHATBOT CTA ---------- */}
      <section className="climate-cta-section">
        <h2>Have questions about climate solutions?</h2>
        <p>Ask our AI assistant for personalized, practical answers.</p>
        <Link to="/chatbot" className="climate-cta-btn">
          Ask EcoBot →
        </Link>
      </section>

      {/* ---------- SOURCES ---------- */}
      <footer className="climate-sources">
        Sources: NASA GISS, IPCC Sixth Assessment Report
      </footer>
    </main>
  );
}