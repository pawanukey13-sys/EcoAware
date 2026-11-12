// backend/services/llmService.js

const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-flash-latest"];

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const body = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });
  let lastErr = "";

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            signal: AbortSignal.timeout(20000), // 20 sec timeout
          }
        );

        if (res.ok) {
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response generated.";
        }

        lastErr = await res.text();
        console.error(`Gemini ${model} failed (${res.status})`, lastErr);
        if (![429, 500, 503].includes(res.status)) break; // 404/400: next model
        await new Promise((r) => setTimeout(r, 1500));
      } catch (e) {
        lastErr = String(e.message);
        console.error(`Gemini ${model} error:`, lastErr);
      }
    }
  }
  throw new Error(`Gemini API error: ${lastErr}`);
}

module.exports = { callGemini };