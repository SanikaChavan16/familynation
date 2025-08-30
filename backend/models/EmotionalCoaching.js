const mongoose = require("mongoose");

const EmotionalCoachingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [{ type: String, required: true }]
});

module.exports = mongoose.model("EmotionalCoaching", EmotionalCoachingSchema);
