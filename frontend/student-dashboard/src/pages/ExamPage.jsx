import { useState } from "react";
import questions from "../data/questions";
import Timer from "../components/Timer";
import QuestionNavigation from "../components/QuestionNavigation";
import SubmitModal from "../components/SubmitModal";

function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const question = questions[currentQuestion];

  const handleSubmit = () => {
    alert("Exam Submitted Successfully!");
    setShowModal(false);

    // Backend aane ke baad yaha submit API call hogi
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
        }}
      >
        Online Examination Portal
      </h1>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Java Programming Test
      </h2>

      {/* Timer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Timer onTimeUp={handleSubmit} />
      </div>

      <hr />

      <h3>
        Question {currentQuestion + 1} / {questions.length}
      </h3>

      <h2>{question.question}</h2>

      {question.options.map((option, index) => (
        <div
          key={index}
          style={{ marginBottom: "15px" }}
        >
          <label style={{ fontSize: "18px" }}>
            <input
              type="radio"
              name="answer"
              style={{ marginRight: "10px" }}
            />
            {option}
          </label>
        </div>
      ))}

      {/* Previous & Next Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "25px",
        }}
      >
        <button
          disabled={currentQuestion === 0}
          onClick={() =>
            setCurrentQuestion(currentQuestion - 1)
          }
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <button
          disabled={
            currentQuestion === questions.length - 1
          }
          onClick={() =>
            setCurrentQuestion(currentQuestion + 1)
          }
          style={{
            padding: "10px 20px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>

      {/* Question Navigation */}
      <div style={{ marginTop: "30px" }}>
        <QuestionNavigation
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>

      {/* Submit Button */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "12px 25px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Exam
        </button>
      </div>

      {/* Submit Modal */}
      <SubmitModal
        isOpen={showModal}
        onConfirm={handleSubmit}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ExamPage;