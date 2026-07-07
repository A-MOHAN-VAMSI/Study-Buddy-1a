const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  deleteStudent,
} = require("../controllers/studentController");

router.get("/", getAllStudents);

router.delete("/:id", deleteStudent);

module.exports = router;