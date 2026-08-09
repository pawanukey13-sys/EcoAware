// backend/routes/ecobot.js
const express = require('express');
const router = express.Router();
const { buildExplainGraphPrompt,buildFollowUpPrompt } = require('../services/promptBuilder');
const {callGemini} = require("../services/llmservice")

router.post('/explain-graph', async (req, res) => {
  try {
    const { metric, unit, data } = req.body;

    if (!metric || !unit || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'metric, unit, and data[] are required' });
    }

    const prompt = buildExplainGraphPrompt({ metric, unit, data });
    const explanation = await callGemini(prompt);

    res.json({ explanation });
  } catch (err) {
    console.error('EcoBot explain-graph error:', err);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
});
router.post('/ask', async (req, res) => {
  try {
    const { metric, unit, data, question, history } = req.body;

    if (!metric || !unit || !Array.isArray(data) || !question) {
      return res.status(400).json({ error: 'metric, unit, data[], and question are required' });
    }

    const prompt = buildFollowUpPrompt({ metric, unit, data, question, history });
    const answer = await callGemini(prompt);

    res.json({ answer });
  } catch (err) {
    console.error('EcoBot ask error:', err);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
});

module.exports = router;