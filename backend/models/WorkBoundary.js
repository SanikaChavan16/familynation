const mongoose = require("mongoose");

const WorkBoundarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("WorkBoundary", WorkBoundarySchema);
