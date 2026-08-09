import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
 Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./Deforestation.css";

const forestLossData = [
  { year: 2000, loss: 8.3 },
  { year: 2005, loss: 8.8 },
  { year: 2010, loss: 9.2 },
  { year: 2015, loss: 9.6 },
  { year: 2020, loss: 9.9 },
  { year: 2024, loss: 10.0 },
];

const causes = [
  {
    title: "Agricultural Expansion",
    desc: "Forests are cleared to create farmland and grazing areas for livestock.",
  },
  {
    title: "Illegal Logging",
    desc: "Millions of valuable trees are cut every year for timber and paper products.",
  },
  {
    title: "Urban Development",
    desc: "Roads, cities, and industries continue replacing forests worldwide.",
  },
];

const impacts = [
  {
    stat: "10M ha",
    label: "Forest lost every year",
  },
  {
    stat: "80%",
    label: "Land biodiversity lives in forests",
  },
  {
    stat: "15%",
    label: "Global emissions from deforestation",
  },
];

const solutions = [
  "Plant native trees and restore degraded forests.",
  "Choose FSC-certified wood and paper products.",
  "Reduce paper waste and recycle whenever possible.",
  "Support organizations protecting rainforests.",
  "Promote sustainable farming instead of forest clearing.",
];

export default function Deforestation() {
  return (
    <main className="forest-page">

      {/* Animated Forest Background */}
      <div className="forest-top"></div>

      {/* HERO */}

      <section className="forest-hero">

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="forest-tag">
          DEFORESTATION
        </div>

        <h1 className="forest-title">
          Every year the world loses
          <em> 10 million hectares </em>
          of forest.
        </h1>

        <p className="forest-sub">
          Forests regulate climate, produce oxygen, protect wildlife,
          and absorb carbon dioxide. Their destruction accelerates
          climate change and biodiversity loss.
        </p>

      </section>

      {/* OVERVIEW */}

      <section className="forest-section">

        <div className="eyebrow">
          The Crisis
        </div>

        <h2>
          Why forests matter
        </h2>

        <p>
          Forests cover nearly one-third of Earth's land surface and
          provide homes for millions of species. Every tree removed
          reduces biodiversity, releases stored carbon, and weakens
          nature's ability to fight climate change.
        </p>

      </section>

      {/* GRAPH */}

      <section className="forest-section">

        <div className="eyebrow">
          Forest Loss
        </div>

        <h2>
          Annual Forest Loss
        </h2>

        <div className="forest-chart">

          <ResponsiveContainer width="100%" height={320}>

            <AreaChart data={forestLossData}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="year"/>

              <YAxis
                label={{
                  value: "Million hectares",
                  angle:-90,
                  position:"insideLeft"
                }}
              />

              <Tooltip/>

              <Area
                dataKey="loss"
                stroke="#2e7d32"
                fill="#66bb6a"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* CAUSES */}

      <section className="forest-section">

        <div className="eyebrow">
          Main Causes
        </div>

        <h2>
          Why forests are disappearing
        </h2>

        <div className="forest-grid">

          {causes.map((item)=>(
            <div className="forest-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}

        </div>

      </section>

      {/* IMPACT */}

      <section className="forest-section">

        <div className="eyebrow">
          The Impact
        </div>

        <h2>
          Numbers that matter
        </h2>

        <div className="impact-grid">

          {impacts.map((item)=>(
            <div className="impact-card" key={item.label}>
              <div className="impact-number">
                {item.stat}
              </div>

              <div className="impact-text">
                {item.label}
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* SOLUTIONS */}

      <section className="forest-section">

        <div className="eyebrow">
          Solutions
        </div>

        <h2>
          How we can stop deforestation
        </h2>

        <ul className="solution-list">

          {solutions.map((item)=>(
            <li key={item}>{item}</li>
          ))}

        </ul>

      </section>

      {/* CTA */}

      <section className="forest-cta">

        <h2>
          Want to learn more?
        </h2>

        <p>
          Ask EcoBot about forests, biodiversity, or climate solutions.
        </p>

        <Link to="/chatbot" className="forest-btn">
          Ask EcoBot →
        </Link>

      </section>

      <footer className="forest-footer">
        Sources: FAO Global Forest Resources Assessment, UNEP, WWF
      </footer>

    </main>
  );
}