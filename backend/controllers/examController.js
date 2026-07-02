const examService = require("../services/examService");

const createExam = async (req, res) => {
    try {

        const result = await examService.createExam(req.body);

        res.status(201).json({
            success: true,
            ...result
        });

    } catch (error) {

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

module.exports = {
    createExam,
    getAllExams
};