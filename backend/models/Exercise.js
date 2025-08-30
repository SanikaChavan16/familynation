const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  steps: [{ type: String, required: true }]
  // ❌ remove completed: true
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
