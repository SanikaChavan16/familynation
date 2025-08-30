const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },   // YYYY-MM-DD
  time: { type: String, required: true },   // HH:mm
  category: { type: String, default: "General" } // Work / Family
});

module.exports = mongoose.model("Task", TaskSchema);
