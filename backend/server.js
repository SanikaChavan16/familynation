const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () =>
  console.log("✅ MongoDB connected")
);

// Routes
const exercisesRoute = require("./routes/exercises");
app.use("/api/exercises", exercisesRoute);

const childcareRoutes = require("./routes/childcare");
app.use("/api/childcare", childcareRoutes);

const workBoundariesRoutes = require("./routes/workBoundaries");
app.use("/api/work-boundaries", workBoundariesRoutes);

const emotionalCoachingRoutes = require("./routes/emotionalCoaching");
app.use("/api/emotional-coaching", emotionalCoachingRoutes);

const tasksRoutes = require("./routes/tasks");
app.use("/api/tasks", tasksRoutes);

const conflictRoutes = require("./routes/conflictResolution");
app.use("/api/conflict-resolution", conflictRoutes);

const journalRoutes = require("./routes/journals");
app.use("/api/journals", journalRoutes);

const progressRoutes = require("./routes/progress");
app.use("/api/progress", progressRoutes);

const expertRoutes = require("./routes/experts");
app.use("/api/experts", expertRoutes);

const screenTimeRoutes = require("./routes/screenTime");
app.use("/api/screen-time", screenTimeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
