import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('liftory_token')
    navigate('/logout')
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: '220px',
      background: 'var(--gray)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', zIndex: 50
    }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--orange)', letterSpacing: '3px', marginBottom: '3rem' }}>
        LIFTORY
      </div>

      {[
        { icon: '🏠', label: 'Dashboard', to: '/dashboard' },
{ icon: '🏋️', label: 'Exercises', to: '/dashboard' },
{ icon: '📋', label: 'Log Workout', to: '/log' },
{ icon: '📊', label: 'Progress', to: '/progress' },
{ icon: '🥗', label: 'Nutrition', to: '/nutrition' },
      ].map(item => (
        <Link key={item.label} to={item.to} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.7rem 0.8rem', borderRadius: '6px', marginBottom: '0.3rem',
          fontSize: '0.9rem', fontWeight: 500, color: 'rgba(245,240,235,0.5)',
          transition: 'all 0.2s', textDecoration: 'none'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,92,26,0.12)'; e.currentTarget.style.color = 'var(--orange)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(245,240,235,0.5)' }}
        >
          <span>{item.icon}</span><span>{item.label}</span>
        </Link>
      ))}

      <div style={{ flex: 1 }} />
      <button onClick={logout} style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.7rem 0.8rem', borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.9rem', fontWeight: 500, color: 'rgba(245,240,235,0.4)',
        border: 'none', background: 'none', width: '100%', fontFamily: 'inherit', transition: 'all 0.2s'
      }}
        onMouseEnter={e => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.background = 'rgba(231,76,60,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,235,0.4)'; e.currentTarget.style.background = 'none' }}
      >
        <span>🚪</span><span>Log Out</span>
      </button>
    </div>
  )
}