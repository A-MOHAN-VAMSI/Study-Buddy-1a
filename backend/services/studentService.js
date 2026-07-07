const db = require("../config/db");

// Get all students
const getAllStudents = async () => {
  const [rows] = await db.query(
    `SELECT id, name, email, created_at
     FROM users
     WHERE role='student'
     ORDER BY id DESC`
  );

  return rows;
};

// Delete student
const deleteStudent = async (id) => {
  await db.query(
    "DELETE FROM users WHERE id=? AND role='student'",
    [id]
  );
};

module.exports = {
  getAllStudents,
  deleteStudent,
};