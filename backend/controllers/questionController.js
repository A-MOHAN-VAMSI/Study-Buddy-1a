const questionService = require("../services/questionService");

const createQuestion = async (req, res) => {
  try {
    const result = await questionService.createQuestion(req.body);

    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await questionService.deleteQuestion(req.params.id);

    res.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateQuestion = async (req, res) => {
  try {
    await questionService.updateQuestion(req.params.id, req.body);

    res.json({
      success: true,
      message: "Question Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
};
