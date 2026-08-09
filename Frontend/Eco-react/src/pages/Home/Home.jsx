import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css"; // apna style.css copy karke Home.css naam de do

// ── Images — inhe src/assets/ folder mein rakho ──
import image1 from "../../assets/image1.png";
import image3 from "../../assets/image3.png";
const API_URL = "http://localhost:4000/api/pledge";

export default function Home() {
  const [pledgeCount, setPledgeCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [checked, setChecked] = useState([]); // checked pledge texts
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    // ── Counter Animation script.js
    const startCounterAnimation = () => {
      const counters = document.querySelectorAll(".big-stat-num");
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const dataSuffix = counter.getAttribute("data-suffix");
        const isPercent = counter.textContent.includes("%");
        const suffix = dataSuffix || (isPercent ? "%" : "");
        let current = 0;

        const updateCounter = () => {
          const increment = target / 100;
          if (current < target) {
            current += increment;
            counter.textContent = `${Math.ceil(current)}${suffix}`;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = `${target}${suffix}`;
          }
        };
        updateCounter();
      });
    };
    // ── Reveal Animation (scroll pe elements dikhana) ──
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");

            // Start counter when stats section becomes visible
            if (e.target.classList.contains("stats-section")) {
              startCounterAnimation();
            }
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((r) => observer.observe(r));

    // ── Navbar scroll effect ──
    const handleScroll = () => {
      const nav = document.getElementById("navbar");
      if (nav) {
        nav.style.boxShadow =
          window.scrollY > 60 ? "0 2px 20px rgba(0,0,0,0.08)" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    fetchPldgeCount();
    // ── Cleanup — component hatne pe sab band karo ──
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // [] = sirf ek baar run karo
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const fetchPldgeCount = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPledgeCount(data.total); // total count set karo
    } catch (err) {
      console.error("Count fetch error:", err);
    }
  };
  const togglePledge = (id) => {
    setChecked((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((p) => p !== id) // already checked — hata do
        : [...prev, id];
      return updated;
    });
  };

  const submitPledge = async () => {

    if (checked.length === 0) return alert("Select at least one pledge!");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pledge: checked }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
      setPledgeCount((prev) => prev + checked.length); // count turant update karo
    } catch (err) {
      alert("Unable to connect to server", err);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-eyes">ENVIRONMENTAL AWARENESS PROJECT</div>
          <h1>
            Our mother earth is <br />
            <em>Speaking.</em>
            <br />
            Are you Listening?
          </h1>
          <div className="hero-sub">
            <p>
              Climate change, Deforestation, Increasing Population, Biodiversity
              loss are reshaping our world. Learn the facts, take Actions and
              become the part of solution.
            </p>
          </div>
          <div className="hero-btns">
            <a href="#issues" className="first-btn">
              Explore the Crisis
            </a>
            {/* Link to="/chatbot" = React Router se chatbot page pe jaao */}
            <Link to="/chatbot" className="scondary-btn">
              Ask EcoBot <img src={image1} className="image1" alt="ecobot" />
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="earth-ring">
            <div className="earth-inner">🌏</div>
          </div>
          <div className="float-badge b1">
            <div className="badge-dot red"></div>
            <span>+1.2°C warmer since 1900</span>
          </div>
          <div className="float-badge b2">
            <div className="badge-dot green"></div>
            <span>10M ha forest lost/year</span>
          </div>
          <div className="float-badge b3">
            <div className="badge-dot purple"></div>
            <span>1M+ species at risk</span>
          </div>
          <div className="float-badge b4">
            <div className="badge-dot orange"></div>
            <span>Air pollution kills ~7M people/year</span>
          </div>
        </div>

        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-inner" id="ticker">
          <span className="ticker-item">
            🔥 2026 is the hottest year recorded
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">🌊 Sea level rises 3.4 mm/year</span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">💨 CO₂ levels now exceed 420 ppm</span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            11M tons of plastic enter oceans yearly
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🪸 Coral reefs could decline 90% by 2050
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🐟 Over 1 million marine animals die from plastic pollution annually
          </span>
          <span className="ticker-sep">•</span>
          {/* Duplicate for seamless loop */}
          <span className="ticker-item">
            🔥 2026 is the hottest year recorded
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">🌊 Sea level rises 3.4 mm/year</span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">💨 CO₂ levels now exceed 420 ppm</span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            11M tons of plastic enter oceans yearly
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🪸 Coral reefs could decline 90% by 2050
          </span>
          <span className="ticker-sep">•</span>
          <span className="ticker-item">
            🐟 Over 1 million marine animals die from plastic pollution annually
          </span>
          <span className="ticker-sep">•</span>
        </div>
      </div>

      {/* ── ISSUES ── */}
      <section className="issues" id="issues">
        <div className="issue-intro">
          <div className="issue-left">
            <div className="section-label1">The Crisis</div>
            <h2 className="section-title">
              Three <em>urgent</em> threats to our planet
            </h2>
          </div>
          <p>
            These are not distant problems. They are happening right now — and
            the decisions we make today will define the planet our children
            inherit.
          </p>
        </div>

        <div className="issue-grid reveal">
          {/* Link = React Router navigation */}
          <Link to="/climate" className="issue-card">
            <div className="issue-image-climate">🌡️</div>
            <div className="issue-body">
              <div className="issue-tag">CLIMATE CHANGE</div>
              <div className="issue-title">A Warming World</div>
              <p className="issue-text">
                Greenhouse gases trap heat, raising global temperatures and
                causing extreme weather events, flood and droughts worldwide.
              </p>
              <div className="issue-stat">
                <span className="issue-num">1.2°C</span>
                <span className="issue-unit">Warmer since 1900</span>
              </div>
            </div>
            <div className="issue-footer">
              <span className="issue-cta">Explore the crisis</span>
              <span className="issue-arrow">→</span>
            </div>
          </Link>

          <Link to="/deforestation" className="issue-card">
            <div className="issue-image-deforestation">🌳</div>
            <div className="issue-body">
              <div className="issue-tag">DEFORESTATION</div>
              <div className="issue-title">Losing Our Lungs</div>
              <p className="issue-text">
                Forests are the planet's carbon sinks and biodiversity hotspots.
                We lose area the size of a football field every single second.
              </p>
              <div className="issue-stat">
                <span className="issue-num">10M</span>
                <span className="issue-unit">hectares lost every year</span>
              </div>
              <div className="issue-footer">
                <span className="issue-cta">Explore the crisis</span>
                <span className="issue-arrow">→</span>
              </div>
            </div>
          </Link>

          <Link to="/plastic" className="issue-card">
            <div className="issue-image-plastic">♻️</div>
            <div className="issue-body">
              <div className="issue-tag">PLASTIC POLLUTION</div>
              <div className="issue-title">Drowning in Plastic</div>
              <p className="issue-text">
                Over 11 million tons of plastic enter the oceans each year,
                harming marine life and breaking into microplastics now found in
                water, food, and human blood.
              </p>
              <div className="issue-stat">
                <span className="issue-num">11M</span>
                <span className="issue-unit">tons enter oceans yearly</span>
              </div>
            </div>
            <div className="issue-footer">
              <span className="issue-cta">Explore the crisis</span>
              <span className="issue-arrow">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section reveal">
        <div className="stats-layout">
          <div className="stat-text ">
            <div className="section-label1">By the numbers</div>
            <h2 className="section-title">
              The scale of the <em>crisis</em>
            </h2>
            <p>
              Every number below represents a real impact on real ecosystems,
              communities, and species. These are not projections — they are
              happening now.
            </p>
            <Link to="/dashboard" className="secondary-btn">
              View all data
            </Link>
          </div>

          <div className="stat-grid-data">
            <div className="big-stat">
              <div
                className="big-stat-num"
                id="cnt1"
                data-target="424"
                data-suffix=" ppm"
              >
                0
              </div>
              <div className="big-stat-divider"></div>
              <div className="big-stat-label">
                CO₂ parts per million in atmosphere
              </div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" id="cnt2" data-target="69">
                0%
              </div>
              <div className="big-stat-divider"></div>
              <div className="big-stat-label">
                Decline in global wildlife since 1970
              </div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" id="cnt3" data-target="420">
                0
              </div>
              <div className="big-stat-divider"></div>
              <div className="big-stat-label">
                Million hectares of Amazon deforested
              </div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" id="cnt4" data-target="100">
                0
              </div>
              <div className="big-stat-divider"></div>
              <div className="big-stat-label">
                Species go extinct every single day
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIONS ── */}
      <section className="action-section" id="action">
        <div className="section-label1">Take Actions</div>
        <h2 className="section-title">
          Small actions,
          <br />
          <em>massive</em> impact
        </h2>
        <div className="action-grid reveal">
          <div className="action-card">
            <div className="action-icon">🥦</div>
            <div>
              <div className="action-title">Eat less meat as possible</div>
              <div className="action-desc">
                Livestock produces 14.5% of global emissions. One plant-based
                day saves ~600 litres of water and significant CO₂.
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">🌳</div>
            <div>
              <div className="action-title">Plant a native tree</div>
              <div className="action-desc">
                A single tree absorbs ~22 kg of CO₂ per year and provides
                habitat for birds, insects, and wildlife.
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">🚲</div>
            <div>
              <div className="action-title">
                Choose low carbon mode of transport
              </div>
              <div className="action-desc">
                Walk, cycle, or use public transport. A 10 km car journey emits
                ~2.5 kg of CO₂ — cycling emits zero.
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">📢</div>
            <div>
              <div className="action-title">Spread awareness</div>
              <div className="action-desc">
                Share what you learn. Talk to family and friends. One
                conversation can spark a chain of change in your community.
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">♻️</div>
            <div>
              <div className="action-title">Reduce, reuse, recycle</div>
              <div className="action-desc">
                Avoid single-use plastics. Reuse bags, bottles, and containers.
                Recycle correctly — it makes a measurable difference.
              </div>
            </div>
          </div>
          <div className="action-card">
            <div className="action-icon">💡</div>
            <div>
              <div className="action-title">Save energy at home</div>
              <div className="action-desc">
                Switch off lights, unplug chargers, and use energy-efficient
                appliances. Small savings add up to tonnes of CO₂.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHATBOT CTA ── */}
      <div className="chatbot-cta" id="ecobot">
        <div className="chatbot-reveal reveal">
          <div>
            <h2>
              Have question about <br />
              the environment?
            </h2>
            <p>
              EcoBot is our AI-powered assistant trained on environmental
              topics. Ask anything — from why glaciers melt, to what you can do
              in your city to help.
            </p>
          </div>
          <Link to="/chatbot" className="btn-prima">
            <span>Chat with EcoBot</span>
            <img src={image3} className="btn-arrow" alt="arrow" />
          </Link>
        </div>
      </div>

      {/* ── PLEDGE ── */}
      <section className="pledge-section" id="pledge">
        <div className="pledge-left">
          <div className="section-label1">Community</div>
          <div className="section-title">
            Make your <br />
            <em>green pledge</em>
          </div>
          <p>
            Join people who are committing to small but powerful changes.
            <br />
            Check the actions you will take and hold yourself accountable.
          </p>
          <div>
            <div className="pledge-count">{pledgeCount}</div>
            <div className="pledge-count-label">pledges made so far</div>
          </div>
        </div>

        <div className="pledge-right">
          {!submitted ? (
            <div className="pledge-submit-area">
              {!isLoggedIn ? (
                <div className="pledge-login-card">
                  <h3>🌱 Join EcoAware</h3>

                  <p>
                    Login to make your pledge, save your progress and track your
                    environmental impact.
                  </p>

                  <div className="pledge-auth-buttons">
                    <Link to="/login" className="pledge-login-btn">
                      Login
                    </Link>

                    <Link to="/register" className="pledge-register-btn">
                      Register
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pledge-card">
                    {[
                      "I will go plant based atleast once a week",
                      "I will plant a tree this month and take care of it.",
                      "I will reduce my single use plastic",
                      "I will save energy at home",
                      "I will talk to 3 people about climate change",
                      "I will prefer public transport",
                      "I will buy fewer unnecessary items",
                    ].map((text, i) => (
                      <label className="pledge-items" key={i}>
                        <input
                          type="checkbox"
                          className="pledge-checkbox"
                          onChange={() => togglePledge(text)}
                        />

                        <span className="pledge-check-circle"></span>

                        <span className="pledge-text">{text}</span>
                      </label>
                    ))}
                  </div>

                  <button className="pledge-btn" onClick={submitPledge}>
                    Make Pledge 🌿
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="pledge-success">
              ✅ Thank you! Your pledge is saved.
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Eco<span>Aware</span>
            </div>
            <p className="footer-desc">
              A student-led environmental awareness project dedicated to
              educating people about climate change, deforestation, and
              biodiversity loss.
            </p>
          </div>
          <div>
            <div className="footer-heading">Issues</div>
            <ul className="footer-links">
              <li>
                <Link to="/climate">Climate Change</Link>
              </li>
              <li>
                <Link to="/deforestation">Deforestation</Link>
              </li>
              <li>
                <Link to="/plastic">Plastic Pollution</Link>
              </li>
              <li>
                <Link to="/dashboard">Data and Stats</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Engage</div>
            <ul className="footer-links">
              <li>
                <Link to="/quiz">Take the Quiz</Link>
              </li>
              <li>
                <Link to="/pledge">Make a Pledge</Link>
              </li>
              <li>
                <Link to="/chatbot">EcoBot</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Project</div>
            <ul className="footer-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 EcoAware Project. Made with 💚 for the planet Earth
          </span>
          <span>Data sources: NASA, WWF, Global Forest Watch, IUCN</span>
        </div>
      </footer>
    </>
  );
}
