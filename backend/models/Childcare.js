const mongoose = require("mongoose");

const ChildcareSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  rating: Number,
  contact: String
});

module.exports = mongoose.model("Childcare", ChildcareSchema);
