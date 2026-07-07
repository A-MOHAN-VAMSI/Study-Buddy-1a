import { useEffect, useState } from "react";
import axios from "axios";
function ManageExams() {
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  title: "",
  description: "",
  duration: "",
  total_marks: "",
  start_time: "",
  end_time: "",
});
  useEffect(() => {
    fetchExams();
}, []);
useEffect(() => {
  console.log("Current exams:", exams);
}, [exams]);

const fetchExams = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/exams");

    console.log("API Response:", res.data);

    setExams(res.data.exams);

  } catch (err) {
    console.error(err);
  }
};
const deleteExam = async (id) => {
  if (!window.confirm("Delete this exam?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/exams/${id}`);

    fetchExams();
  } catch (err) {
    console.error(err);
  }
};
const createExam = async () => {
  try {
    await axios.post("http://localhost:5000/api/exams", {
  title: formData.title,
  description: formData.description,
  duration: formData.duration,
  total_marks: formData.total_marks,
  start_time: formData.start_time,
  end_time: formData.end_time,
  created_by: 1,
});

    fetchExams();

    setShowModal(false);

    setFormData({
      title: "",
      description: "",
      duration: "",
      total_marks: "",
      start_time: "",
      end_time: "",
    });

  } catch (err) {
    console.error(err);
  }
};
const editExam = (exam) => {
  setIsEditing(true);
  setEditingId(exam.id);

  setFormData({
    title: exam.title,
    description: exam.description,
    duration: exam.duration,
    total_marks: exam.total_marks,
    start_time: exam.start_time?.slice(0, 16),
    end_time: exam.end_time?.slice(0, 16),
  });

  setShowModal(true);
};
const updateExam = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/exams/${editingId}`,
      formData
    );

    fetchExams();

    setShowModal(false);

    setIsEditing(false);

    setEditingId(null);

  } catch (err) {
    console.error(err);
  }
};
  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>Manage Exams</h1>
        <button
  onClick={() => setShowModal(true)}
  style={{
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  + Add New Exam
</button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Exam Name</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Subject</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Duration</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
  {exams.map((exam) => (
    <tr key={exam.id}>
  <td style={{ padding: "16px" }}>{exam.title}</td>
  <td style={{ padding: "16px" }}>{exam.description}</td>
  <td style={{ padding: "16px" }}>{exam.duration} mins</td>

  <td style={{ padding: "16px" }}>
    <button
  onClick={() => editExam(exam)}
>
  Edit
</button>

    <button
      onClick={() => deleteExam(exam.id)}
      style={{ marginLeft: "10px" }}
    >
      Delete
    </button>
  </td>
</tr>
  ))}
</tbody>
        </table>
      </div>
      {showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        width: "450px",
        borderRadius: "12px",
      }}
    >
      <h2>Add New Exam</h2>

      <input
        placeholder="Exam Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Duration"
        value={formData.duration}
        onChange={(e) =>
          setFormData({
            ...formData,
            duration: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Total Marks"
        value={formData.total_marks}
        onChange={(e) =>
          setFormData({
            ...formData,
            total_marks: e.target.value,
          })
        }
      />

      <br />
      <br />

      <label>Start Time</label>

      <input
        type="datetime-local"
        value={formData.start_time}
        onChange={(e) =>
          setFormData({
            ...formData,
            start_time: e.target.value,
          })
        }
      />

      <br />
      <br />

      <label>End Time</label>

      <input
        type="datetime-local"
        value={formData.end_time}
        onChange={(e) =>
          setFormData({
            ...formData,
            end_time: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button
  onClick={isEditing ? updateExam : createExam}
>
  {isEditing ? "Update Exam" : "Create Exam"}
</button>

      <button
        onClick={() => {
  setShowModal(false);
  setIsEditing(false);
  setEditingId(null);
}}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default ManageExams
