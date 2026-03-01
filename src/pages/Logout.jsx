import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()
  const [count, setCount] = useState(5)

  useEffect(() => {
    localStorage.removeItem('liftory_token')
    const t = setInterval(() => {
      setCount(n => {
        if (n <= 1) { clearInterval(t); navigate('/'); return 0 }
        return n - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&auto=format&fit=crop') center/cover no-repeat", filter: 'brightness(0.12) saturate(1.2)' }} />
      <div className="fade-up" style={{ position: 'relative', background: 'rgba(28,28,28,0.95)', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '3.5rem 3rem', textAlign: 'center', maxWidth: '420px', width: '90%' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--orange)', letterSpacing: '3px', marginBottom: '2rem' }}>LIFTORY</div>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👋</div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>See You Soon!</h1>
        <p style={{ color: 'rgba(245,240,235,0.55)', fontSize: '0.93rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          You've been logged out. Keep up the grind — your next PR is waiting.<br /><br />
          Redirecting in <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{count}</span>s...
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary">Log Back In</Link>
          <Link to="/" className="btn btn-outline">Home</Link>
        </div>
      </div>
    </div>
  )
}