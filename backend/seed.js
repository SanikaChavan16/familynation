// backend/seed.js
const mongoose = require("mongoose");
const Exercise = require("./models/Exercise"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/familynation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const exercises = [
  {
    title: "Active Listening Exercise",
    steps: [
      "One partner speaks for 2 minutes without interruption",
      "Other partner listens attentively",
      "Switch roles and repeat",
    ],
  },
  {
    title: "I Feel Statements",
    steps: [
      "Say 'I feel...' instead of blaming",
      "Encourage empathy by listening",
      "Take turns expressing feelings",
    ],
  },
];

async function seedData() {
  try {
    await Exercise.deleteMany(); // clear old data
    await Exercise.insertMany(exercises);
    console.log("✅ Sample exercises added!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedData();
