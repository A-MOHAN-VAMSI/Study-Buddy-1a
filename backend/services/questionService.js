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
    marks,
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
      marks,
    ]
  );

  return {
    message: "Question Added Successfully",
    questionId: result.insertId,
  };
};

const getAllQuestions = async () => {
  const [rows] = await db.query(
    "SELECT * FROM questions ORDER BY id DESC"
  );

  return rows;
};

const deleteQuestion = async (id) => {
  await db.query(
    "DELETE FROM questions WHERE id = ?",
    [id]
  );
};
const updateQuestion = async (id, questionData) => {
  const {
    exam_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    marks,
  } = questionData;

  await db.query(
    `UPDATE questions
     SET
       exam_id=?,
       question=?,
       option_a=?,
       option_b=?,
       option_c=?,
       option_d=?,
       correct_answer=?,
       marks=?
     WHERE id=?`,
    [
      exam_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      marks,
      id,
    ]
  );
};
module.exports = {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
    updateQuestion,
};