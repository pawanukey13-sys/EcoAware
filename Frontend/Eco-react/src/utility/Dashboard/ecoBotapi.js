// src/utility/ecobotApi.js
export async function explainGraph({ metric, unit, data }) {
  const res = await fetch('http://localhost:4000/api/ecoChatBot/explain-graph', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metric, unit, data })
  });

  if (!res.ok) throw new Error('Failed to fetch explanation');
  return res.json(); // { explanation }
}
export async function askFollowUp({ metric, unit, data, question, history }) {
  const res = await fetch('http://localhost:4000/api/ecoChatBot/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metric, unit, data, question, history })
  });
  if (!res.ok) throw new Error('Failed to fetch answer');
  return res.json(); // { answer }
}