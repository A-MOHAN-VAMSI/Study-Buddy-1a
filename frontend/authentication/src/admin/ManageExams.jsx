import { useEffect, useState } from "react";
import axios from "axios";
function ManageExams() {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetchExams();
}, []);

const fetchExams = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/exams");

    console.log("Response:", res.data);

    setExams(res.data.exams);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>Manage Exams</h1>
        <button style={{
          backgroundColor: '#3b82f6', color: '#fff',
          border: 'none', borderRadius: '10px',
          padding: '10px 20px', cursor: 'pointer', fontWeight: '600'
        }}>+ Add New Exam</button>
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
      <td>{exam.title}</td>
      <td>{exam.description}</td>
      <td>{exam.duration} mins</td>

      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageExams
