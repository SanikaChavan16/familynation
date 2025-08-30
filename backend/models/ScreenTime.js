const mongoose = require("mongoose");

const ScreenTimeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tips: [{ type: String, required: true }] // multiple actionable tips
});

module.exports = mongoose.model("ScreenTime", ScreenTimeSchema);
