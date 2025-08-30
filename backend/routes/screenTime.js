const express = require("express");
const router = express.Router();
const ScreenTime = require("../models/ScreenTime");

// ✅ Seed demo strategies
router.get("/seed", async (req, res) => {
  await ScreenTime.deleteMany({});
  await ScreenTime.insertMany([
    {
      title: "Set Clear Limits",
      description: "Establish consistent rules about when screens must be turned off.",
      tips: [
        "No devices 1 hour before bed.",
        "Use a family charging station in the living room.",
        "Set parental controls to automatically lock devices."
      ]
    },
    {
      title: "Offer Calming Alternatives",
      description: "Replace screen time with soothing, non-digital activities.",
      tips: [
        "Encourage reading bedtime stories.",
        "Introduce drawing or journaling.",
        "Play calming music together."
      ]
    },
    {
      title: "Model Healthy Habits",
      description: "Lead by example by reducing your own screen use in the evening.",
      tips: [
        "Put your phone away after dinner.",
        "Spend family time together without screens.",
        "Show kids how to wind down without devices."
      ]
    }
  ]);
  res.send("✅ Screen time strategies seeded");
});

// ✅ Get all strategies
router.get("/", async (req, res) => {
  try {
    const strategies = await ScreenTime.find();
    res.json(strategies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch screen time strategies" });
  }
});

module.exports = router;
