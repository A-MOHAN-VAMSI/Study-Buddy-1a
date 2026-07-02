const express = require("express");
const router = express.Router();

const {
    createExam,
    getAllExams
} = require("../controllers/examController");

const verifyToken = require("../middleware/authMiddleware");

router.get("/", getAllExams);

router.post("/", verifyToken, createExam);

module.exports = router;