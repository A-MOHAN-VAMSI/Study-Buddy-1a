import { Link, useLocation } from 'react-router-dom'

function AdminSidebar() {
  const location = useLocation()

  const links = [
    { to: '/admin', label: 'Dashboard', icon: '🏠' },
    { to: '/admin/exams', label: 'Manage Exams', icon: '📝' },
    { to: '/admin/questions', label: 'Question Bank', icon: '❓' },
    { to: '/admin/students', label: 'Students', icon: '👨‍🎓' },
  ]

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: '#1e293b',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <h2 style={{ color: '#fff', marginBottom: '30px', fontSize: '20px' }}>⚡ Admin Panel</h2>
      {links.map(link => (
        <Link key={link.to} to={link.to} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: '10px',
          color: location.pathname === link.to ? '#fff' : '#94a3b8',
          backgroundColor: location.pathname === link.to ? '#3b82f6' : 'transparent',
          fontWeight: location.pathname === link.to ? '600' : '400',
          fontSize: '15px',
          transition: 'all 0.2s',
        }}>
          {link.icon} {link.label}
        </Link>
      ))}
    </div>
  )
}

export default AdminSidebar
