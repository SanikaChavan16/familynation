const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: String, default: "Anonymous" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Journal", JournalSchema);
