// backend/services/promptBuilder.js

function buildExplainGraphPrompt({ metric, unit, data }) {
  // data: [{ country: 'India', value: 2.1 }, ...]
  const rows = data
    .map((d) => `${d.country}: ${Number(d.value).toFixed(1)} ${unit}`)
    .join("\n");

  return `You are EcoBot, a data analyst for an environmental dashboard.
You must ONLY use the data provided below. Do not use outside knowledge
about these countries. If you don't have enough data to explain WHY
something is the way it is, say so explicitly.
IMPORTANT: Respond in plain text only. Do NOT use Markdown formatting
(no **, no bullet points with *, no headers). Do NOT use LaTeX or math
notation like \\frac{}{}. Write numbers and percentages as plain text,
e.g. "41.2%" not as a fraction formula. Keep it to normal sentences.

Metric: ${metric}
Data:
${rows}

Task: Write a 2-3 sentence explanation of what this data shows.
Mention the highest and lowest values, describe the overall pattern,
and if relevant, clarify what this metric does and does NOT represent
(e.g. per-person vs total). Do not speculate about causes unless
explicitly asked.`;
}
function buildFollowUpPrompt({ metric, unit, data, question, history = [] }) {
  const rows = data
    .map((d) => `${d.country}: ${Number(d.value).toFixed(1)} ${unit}`)
    .join("\n");

  const historyText = history
    .map((h) => `Q: ${h.question}\nA: ${h.answer}`)
    .join("\n\n");

  return `You are EcoBot, a data analyst for an environmental dashboard.
  IMPORTANT: Respond in plain text only. Do NOT use Markdown formatting
(no **, no bullet points with *, no headers). Do NOT use LaTeX or math
notation like \\frac{}{}. Write numbers and percentages as plain text,
e.g. "41.2%" not as a fraction formula. Keep it to normal sentences.

Metric: ${metric}
Data:
${rows}

Task: Answer the question below in two parts, clearly separated:

PART 1 — From the data: What the numbers above show (comparisons, ranking, pattern). Only use these numbers.

PART 2 — General context (optional): If the question asks "why," briefly explain likely contributing factors using general knowledge. Prefix this part with "Note: this goes beyond the dashboard's data —"

Question: ${question || "Explain this graph."}`;
}
module.exports = { buildExplainGraphPrompt, buildFollowUpPrompt };
