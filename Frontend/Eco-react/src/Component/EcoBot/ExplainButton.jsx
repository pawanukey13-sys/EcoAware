import { useState } from 'react';
import { explainGraph,askFollowUp } from '../../utility/Dashboard/ecoBotapi';
import "./ExplainButton.css"
export default function ExplainButton({ metric, unit, chartData }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [asking, setAsking] = useState(false);
  const [history, setHistory] = useState([]);

  const handleExplain = async () => {
    setLoading(true);
    try {
      const { explanation } = await explainGraph({ metric, unit, data: chartData });
      setExplanation(explanation);
    }
     catch (err) {
      setExplanation('Could not generate explanation right now.',err);
    } finally {
      setLoading(false);
    }
  };
const handleAsk = async () => {
    if (!question.trim()) return;
    setAsking(true);
    const currentQ = question;
    setQuestion('');
    try {
      const { answer } = await askFollowUp({
        metric, unit, data: chartData, question: currentQ, history
      });
      setHistory(prev => [...prev, { question: currentQ, answer }]);
    } catch {
      setHistory(prev => [...prev, { question: currentQ, answer: 'Could not answer that right now.' }]);
    } finally {
      setAsking(false);
    }
  };
  return (
    <div className="ecobot-explain">
      <button onClick={handleExplain} disabled={loading} className="auth-btn">
        {loading ? 'Analyzing...' : '🤖 Explain this graph'}
      </button>
      {explanation && <p className="ecobot-explanation">{explanation}</p>}
      {explanation && (
        <div className="ecobot-followup">
          {history.map((h, i) => (
            <div key={i} className="ecobot-qa">
              <p className="ecobot-q">You: {h.question}</p>
              <p className="ecobot-a">EcoBot: {h.answer}</p>
            </div>
          ))}

          <div className="ecobot-input-row">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask a follow-up question..."
              disabled={asking}
            />
            <button onClick={handleAsk} disabled={asking} className="auth-btn">
              {asking ? '...' : 'Ask'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}