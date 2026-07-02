const db = require("../config/db");

const getAllExams = async () => {

    const [rows] = await db.query(`
        SELECT
            id,
            title,
            description,
            duration,
            total_marks,
            start_time,
            end_time
        FROM exams
        ORDER BY id DESC
    `);

    return rows;
};
const startExam = async (examId) => {

    const [questions] = await db.query(
        `SELECT
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            marks
        FROM questions
        WHERE exam_id = ?`,
        [examId]
    );

    return questions;
};
const submitExam = async (studentId, examId, answers) => {

    let score = 0;
    let totalMarks = 0;

    for (const answer of answers) {

        // Save student's answer
        await db.query(
    `INSERT INTO student_answers
    (student_id, question_id, selected_answer)
    VALUES (?, ?, ?)`,
    [
        studentId,
        answer.question_id,
        answer.selected_option
    ]
);

        // Get correct answer
        const [question] = await db.query(
            `SELECT correct_answer, marks
             FROM questions
             WHERE id = ?`,
            [answer.question_id]
        );

        if (question.length > 0) {

            totalMarks += question[0].marks;

            if (question[0].correct_answer === answer.selected_option) {
                score += question[0].marks;
            }
        }
    }

    const percentage = (score / totalMarks) * 100;

    await db.query(
    `INSERT INTO results
    (student_id, exam_id, score, percentage)
    VALUES (?, ?, ?, ?)`,
    [
        studentId,
        examId,
        score,
        percentage
    ]
);

    return {
        score,
        totalMarks,
        percentage
    };
};

module.exports = {
    getAllExams,
    startExam,
    submitExam
};