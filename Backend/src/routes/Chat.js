const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.model");

const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-flash-latest"];

const SYSTEM_PROMPT = `You are EcoBot, a friendly environmental awareness assistant for the EcoAware project.
Your role is to educate people about:
- Climate change and global warming
- Deforestation and forest loss
- Plastic pollution and ocean damage
- Biodiversity loss and endangered species
- Practical eco-friendly actions people can take

Rules:
- Keep answers short (5-8 sentences max) and simple
- Use emojis occasionally to make responsive friendly
- Always end with one actionable tip
- If asked something unrelated to environment, politely redirect
- Be encouraging, never preachy or scary`;

async function askGemini(contents) {
  const body = JSON.stringify({
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
  });
  let lastErr = "";

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            signal: AbortSignal.timeout(20000),
          }
        );
        const data = await r.json();

        if (r.ok) {
          const parts = data.candidates?.[0]?.content?.parts || [];
          const text = parts.filter((p) => !p.thought).map((p) => p.text || "").join("").trim();
          if (text) return text;
          lastErr = "Empty reply: " + JSON.stringify(data.candidates?.[0]?.finishReason || data);
          console.error(`Gemini ${model} gave empty reply`, lastErr);
          break; // try next model
        }

        lastErr = JSON.stringify(data);
        console.error(`Gemini ${model} failed (${r.status})`, lastErr);
        if (![429, 500, 503].includes(r.status)) break; // 400/404: next model
        await new Promise((res) => setTimeout(res, 1500));
      } catch (e) {
        lastErr = String(e.message);
        console.error(`Gemini ${model} error:`, lastErr);
      }
    }
  }
  throw new Error(lastErr || "Gemini unavailable");
}

router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }
    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    let chat = await Chat.findOne({ sessionId });
    if (!chat) chat = new Chat({ sessionId, message: [] });
    chat.message.push({ role: "user", content: message });

    let contents = chat.message.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    while (contents.length && contents[0].role !== "user") contents.shift(); // must start with user

    const reply = await askGemini(contents);

    chat.message.push({ role: "assistant", content: reply });
    await chat.save();
    res.json({ reply });
  } catch (error) {
    console.error("EcoBot chat failed:", error.message);
    res.status(503).json({ error: "EcoBot is busy right now. Please try again in a minute." });
  }
});

module.exports = router;