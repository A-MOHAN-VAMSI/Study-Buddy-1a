const db = require("../config/db");

const createExam = async (examData) => {
    const {
        title,
        description,
        duration,
        total_marks,
        start_time,
        end_time,
        created_by
    } = examData;

    const [result] = await db.query(
        `INSERT INTO exams
        (title, description, duration, total_marks, start_time, end_time, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            duration,
            total_marks,
            start_time,
            end_time,
            created_by
        ]
    );

    return {
        message: "Exam Created Successfully",
        examId: result.insertId
    };
};

module.exports = {
    createExam
};