import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      padding: '1.4rem 8vw', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      zIndex: 100,
      background: 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)'
    }}>
      <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--orange)', letterSpacing: '3px' }}>
        LIFTORY
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login" className="btn btn-outline">Log In</Link>
        <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
      </div>
    </nav>
  )
}