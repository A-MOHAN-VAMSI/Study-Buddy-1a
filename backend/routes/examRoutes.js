const express = require("express");
const router = express.Router();

const { createExam } = require("../controllers/examController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createExam);

module.exports = router;