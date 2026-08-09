import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
const API_URL = "http://localhost:4000/api/quizscore";
const Questions = [
  {
    q: "Earth's temperature has risen by how much since pre-industrial times?",
    options: ["0.5°C", "1.2°C", "2.5°C", "3.0°C"],
    answer: 1,
    fact: "Earth is 1.2°C warmer — scientists warn 1.5°C could trigger irreversible damage.",
  },
  {
    q: "How many hectares of forest are lost every year globally?",
    options: ["1 Million", "5 Million", "10 Million", "20 Million"],
    answer: 2,
    fact: "10 million hectares — roughly the size of Iceland — disappear every year.",
  },
  {
    q: "What percentage of global emissions does livestock produce?",
    options: ["5%", "10%", "14.5%", "25%"],
    answer: 2,
    fact: "Livestock produces 14.5% of global greenhouse gas emissions.",
  },
  {
    q: "How many tons of plastic enter the oceans every year?",
    options: ["1 Million", "5 Million", "11 Million", "20 Million"],
    answer: 2,
    fact: "11 million tons of plastic enter oceans yearly — harming over 800 marine species.",
  },
  {
    q: "By how much have global wildlife populations declined since 1970?",
    options: ["20%", "45%", "69%", "90%"],
    answer: 2,
    fact: "WWF's Living Planet Report found a 69% average decline in vertebrate wildlife.",
  },
  {
    q: "What is the safe CO₂ level threshold for the atmosphere?",
    options: ["280 ppm", "350 ppm", "400 ppm", "450 ppm"],
    answer: 1,
    fact: "350 ppm is considered safe — we are currently at 424 ppm and rising.",
  },
  {
    q: "How many species go extinct every single day?",
    options: ["5-10", "25-50", "50-150", "500+"],
    answer: 2,
    fact: "Scientists estimate 50-150 species go extinct daily — most before being discovered.",
  },
  {
    q: "Which sector produces the most greenhouse gas emissions globally?",
    options: ["Aviation", "Energy production", "Agriculture", "Construction"],
    answer: 1,
    fact: "Energy production (burning fossil fuels) is the single largest source of emissions.",
  },
];
console.log("question length", Questions.length);

function getScoremessage(score, total) {
  const percenatage = (score / total) * 100;
  if (percenatage == 100)
    return {
      msg: "Perfect Score! Congrutulation you are EcoChampian🏆",
      color: "#1A6B47",
    };
  if (percenatage > 75)
    return {
      msg: "Excellent you know our Environmt well 🌱",
      color: "#4CAF82",
    };
  if (percenatage > 50)
    return {
      msg: "Good effort! keep learning and spreading awareness",
      color: "#F4A021",
    };
  return {
    message: "Keep learning and gaining knowldge to protect our environment🌿",
    color: "#E24B4A",
  };
}
export default function Quiz() {
  const [screen, setScreen] = useState("start");
  const [userName, setuserName] = useState("");
  const [selected, setselected] = useState(null);
  const [currentQ, setcurrentQ] = useState(0);
  const [score, setscore] = useState(0);
  const [showFact, setshowFact] = useState(false);
  const [leaderboard, setleaderboard] = useState([]);
  const [saving, setsaving] = useState(false);
  const question = Questions[currentQ];
  const total = Questions.length;

  const startQuiz = () => {
    if (!userName.trim()) return alert("Please enter your name");
    setScreen("quiz");
  };
  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setselected(idx);
    if (idx == question.answer) setscore((s) => s + 1);
    setshowFact(true);
  };
  const nextQuestion = () => {
    setselected(null);
    setshowFact(false);
    if (currentQ + 1 >= total) {
      saveScore();
      setScreen("result");
    } else {
      setcurrentQ((q) => q + 1);
    }
  };
  const saveScore = async () => {
    setsaving(true);
    try {
      console.log("Sending to backend:", {
        name: userName,
        score,
        total,
      });
      await fetch(API_URL, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ name: userName, score, total }),
      });
      const res = await fetch(`${API_URL}/leaderboard`);
      const data = await res.json();
      console.log(data);

      setleaderboard(data);
    } catch (err) {
      console.error("Error occur in saving score", err);
    } finally {
      setsaving(false);
    }
  };
  // Restart
  const restart = () => {
    setScreen("start");
    setscore(0);
    setcurrentQ(0);
    setselected(null);
    setshowFact(false);
    setuserName("");
  };
  const { message, color } = getScoremessage(score, total);
  return (
    <div className="quiz-page">
      {screen === "start" && (
        <div className="quiz_card">
          <div className="quiz_emoji">🌎</div>
          <h1 className="quiz-heading">
            {" "}
            Eco<span>Aware</span>
          </h1>
          <p className="quiz-sub">
            Test your Environmental knowledge with {total} questions. Learn some
            new fact and protect our Earth.
          </p>
          <input
            className="name-input"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startQuiz()}
          />

          <button className="quiz-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}
      {/* quiz screen */}
      {screen === "quiz" && (
        <div className="quiz_card">
          <div className="quiz_wrapper">
            <div className="quiz_progress">
              <span>
                Question {currentQ + 1} of {total}
              </span>
              <span>Score:{score}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQ + 1) / total) * 100}%` }}
              ></div>
            </div>
            {/* question */}
            <p className="question-text">{question.q}</p>

            {/* options */}
            <div className="Options">
              {question.options.map((opt, i) => {
                let cls = "option";
                if (selected !== null) {
                  if (i === question.answer) cls += " option";
                  else if (i === selected) cls += " wrong";
                  else cls += " disable";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleAnswer(i)}
                  >
                    <span className="option-letter">
                      {["A.", "B.", "C.", "D."][i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {showFact && (
              <div
                className={`fact-box ${selected === question.answer ? "correct-fact" : "wrong-fact"}`}
              >
                <strong>
                  {selected === question.answer ? "✅ Correct!" : "❌ Wrong!"}
                </strong>
                <p className="fact-msg">{question.fact}</p>
              </div>
            )}
            {selected !== null && (
              <button className="quiz-btn" onClick={nextQuestion}>
                {currentQ + 1 >= total ? "See Results →" : "Next Question →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Result screen */}
      {screen === "result" && (
        <div className="result_card">
          <div className="result-score" style={{ color }}>
            {score}/{total}{" "}
          </div>
          <p className="result-msg">{message}</p>
          <p className="result-name">Well done {userName}!🎉</p>
          <button
            className="quiz-btn"
            onClick={restart}
            style={{ marginTop: "1.5rem" }}
          >
            Try again
          </button>
          {/* leaderboard */}
          <div className="leaderBoard">
            <h3 className="lb-title">LeaderBoard</h3>
            {saving ? (
              <p className="lb-loading">Loading your score...</p>
            ) : leaderboard.length === 0 ? (
              <p className="lb-loading">No scores yet!</p>
            ) : (
              <div className="lb-list">
                {leaderboard.map((s, i) => {
                  return (
                    <div
                      key={i}
                      className={`lb-row ${s.name === userName ? "lb-you" : ""}`}
                    >
                      <span className="lb-rank">#{i + 1}</span>
                      <span className="lb-name">{s.name}</span>
                      <span className="lb-score">
                        {s.score}/{s.total}{" "}
                      </span>
                      <span className="lb-pct">{s.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
