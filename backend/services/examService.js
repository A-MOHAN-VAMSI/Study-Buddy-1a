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
const getAllExams = async () => {
    const [rows] = await db.query(
        "SELECT * FROM exams ORDER BY id DESC"
    );

    return rows;
};
const deleteExam = async (id) => {
  await db.query(
    "DELETE FROM exams WHERE id = ?",
    [id]
  );
};
const updateExam = async (id, examData) => {
  const {
    title,
    description,
    duration,
    total_marks,
    start_time,
    end_time,
  } = examData;

  await db.query(
    `UPDATE exams
     SET
       title=?,
       description=?,
       duration=?,
       total_marks=?,
       start_time=?,
       end_time=?
     WHERE id=?`,
    [
      title,
      description,
      duration,
      total_marks,
      start_time,
      end_time,
      id,
    ]
  );
};
module.exports = {
    createExam,
    getAllExams,
    deleteExam,
    updateExam,
};