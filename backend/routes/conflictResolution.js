const express = require("express");
const router = express.Router();
const ConflictResolution = require("../models/ConflictResolution");

// ✅ Seed demo strategies
router.get("/seed", async (req, res) => {
  await ConflictResolution.deleteMany({});
  await ConflictResolution.insertMany([
    {
      ageGroup: "5-8 years",
      title: "Sharing Toys Peacefully",
      description: "Help young children learn to share and wait their turn.",
      steps: [
        "Encourage kids to use a timer for toy sharing.",
        "Praise them when they wait patiently.",
        "Teach them to ask politely instead of grabbing."
      ]
    },
    {
      ageGroup: "9-12 years",
      title: "Respecting Opinions",
      description: "Guide kids to listen and respect each other’s viewpoints.",
      steps: [
        "Ask each child to take turns speaking.",
        "Remind them not to interrupt.",
        "Help them find a compromise (e.g., alternating activities)."
      ]
    },
    {
      ageGroup: "Teens",
      title: "Negotiating Fairly",
      description: "Encourage teens to resolve disagreements with logic and respect.",
      steps: [
        "Have them write down their feelings before discussing.",
        "Encourage active listening and repeating back what they heard.",
        "Guide them to brainstorm solutions together instead of arguing."
      ]
    }
  ]);
  res.send("✅ Conflict resolution strategies seeded");
});

// ✅ Get all strategies
router.get("/", async (req, res) => {
  try {
    const strategies = await ConflictResolution.find();
    res.json(strategies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conflict resolution strategies" });
  }
});

module.exports = router;
