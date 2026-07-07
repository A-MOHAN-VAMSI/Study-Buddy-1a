const express = require("express");
const router = express.Router();

const {
  createExam,
  getAllExams,
  deleteExam,
  updateExam,
} = require("../controllers/examController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", getAllExams);

router.post("/", createExam);

router.delete("/:id", deleteExam);

router.put("/:id", updateExam);

module.exports = router;