const express = require("express");
const router = express.Router();
const Expert = require("../models/Expert");

// ✅ Seed sample experts
router.get("/seed", async (req, res) => {
  await Expert.deleteMany({});
  await Expert.insertMany([
    { name: "Dr. Sarah Johnson", specialty: "Parenting & Child Behavior", availability: "Available", contact: "sarah.johnson@example.com" },
    { name: "Michael Lee", specialty: "Stress & Anxiety Coach", availability: "Busy", contact: "michael.lee@example.com" },
    { name: "Priya Sharma", specialty: "Family Therapist", availability: "Available", contact: "priya.sharma@example.com" },
  ]);
  res.send("✅ Experts seeded");
});

// ✅ Get all experts
router.get("/", async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch experts" });
  }
});

module.exports = router;
