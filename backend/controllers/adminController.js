const db = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const [[exam]] = await db.query(
      "SELECT COUNT(*) AS total FROM exams"
    );

    const [[student]] = await db.query(
      "SELECT COUNT(*) AS total FROM users WHERE role='student'"
    );

    const [[question]] = await db.query(
      "SELECT COUNT(*) AS total FROM questions"
    );

    const [[result]] = await db.query(
      "SELECT COUNT(*) AS total FROM results"
    );

    res.json({
      success: true,
      totalExams: exam.total,
      totalStudents: student.total,
      totalQuestions: question.total,
      publishedResults: result.total,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
};