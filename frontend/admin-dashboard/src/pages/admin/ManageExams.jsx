import { useNavigate } from 'react-router-dom'

function ManageExams() {
  const navigate = useNavigate()

  const exams = [
    { id: 1, name: 'Math Test', subject: 'Mathematics', duration: '60 mins' },
    { id: 2, name: 'Science Quiz', subject: 'Science', duration: '45 mins' },
    { id: 3, name: 'English Test', subject: 'English', duration: '30 mins' },
  ]

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
            {exams.map((exam, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', fontWeight: '500' }}>{exam.name}</td>
                <td style={{ padding: '16px', color: '#64748b' }}>{exam.subject}</td>
                <td style={{ padding: '16px', color: '#64748b' }}>{exam.duration}</td>
                <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                  <button style={{ backgroundColor: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '500' }}>Edit</button>
                  <button style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                  <button
                    onClick={() => navigate(`/admin/analytics/${exam.id}`)}
                    style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    📊 Analytics
                  </button>
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
