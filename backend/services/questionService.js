const db = require("../config/db");
const createQuestion = async (questionData) => {
    const {
    exam_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    marks
} = questionData;
    const [result] = await db.query(
        `INSERT INTO questions
        (exam_id, question, option_a, option_b, option_c, option_d, correct_answer, marks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            exam_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            marks
        ]
    );
    return {
        message: "Question Added Successfully",
        questionId: result.insertId
    };
};
module.exports = {
    createQuestion
};