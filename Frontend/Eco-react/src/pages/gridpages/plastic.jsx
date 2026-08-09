import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Plastic.css";

const plasticData = [
  { year: 1950, waste: 2 },
  { year: 1970, waste: 35 },
  { year: 1990, waste: 120 },
  { year: 2000, waste: 220 },
  { year: 2010, waste: 300 },
  { year: 2020, waste: 390 },
  { year: 2024, waste: 430 },
];

const causes = [
  {
    title: "Single-Use Plastics",
    desc: "Disposable bottles, bags, straws, and food packaging are used for minutes but remain in the environment for centuries.",
  },
  {
    title: "Poor Waste Management",
    desc: "Millions of tons of plastic waste are dumped or burned due to inadequate collection and recycling systems.",
  },
  {
    title: "Overproduction",
    desc: "Plastic production continues to increase every year because it is cheap, lightweight, and widely used.",
  },
];

const impacts = [
  {
    stat: "430M",
    label: "Tons of plastic produced every year",
  },
  {
    stat: "11M",
    label: "Tons enter oceans annually",
  },
  {
    stat: "1M+",
    label: "Marine animals die each year",
  },
];

const timeline = [
  {
    item: "Plastic Bag",
    years: "~20 Years",
  },
  {
    item: "Plastic Bottle",
    years: "~450 Years",
  },
  {
    item: "Fishing Line",
    years: "~600 Years",
  },
  {
    item: "Styrofoam",
    years: "500+ Years",
  },
];

const solutions = [
  "Carry reusable bottles and shopping bags.",
  "Avoid single-use plastics whenever possible.",
  "Recycle plastic correctly according to local guidelines.",
  "Choose products with eco-friendly packaging.",
  "Participate in community clean-up drives.",
];

export default function Plastic() {
  return (
    <main className="plastic-page">
      <div className="plastic-top"></div>

      {/* HERO */}

      <section className="plastic-hero">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="plastic-tag">PLASTIC POLLUTION</div>

        <h1 className="plastic-title">
          More than <em>430 million tons</em> of plastic are produced every
          year.
        </h1>

        <p className="plastic-sub">
          Plastic pollution threatens oceans, wildlife, ecosystems, and even
          human health through microplastics. Every small action helps reduce
          this growing global crisis.
        </p>
      </section>

      {/* OVERVIEW */}

      <section className="plastic-section">
        <div className="eyebrow">The Problem</div>

        <h2>Why plastic pollution matters</h2>

        <p>
          Plastic is durable and convenient, but that same durability makes it
          one of the world's biggest environmental challenges. Much of the
          plastic ever produced still exists today, polluting land, rivers, and
          oceans while harming wildlife and entering the food chain as
          microplastics.
        </p>
      </section>

      {/* CHART */}

      <section className="plastic-section">
        <div className="eyebrow">The Data</div>

        <h2>Global Plastic Production</h2>

        <div className="plastic-chart">
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart
              data={plasticData}
              margin={{
                top: 20,
                right: 20,
                left: 80,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis
                label={{
                  value: "Million Tons / Year",
                  angle: -90,
                  position: "insideLeft",
                  dx:-30,
                  style:{
                    textAnchor:"middle",
                    dominantBaseline:"middle",
                    fontSize:16
                  }
                }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="waste"
                stroke="#00bcd4"
                fill="#4dd0e1"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* CAUSES */}

      <section className="plastic-section">
        <div className="eyebrow">Main Causes</div>

        <h2>What's causing plastic pollution?</h2>

        <div className="plastic-grid">
          {causes.map((item) => (
            <div className="plastic-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}

      <section className="plastic-section">
        <div className="eyebrow">The Impact</div>

        <h2>Plastic pollution in numbers</h2>

        <div className="impact-grid">
          {impacts.map((item) => (
            <div className="impact-card" key={item.label}>
              <div className="impact-number">{item.stat}</div>

              <div className="impact-text">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DECOMPOSITION */}

      <section className="plastic-section">
        <div className="eyebrow">Decomposition Time</div>

        <h2>How long does plastic last?</h2>

        <div className="timeline-grid">
          {timeline.map((item) => (
            <div className="timeline-card" key={item.item}>
              <h3>{item.item}</h3>
              <div className="timeline-years">{item.years}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}

      <section className="plastic-section">
        <div className="eyebrow">Solutions</div>

        <h2>What you can do</h2>

        <ul className="solution-list">
          {solutions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}

      <section className="plastic-cta">
        <h2>Want to reduce your plastic footprint?</h2>

        <p>Ask EcoBot for simple, practical tips to live with less plastic.</p>

        <Link to="/chatbot" className="plastic-btn">
          Ask EcoBot →
        </Link>
      </section>

      {/* SOURCES */}

      <footer className="plastic-footer">
        Sources: UNEP, OECD Global Plastics Outlook, Our World in Data
      </footer>
    </main>
  );
}
