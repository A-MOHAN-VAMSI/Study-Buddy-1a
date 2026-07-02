import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          Online Examination Portal
        </h1>

        <h2>Welcome, Student 👋</h2>

        <p style={{ color: "#555" }}>
          Ready to test your knowledge? Read the instructions carefully before
          starting the exam.
        </p>

        <hr />

        <h2 style={{ color: "#2563eb" }}>Java Programming Test</h2>

        <p>
          <strong>Duration:</strong> 30 Minutes
        </p>

        <p>
          <strong>Total Questions:</strong> 20
        </p>

        <p>
          <strong>Total Marks:</strong> 20
        </p>

        <p>
          <strong>Difficulty:</strong> Medium
        </p>

        <button
          onClick={() => navigate("/exam")}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Start Exam
        </button>

        <hr style={{ margin: "30px 0" }} />

        <h3>Exam Instructions</h3>

        <ul style={{ lineHeight: "2" }}>
          <li>Total Questions: 20</li>
          <li>Each question carries 1 mark.</li>
          <li>No negative marking.</li>
          <li>Timer starts immediately after clicking Start Exam.</li>
          <li>Exam will auto-submit when the timer reaches zero.</li>
          <li>Do not refresh the browser during the exam.</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;