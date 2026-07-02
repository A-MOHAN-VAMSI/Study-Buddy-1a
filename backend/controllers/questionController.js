const questionService = require("../services/questionService");

const createQuestion = async (req, res) => {

    try {

        const result = await questionService.createQuestion(req.body);

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

module.exports = {
    createQuestion
};