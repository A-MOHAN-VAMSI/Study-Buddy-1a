const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
    getAllExams,
    startExam,
    submitExam
} = require("../controllers/studentController");

router.get("/exams", verifyToken, getAllExams);
router.get("/exam/:id", verifyToken, startExam);
router.post("/submit", verifyToken, submitExam);

module.exports = router;