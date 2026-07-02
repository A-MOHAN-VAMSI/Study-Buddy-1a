function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 50px)",
        gap: "10px",
        marginTop: "30px",
      }}
    >
      {Array.from({ length: totalQuestions }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentQuestion(index)}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor:
              currentQuestion === index ? "#2563eb" : "#d1d5db",
            color: currentQuestion === index ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default QuestionNavigation;