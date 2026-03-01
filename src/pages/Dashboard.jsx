import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ExerciseCard from '../components/ExerciseCard'

export default function Dashboard() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const user = JSON.parse(localStorage.getItem('liftory_user') || '{}')
  const username = user.username || 'Lifter'
  const hour = new Date().getHours()
  const timeOfDay = hour < 12 ? 'MORNING' : hour < 17 ? 'AFTERNOON' : 'EVENING'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => { fetchExercises() }, [])

  async function fetchExercises(query = '') {
    setLoading(true)
    const url = query
      ? `https://wger.de/api/v2/exercise/search/?term=${encodeURIComponent(query)}&language=english&format=json`
      : `https://wger.de/api/v2/exercise/?format=json&language=2&limit=12`
    try {
      const res = await fetch(url)
      const data = await res.json()
      const list = data.results || data.suggestions || []
      setExercises(list.slice(0, 12))
    } catch {
      setExercises([
        'Bench Press','Back Squat','Deadlift','Overhead Press',
        'Pull-Up','Barbell Row','Dumbbell Curl','Tricep Dip',
        'Leg Press','Lat Pulldown','Romanian Deadlift','Bulgarian Split Squat'
      ].map(name => ({ name })))
    }
    setLoading(false)
  }

  function handleSearch(e) {
    e.preventDefault()
    fetchExercises(search)
  }

  const stats = [
    { label: 'Workouts This Week', value: '3', unit: 'sessions' },
    { label: 'Total Volume', value: '12.4k', unit: 'kg lifted' },
    { label: 'Streak', value: '5', unit: 'days 🔥' },
    { label: 'PRs This Month', value: '2', unit: 'personal records' },
  ]

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '2.5rem', flex: 1, animation: 'fadeUp 0.5s ease' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '1px' }}>
              GOOD {timeOfDay}, {username.toUpperCase()} 💪
            </h2>
            <p style={{ color: 'rgba(245,240,235,0.45)', fontSize: '0.88rem' }}>{today}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--gray)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 600 }}>
            <div style={{ width: '34px', height: '34px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem' }}>
              {username[0]?.toUpperCase()}
            </div>
            {username}
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', height: '160px', display: 'flex', alignItems: 'center', padding: '0 2.5rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&auto=format&fit=crop') center/cover no-repeat", filter: 'brightness(0.25)' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>
              TODAY'S <span style={{ color: 'var(--orange)' }}>WORKOUT</span> IS WAITING
            </h3>
            <p style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.85rem' }}>Stay consistent. Every session counts toward your goal.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,235,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', color: 'var(--orange)', letterSpacing: '1px' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(245,240,235,0.4)' }}>{s.unit}</div>
            </div>
          ))}
        </div>

        <div id="exercises">
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '1px', marginBottom: '1.2rem' }}>🏋️ Exercise Library</p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exercises (e.g. bench press, squat...)"
              style={{ flex: 1, padding: '0.75rem 1rem', background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: '6px', color: 'var(--white)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Search</button>
          </form>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,240,235,0.3)', padding: '2rem' }}>Loading exercises from wger API...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {exercises.map((ex, i) => (
                <ExerciseCard key={i} name={ex.name || ex.base_name || 'Exercise'} category={ex.category?.name} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}