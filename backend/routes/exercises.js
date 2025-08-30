const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// ✅ Seed demo exercises
router.get("/seed", async (req, res) => {
  await Exercise.deleteMany({});
  await Exercise.insertMany([
    {
      title: "Morning Calm Start",
      steps: [
        "Begin with a deep breath together.",
        "Use calm tones when asking kids to get ready.",
        "Offer limited breakfast choices to avoid arguments.",
        "Praise cooperation with positive reinforcement."
      ]
    },
    {
      title: "Teamwork Morning Routine",
      steps: [
        "Assign small tasks (set table, pack bag).",
        "Encourage teamwork — remind kids that mornings are smoother when everyone helps.",
        "Celebrate small wins (high five, thank you)."
      ]
    }
  ]);
  res.send("✅ Communication exercises seeded");
});

// ✅ Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// ✅ Mark exercise as completed
// router.patch("/:id/complete", async (req, res) => {
//   try {
//     const exercise = await Exercise.findByIdAndUpdate(
//       req.params.id,
//       { completed: true },
//       { new: true }
//     );
//     res.json(exercise);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to mark as completed" });
//   }
// });

module.exports = router;
