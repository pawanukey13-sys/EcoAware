import { useState } from 'react';
import { askFollowUp } from '../../utility/Dashboard/ecoBotapi';
import "./ExplainButton.css"
export default function CompareMode({ metric, unit, chartData }) {
  const [countryA, setCountryA] = useState('');
  const [countryB, setCountryB] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = [...new Set(chartData.map(d => d.country))];

  const handleCompare = async () => {
    if (!countryA || !countryB || countryA === countryB) return;
    setLoading(true);
    try {
      const question = `Compare ${countryA} and ${countryB}. State the difference and percentage difference.`;
      const { answer } = await askFollowUp({
        metric, unit, data: chartData, question, history: []
      });
      setResult(answer);
    } catch {
      setResult('Could not compare right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ecobot-compare">
      <div className="ecobot-compare-selects">
        <select value={countryA} onChange={(e) => setCountryA(e.target.value)}>
          <option value="">Select country A</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span>vs</span>
        <select value={countryB} onChange={(e) => setCountryB(e.target.value)}>
          <option value="">Select country B</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleCompare} disabled={loading} className="auth-btn">
          {loading ? '...' : 'Compare'}
        </button>
      </div>
      {result && <p className="ecobot-explanation">{result}</p>}
    </div>
  );
}