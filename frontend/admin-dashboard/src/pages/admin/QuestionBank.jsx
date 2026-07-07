import { useEffect, useState } from "react";
import axios from "axios";

function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [exams, setExams] = useState([]);

  const [formData, setFormData] = useState({
    exam_id: "",
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
    marks: 1,
  });

  useEffect(() => {
    fetchQuestions();
    fetchExams();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/questions"
      );

      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
    }
  };
 

const editQuestion = (question) => {
  setEditingId(question.id);

  setFormData({
    exam_id: question.exam_id,
    question: question.question,
    option_a: question.option_a,
    option_b: question.option_b,
    option_c: question.option_c,
    option_d: question.option_d,
    correct_answer: question.correct_answer,
    marks: question.marks,
  });
};

  const fetchExams = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/exams"
      );

      setExams(res.data.exams);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addQuestion = async () => {
  try {
    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/questions/${editingId}`,
        formData
      );

      alert("Question Updated Successfully");
    } else {
      await axios.post(
        "http://localhost:5000/api/questions",
        formData
      );

      alert("Question Added Successfully");
    }

    setEditingId(null);

    setFormData({
      exam_id: "",
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
      marks: 1,
    });

    fetchQuestions();

  } catch (err) {
    console.error(err);
    alert("Operation Failed");
  }
};

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/questions/${id}`
      );

      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };
    return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>
        Question Bank
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >
        <h3>Add New Question</h3>

        <select
          name="exam_id"
          value={formData.exam_id}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            marginBottom: "12px",
          }}
        >
          <option value="">Select Exam</option>

          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>

        <input
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <input
          name="option_a"
          placeholder="Option A"
          value={formData.option_a}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <input
          name="option_b"
          placeholder="Option B"
          value={formData.option_b}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <input
          name="option_c"
          placeholder="Option C"
          value={formData.option_c}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <input
          name="option_d"
          placeholder="Option D"
          value={formData.option_d}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <select
          name="correct_answer"
          value={formData.correct_answer}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <option value="A">Correct Answer : A</option>
          <option value="B">Correct Answer : B</option>
          <option value="C">Correct Answer : C</option>
          <option value="D">Correct Answer : D</option>
        </select>

        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          placeholder="Marks"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={addQuestion}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {editingId ? "Update Question" : "Add Question"}
        </button>
      
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ padding: "16px" }}>#</th>
              <th style={{ padding: "16px" }}>Question</th>
              <th style={{ padding: "16px" }}>Correct</th>
              <th style={{ padding: "16px" }}>Marks</th>
              <th style={{ padding: "16px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td style={{ padding: "16px" }}>
                  {index + 1}
                </td>

                <td style={{ padding: "16px" }}>
                  {question.question}
                </td>

                <td style={{ padding: "16px" }}>
                  {question.correct_answer}
                </td>

                <td style={{ padding: "16px" }}>
                  {question.marks}
                </td>

                <td style={{ padding: "16px" }}>
  <button
    onClick={() => editQuestion(question)}
    style={{
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "10px",
    }}
  >
    Edit
  </button>

  <button
    onClick={() => deleteQuestion(question.id)}
    style={{
      background: "#ef4444",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>
              </tr>
            ))}

            {questions.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  No Questions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuestionBank;