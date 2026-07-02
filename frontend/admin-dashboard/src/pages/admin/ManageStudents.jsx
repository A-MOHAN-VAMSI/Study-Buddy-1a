function ManageStudents() {
  const students = [
    { name: 'Rahul Sharma', email: 'rahul@test.com', exams: 3 },
    { name: 'Priya Singh', email: 'priya@test.com', exams: 2 },
    { name: 'Amit Verma', email: 'amit@test.com', exams: 5 },
  ]

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Manage Students</h1>

      <div style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Exams Taken</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                      {s.name[0]}
                    </div>
                    <span style={{ fontWeight: '500' }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#64748b' }}>{s.email}</td>
                <td style={{ padding: '16px' }}><span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>{s.exams} exams</span></td>
                <td style={{ padding: '16px' }}><button style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '500' }}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageStudents
