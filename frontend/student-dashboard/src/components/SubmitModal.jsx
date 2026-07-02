function SubmitModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2>Submit Exam</h2>

        <p>Are you sure you want to submit the exam?</p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={onCancel}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitModal;