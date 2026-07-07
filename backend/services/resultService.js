const db = require("../config/db");

// Get student's result history
const getStudentResults = async (studentId) => {
    const [rows] = await db.query(
        `SELECT r.id, r.exam_id, e.title AS exam_title, r.score, r.percentage, r.submitted_at
         FROM results r
         JOIN exams e ON r.exam_id = e.id
         WHERE r.student_id = ?
         ORDER BY r.submitted_at DESC`,
        [studentId]
    );
    return rows;
};

// Get single result details (for PDF or detail view)
const getResultDetail = async (resultId) => {
    const [rows] = await db.query(
        `SELECT u.name AS student_name, e.title AS exam_title, r.score, r.percentage, r.submitted_at
         FROM results r
         JOIN users u ON r.student_id = u.id
         JOIN exams e ON r.exam_id = e.id
         WHERE r.id = ?`,
        [resultId]
    );
    return rows.length > 0 ? rows[0] : null;
};

// Get aggregate analytics for a given exam
const getExamAnalytics = async (examId) => {
    const [rows] = await db.query(
        `SELECT percentage FROM results WHERE exam_id = ?`,
        [examId]
    );

    const totalAttempts = rows.length;
    let passCount = 0;
    let failCount = 0;
    let totalPercentage = 0;

    const distribution = {
        "0-20": 0,
        "20-40": 0,
        "40-60": 0,
        "60-80": 0,
        "80-100": 0
    };

    for (const row of rows) {
        const pct = row.percentage;
        totalPercentage += pct;

        if (pct >= 40) {
            passCount++;
        } else {
            failCount++;
        }

        if (pct >= 0 && pct <= 20) {
            distribution["0-20"]++;
        } else if (pct > 20 && pct <= 40) {
            distribution["20-40"]++;
        } else if (pct > 40 && pct <= 60) {
            distribution["40-60"]++;
        } else if (pct > 60 && pct <= 80) {
            distribution["60-80"]++;
        } else if (pct > 80) {
            distribution["80-100"]++;
        }
    }

    const avgPercentage =
        totalAttempts > 0
            ? parseFloat((totalPercentage / totalAttempts).toFixed(2))
            : 0;

    return {
        totalAttempts,
        passCount,
        failCount,
        avgPercentage,
        scoreDistribution: [
            { name: "0-20%",   count: distribution["0-20"] },
            { name: "20-40%",  count: distribution["20-40"] },
            { name: "40-60%",  count: distribution["40-60"] },
            { name: "60-80%",  count: distribution["60-80"] },
            { name: "80-100%", count: distribution["80-100"] }
        ]
    };
};

module.exports = {
    getStudentResults,
    getResultDetail,
    getExamAnalytics
};
