const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.model");

router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || message.trim() == "") {
      return res.status(401).json({ message: "Message cannot be empty" });
    }
    if (!sessionId) {
      return res.status(401).json({ message: "Message cannot be empty" });
    }
    let chat = await Chat.findOne({ sessionId });
    if (!chat) {
      chat = new Chat({ sessionId, message: [] });
    }
    chat.message.push({ role: "user", content: message });

    const geminiHistory = chat.message.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `You are EcoBot, a friendly environmental awareness assistant for the EcoAware project.
Your role is to educate people about:
- Climate change and global warming
- Deforestation and forest loss
- Plastic pollution and ocean damage
- Biodiversity loss and endangered species
- Practical eco-friendly actions people can take

Rules:
- Keep answers short (5-8 sentences max) and simple
- Use emojis occasionally to make responses friendly
- Always end with one actionable tip
- If asked something unrelated to environment, politely redirect
- Be encouraging, never preachy or scary`,
              },
            ],
          },
          // Conversation history
          contents: geminiHistory.slice(-6),
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            thinkingConfig: {
              thinkingLevel: "minimal",
            },
          },
        }),
      },
    );
    console.log("History length:", geminiHistory.length);
console.log(JSON.stringify(geminiHistory, null, 2));
    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemine API error ", errData);
      return res.status(500).json({
        error: "API Error occured",
      });
    }
    const data = await response.json();
    console.log(data); // See the complete response
    const reply = data.candidates[0].content.parts[0].text;
    console.log(reply); // ✅ This prints the AI response
    chat.message.push({ role: "assistant", content: reply });
    await chat.save();
    res.json({ reply });
  } catch (error) {
    console.error("An error occured", error);
    res.status(500).json({ error: "Server error. Please try again later" });
  }
});

module.exports = router;
