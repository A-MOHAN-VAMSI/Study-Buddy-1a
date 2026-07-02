function AdminHome() {
  const cards = [
    { label: 'Total Exams', value: '5', color: '#3b82f6', icon: '📝' },
    { label: 'Total Students', value: '120', color: '#10b981', icon: '👨‍🎓' },
    { label: 'Total Questions', value: '50', color: '#f59e0b', icon: '❓' },
    { label: 'Results Published', value: '3', color: '#8b5cf6', icon: '📊' },
  ]

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Welcome, Admin 👋</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Here's what's happening today.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {cards.map(card => (
          <div key={card.label} style={{
            backgroundColor: '#fff',
            borderRadius: '14px',
            padding: '24px',
            borderLeft: `5px solid ${card.color}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
            <p style={{ color: '#64748b', fontSize: '14px' }}>{card.label}</p>
            <h2 style={{ fontSize: '32px', color: card.color, fontWeight: '700' }}>{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminHome
