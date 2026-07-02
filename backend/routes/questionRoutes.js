const express = require("express");
const router = express.Router();

const { createQuestion } = require("../controllers/questionController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createQuestion);

module.exports = router;