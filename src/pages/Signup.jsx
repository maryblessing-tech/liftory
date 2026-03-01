import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [showCpw, setShowCpw] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }

    localStorage.setItem('liftory_user', JSON.stringify({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim()
    }))

    setSuccess('✅ Account created successfully! Redirecting to login...')
    setTimeout(() => navigate('/login'), 1800)
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
          background: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop') center/cover no-repeat",
          filter: 'brightness(0.3) saturate(1.3)'
        }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', lineHeight: 1, letterSpacing: '2px', marginBottom: '0.8rem' }}>
            JOIN THE<br /><span style={{ color: 'var(--orange)' }}>LIFTORY</span><br />COMMUNITY
          </h2>
          <p style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Thousands of athletes are already tracking their progress with Liftory.
          </p>
        </div>
      </div>

      <div className="fade-up" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem', background: 'var(--gray)' }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--orange)', letterSpacing: '3px', marginBottom: '2.5rem', display: 'block' }}>LIFTORY</Link>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>Create Account</h1>
        <p style={{ color: 'rgba(245,240,235,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>Start tracking your gains — it's free.</p>

        {error && <div className="alert">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input style={inputStyle} name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input style={inputStyle} name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Username</label>
            <input style={inputStyle} type="text" name="username" value={form.username} onChange={handleChange} placeholder="johndoe99" required
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputStyle, paddingRight: '2.8rem' }} type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" required minLength={8}
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputStyle, paddingRight: '2.8rem' }} type={showCpw ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" required
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              <button type="button" onClick={() => setShowCpw(!showCpw)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showCpw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', letterSpacing: '1px', marginTop: '0.5rem' }}>
            CREATE ACCOUNT
          </button>
          <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,235,0.35)', textAlign: 'center', marginTop: '1rem' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: 'rgba(245,240,235,0.2)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />or
          <div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'rgba(245,240,235,0.5)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--orange)', fontWeight: 600 }}>Log In</Link>
        </p>
      </div>
    </div>
  )
}