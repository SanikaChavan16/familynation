const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  title: { type: String, required: true },   // e.g., "Conflict-free weekend"
  date: { type: Date, default: Date.now },
  category: { type: String, default: "General" } // Family, Work, Kids, etc.
});

module.exports = mongoose.model("Progress", ProgressSchema);
