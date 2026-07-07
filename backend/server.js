const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRoutes = require("./routes/questionRoutes");
const studentRoutes = require("./routes/studentRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyToken = require("./middleware/authMiddleware");

// ✅ CORS — allow all three frontend dev servers
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    credentials: true,
}));

app.use(express.json());

// ✅ THEN ALL ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/results", resultRoutes);
// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to StudyBuddy API 🚀",
  });
});
app.get("/api/profile", verifyToken, (req, res) => {

    res.json({

        success: true,

        message: "Protected Route",

        user: req.user

    });

});
// Database Test Route
app.get("/api/health", async (req, res) => {
  try {
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    res.json({
      success: true,
      database: "Connected",
      message: "StudyBuddy Backend is Healthy ✅",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: "Disconnected",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});