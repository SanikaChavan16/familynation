const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

// ✅ Create journal entry
router.post("/", async (req, res) => {
  try {
    const journal = new Journal(req.body);
    await journal.save();
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: "Failed to save journal entry" });
  }
});

// ✅ Get all journals (community feed)
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});

// ✅ Like a journal entry
router.post("/:id/like", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ error: "Entry not found" });

    journal.likes += 1;
    await journal.save();
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: "Failed to like entry" });
  }
});

// ✅ Add a comment
router.post("/:id/comment", async (req, res) => {
  try {
    const { user, text } = req.body;
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ error: "Entry not found" });

    journal.comments.push({ user: user || "Anonymous", text });
    await journal.save();
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
