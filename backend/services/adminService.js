const db = require("../config/db");

const getDashboard = async () => {

    const [[exam]] = await db.query(
        "SELECT COUNT(*) total FROM exams"
    );

    const [[student]] = await db.query(
        "SELECT COUNT(*) total FROM users WHERE role='student'"
    );

    const [[question]] = await db.query(
        "SELECT COUNT(*) total FROM questions"
    );

    const [[result]] = await db.query(
        "SELECT COUNT(*) total FROM results"
    );

    return {
        totalExams: exam.total,
        totalStudents: student.total,
        totalQuestions: question.total,
        publishedResults: result.total
    };
};

module.exports = { getDashboard };