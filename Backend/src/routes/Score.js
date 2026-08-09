const express = require("express");
const router = express.Router();
const score = require("../models/quizscore.model");
const quizscoreModel = require("../models/quizscore.model");
router.get("/leaderboard", async (req, res) => {
  try {
    const score = await quizscoreModel
      .find()
      .sort({ percentage: -1, createdAt: -1 })
      .limit(10);
    res.json(score);
  } catch (err) {
    res.status(500).json({
      error: "could not find score ",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { name, score, total } = req.body;
    if (!name || score === undefined || total === undefined) {
      return res.status(401).json({
        message: "Somehing is missing",
      });
    }
    const newScore = new quizscoreModel({ name, score, total });
    await newScore.save();

    res.status(201).json({
      message: "Score Saved!",
      newScore,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
