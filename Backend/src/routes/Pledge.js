const express = require("express");
const router = express.Router();
const Pledge = require("../models/pledge.model");
const verifyToken = require("../Middlware/auth.middlware");
router.get("/", async (re, res) => {
  try {
    const pledge = await Pledge.find().sort({ createdAt: -1 }).limit(30);

    const pledges = await Pledge.find();
    const total = pledges.reduce((sum,p)=> sum + p.pledge.length,0)
    res.json({ pledges: pledge, total });
  } catch (err) {
    console.error("Could not fetch pledge", err);
  }
});

router.post("/",verifyToken, async (req, res) => {
  console.log(req.body);

  try {
    const { pledge } = req.body;
    const name = req.user.name
    if (!name || !pledge || pledge.length === 0) {
      return res.status(400).json({
        message: "Pledge cannot be Empty",
      });
    }
    const newPledge = new Pledge({ name, pledge });
    await newPledge.save();

    res.status(201).json({
      message: "Pledge saved 🌿 thank for caring our planet",
      pledge: newPledge,
    });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
