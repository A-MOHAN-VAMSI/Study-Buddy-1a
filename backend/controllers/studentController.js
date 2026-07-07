const studentService = require("../services/studentService");

// Get Students
const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();

    res.json({
      success: true,
      students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);

    res.json({
      success: true,
      message: "Student Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllStudents,
  deleteStudent,
};