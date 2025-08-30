const mongoose = require("mongoose");

const ConflictResolutionSchema = new mongoose.Schema({
  ageGroup: { type: String, required: true },  // e.g., "5-8 years", "9-12 years", "Teens"
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [{ type: String, required: true }]
});

module.exports = mongoose.model("ConflictResolution", ConflictResolutionSchema);
