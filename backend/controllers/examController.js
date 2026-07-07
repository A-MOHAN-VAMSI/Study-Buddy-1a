const examService = require("../services/examService");
const createExam = async (req, res) => {
    console.log("Request Body:", req.body);

    try {
        const result = await examService.createExam(req.body);

        res.status(201).json({
            success: true,
            ...result
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getAllExams = async (req, res) => {
    try {
        const exams = await examService.getAllExams();
        res.json({
            success: true,
            exams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteExam = async (req, res) => {
  try {
    await examService.deleteExam(req.params.id);
    res.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateExam = async (req, res) => {
  try {
    await examService.updateExam(req.params.id, req.body);

    res.json({
      success: true,
      message: "Exam updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
    createExam,
    getAllExams,
    deleteExam,
    updateExam,
};