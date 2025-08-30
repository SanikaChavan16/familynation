const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },  // Parenting, Stress, Family Therapy
  availability: { type: String, default: "Available" }, // Available / Busy
  contact: { type: String, required: true } // email, phone, or chat link
});

module.exports = mongoose.model("Expert", ExpertSchema);
