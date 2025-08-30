const express = require("express");
const router = express.Router();
const EmotionalCoaching = require("../models/EmotionalCoaching");

// ✅ Seed route (use once to insert demo data)
router.get("/seed", async (req, res) => {
  try {
    await EmotionalCoaching.deleteMany({});
    await EmotionalCoaching.insertMany([
      {
        title: "Deep Breathing",
        description: "Help children calm down using breathing techniques.",
        steps: [
          "Sit comfortably with your child.",
          "Inhale slowly for 4 seconds.",
          "Hold breath for 2 seconds.",
          "Exhale gently for 6 seconds.",
          "Repeat 5 times together."
        ]
      },
      {
        title: "Feelings Expression",
        description: "Encourage your child to name and validate their feelings.",
        steps: [
          "Ask your child how they feel using simple words.",
          "Listen actively without interrupting.",
          "Say: 'It's okay to feel this way.'",
          "Guide them to think of one positive action they can take."
        ]
      },
      {
        title: "Homework Stress Relief",
        description: "Support children when they feel frustrated with school work.",
        steps: [
          "Take a 5-minute break away from books.",
          "Do a fun activity like stretching or drawing.",
          "Come back and divide homework into small steps.",
          "Praise your child for each completed step."
        ]
      }
    ]);
    res.send("✅ Emotional Coaching modules seeded successfully");
  } catch (err) {
    res.status(500).json({ error: "Failed to seed Emotional Coaching modules" });
  }
});

// ✅ Get all modules
router.get("/", async (req, res) => {
  try {
    const modules = await EmotionalCoaching.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Emotional Coaching modules" });
  }
});

module.exports = router;
