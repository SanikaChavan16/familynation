const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// ✅ Add progress
router.post("/", async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to add progress" });
  }
});

// ✅ Get all progress
router.get("/", async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

module.exports = router;
