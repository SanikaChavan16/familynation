const express = require("express");
const router = express.Router();
const WorkBoundary = require("../models/WorkBoundary");

// Seed example if DB is empty
router.get("/seed", async (req, res) => {
  await WorkBoundary.deleteMany({});
  await WorkBoundary.insertMany([
    {
      title: "Quiet Zone Rule",
      description: "Set clear rules that during client calls, kids should avoid interruptions by creating a 'quiet zone' at home."
    },
    {
      title: "Reward System",
      description: "Give kids small rewards (like extra playtime) if they respect your work boundaries."
    },
    {
      title: "Visual Cues",
      description: "Place a sign outside your workspace like 'In a Meeting' to remind kids not to disturb."
    }
  ]);
  res.send("✅ Work Boundaries seeded");
});

// Get all tips
router.get("/", async (req, res) => {
  try {
    const tips = await WorkBoundary.find();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch work boundaries" });
  }
});

module.exports = router;
