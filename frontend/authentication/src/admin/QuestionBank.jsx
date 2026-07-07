function QuestionBank() {
  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Question Bank</h1>

      <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Add New Question</h3>
        <input placeholder="Enter your question here..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px', fontSize: '14px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <input placeholder="Option A" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
          <input placeholder="Option B" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
          <input placeholder="Option C" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
          <input placeholder="Option D" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
            <option>Correct Answer: A</option>
            <option>Correct Answer: B</option>
            <option>Correct Answer: C</option>
            <option>Correct Answer: D</option>
          </select>
          <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', cursor: 'pointer', fontWeight: '600' }}>Add Question</button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b' }}>#</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b' }}>Question</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b' }}>Correct Answer</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#64748b' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: '1px solid #f1f5f9' }}>
              <td style={{ padding: '16px', color: '#64748b' }}>1</td>
              <td style={{ padding: '16px', fontWeight: '500' }}>What is 2 + 2?</td>
              <td style={{ padding: '16px' }}><span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>B (4)</span></td>
              <td style={{ padding: '16px' }}><button style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '500' }}>Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuestionBank
