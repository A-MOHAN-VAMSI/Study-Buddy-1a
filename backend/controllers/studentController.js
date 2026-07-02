const studentService = require("../services/studentService");

const getAllExams = async (req, res) => {
    try {
        const exams = await studentService.getAllExams();

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
const startExam = async (req, res) => {

    try {

        const examId = req.params.id;

        const questions = await studentService.startExam(examId);

        res.json({
            success: true,
            questions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const submitExam = async (req, res) => {

    try {

        const studentId = req.user.id;
        const { exam_id, answers } = req.body;

        const result = await studentService.submitExam(
            studentId,
            exam_id,
            answers
        );

        res.json({
            success: true,
            message: "Exam Submitted Successfully",
            result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getAllExams,
    startExam,
    submitExam
};