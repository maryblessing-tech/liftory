import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />

      <section style={{
        position: 'relative', height: '100vh', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start', padding: '0 8vw', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop') center/cover no-repeat",
          filter: 'brightness(0.25) saturate(1.2)', zIndex: 0
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,92,26,0.18) 0%, transparent 60%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp 0.8s ease both' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '1rem', fontWeight: 500 }}>
            Powered by wger API
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(5rem, 13vw, 12rem)', lineHeight: 0.9, letterSpacing: '2px', marginBottom: '1.5rem' }}>
            LIFT.<br />TRACK.<br /><span style={{ color: 'var(--orange)' }}>EVOLVE.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(245,240,235,0.7)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Liftory is your all-in-one fitness companion. Log workouts, browse exercises, and watch your strength grow—day by day.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>Start for Free</Link>
            <Link to="/login" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>I Have an Account</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 8vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
        {[
          { icon: '🏋️', title: 'Exercise Library', desc: 'Access thousands of exercises powered by the wger REST API with muscles, equipment, and instructions.' },
          { icon: '📊', title: 'Workout Logs', desc: 'Track every set, rep, and weight. Visualize your progress over time with clean, intuitive charts.' },
          { icon: '🔥', title: 'Custom Routines', desc: 'Build personalized workout plans and routines tailored to your goals—bulk, cut, or maintain.' },
          { icon: '🥗', title: 'Nutrition Tracking', desc: 'Log meals and macros. Liftory syncs nutritional data through wger to keep your diet on point.' },
        ].map(f => (
          <div key={f.title} style={{ background: 'var(--gray)', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '2rem', transition: 'border-color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--orange)' }}>{f.title}</h3>
            <p style={{ color: 'rgba(245,240,235,0.65)', fontSize: '0.93rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      <div style={{ position: 'relative', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&auto=format&fit=crop') center/cover no-repeat", filter: 'brightness(0.2)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '3px', marginBottom: '1rem' }}>
            YOUR STRONGEST SELF <span style={{ color: 'var(--orange)' }}>STARTS NOW</span>
          </h2>
          <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.5rem' }}>Create Free Account</Link>
        </div>
      </div>

      <footer style={{ padding: '2rem 8vw', borderTop: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'rgba(245,240,235,0.4)' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'var(--orange)' }}>LIFTORY</span>
        <span>© 2025 Liftory. Powered by wger API.</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </footer>
    </div>
  )
}