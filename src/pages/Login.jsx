import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (localStorage.getItem('liftory_token')) navigate('/dashboard')
  }, [navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    const storedUser = JSON.parse(localStorage.getItem('liftory_user') || '{}')
    if (storedUser.username === form.username.trim() && storedUser.password === form.password) {
      localStorage.setItem('liftory_token', 'token-' + Date.now())
      setSuccess('✅ Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1200)
    } else {
      setError('Invalid username or password. Please try again.')
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', background: 'var(--input-bg)',
    border: '1.5px solid #2a2a2a', borderRadius: '6px', color: 'var(--white)',
    fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none'
  }
  const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px',
    textTransform: 'uppercase', color: 'rgba(245,240,235,0.6)', marginBottom: '0.4rem'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1000&auto=format&fit=crop') center/cover no-repeat",
          filter: 'brightness(0.25) saturate(1.3)'
        }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', lineHeight: 1, letterSpacing: '2px', marginBottom: '0.8rem' }}>
            WELCOME<br /><span style={{ color: 'var(--orange)' }}>BACK,</span><br />LIFTER
          </h2>
          <p style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Your progress is waiting. Log in and continue where you left off.
          </p>
        </div>
      </div>

      <div className="fade-up" style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem', background: 'var(--gray)' }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--orange)', letterSpacing: '3px', marginBottom: '2.5rem', display: 'block' }}>LIFTORY</Link>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>Welcome Back</h1>
        <p style={{ color: 'rgba(245,240,235,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>Log in to your account to continue.</p>

        {error && <div className="alert">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.3rem' }}>
            <label style={labelStyle}>Username</label>
            <input style={inputStyle} type="text" name="username" value={form.username} onChange={handleChange} placeholder="Your username" required
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
          </div>
          <div style={{ marginBottom: '1.3rem' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputStyle, paddingRight: '2.8rem' }} type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Your password" required
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
            <a href="#" style={{ display: 'block', textAlign: 'right', fontSize: '0.8rem', color: 'var(--orange)', marginTop: '0.3rem' }}>Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', letterSpacing: '1px' }}>LOG IN</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: 'rgba(245,240,235,0.2)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />or
          <div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'rgba(245,240,235,0.5)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--orange)', fontWeight: 600 }}>Sign Up Free</Link>
        </p>
      </div>
    </div>
  )
}