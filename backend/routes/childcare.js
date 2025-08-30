const express = require("express");
const router = express.Router();
const Childcare = require("../models/Childcare");

// ✅ Seed demo providers
router.get("/seed", async (req, res) => {
  await Childcare.deleteMany({});
  await Childcare.insertMany([
    { name: "Happy Kids Care", address: "123 Main St", city: "Pune", rating: 4.5, contact: "9876543210" },
    { name: "Bright Future Childcare", address: "45 Sunshine Rd", city: "Pune", rating: 4.2, contact: "9822334455" },
    { name: "Little Stars Academy", address: "67 Park Lane", city: "Mumbai", rating: 4.7, contact: "9811122233" },
    { name: "Rainbow Playhouse", address: "89 Central Ave", city: "Delhi", rating: 4.1, contact: "9844456677" }
  ]);
  res.send("✅ Childcare providers seeded");
});

// ✅ Get providers by city
router.get("/:city", async (req, res) => {
  try {
    const providers = await Childcare.find({ city: req.params.city });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch childcare providers" });
  }
});

module.exports = router;
