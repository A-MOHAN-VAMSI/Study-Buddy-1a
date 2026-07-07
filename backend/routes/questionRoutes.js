const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");

router.get("/", getAllQuestions);

router.post("/", createQuestion);

router.delete("/:id", deleteQuestion);

router.put("/:id", updateQuestion);

module.exports = router;
