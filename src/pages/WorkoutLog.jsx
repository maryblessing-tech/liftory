import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'

export default function WorkoutLog() {
  const [exercises, setExercises] = useState([])
  const [workouts, setWorkouts] = useState(() => JSON.parse(localStorage.getItem('liftory_workouts') || '[]'))
  const [form, setForm] = useState({ exercise: '', weight: '', reps: '', sets: '' })
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fallbackExercises = [
      { id: 1, name: 'Bench Press' }, { id: 2, name: 'Back Squat' },
      { id: 3, name: 'Deadlift' }, { id: 4, name: 'Overhead Press' },
      { id: 5, name: 'Pull-Up' }, { id: 6, name: 'Barbell Row' },
      { id: 7, name: 'Dumbbell Curl' }, { id: 8, name: 'Tricep Dip' },
      { id: 9, name: 'Leg Press' }, { id: 10, name: 'Lat Pulldown' },
      { id: 11, name: 'Romanian Deadlift' }, { id: 12, name: 'Bulgarian Split Squat' },
      { id: 13, name: 'Incline Bench Press' }, { id: 14, name: 'Cable Row' },
      { id: 15, name: 'Leg Curl' }, { id: 16, name: 'Leg Extension' },
      { id: 17, name: 'Shoulder Press' }, { id: 18, name: 'Lateral Raise' },
      { id: 19, name: 'Face Pull' }, { id: 20, name: 'Hip Thrust' },
    ]
    setExercises(fallbackExercises)
    setLoading(false)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const newWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: new Date().toISOString(),
      exercise: form.exercise,
      weight: parseFloat(form.weight),
      reps: parseInt(form.reps),
      sets: parseInt(form.sets),
      totalVolume: parseFloat(form.weight) * parseInt(form.reps) * parseInt(form.sets)
    }
    const updated = [newWorkout, ...workouts]
    setWorkouts(updated)
    localStorage.setItem('liftory_workouts', JSON.stringify(updated))
    setForm({ exercise: '', weight: '', reps: '', sets: '' })
    setSuccess('✅ Workout logged successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  function deleteWorkout(id) {
    const updated = workouts.filter(w => w.id !== id)
    setWorkouts(updated)
    localStorage.setItem('liftory_workouts', JSON.stringify(updated))
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', background: 'var(--input-bg)',
    border: '1.5px solid #2a2a2a', borderRadius: '6px', color: 'var(--white)',
    fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none'
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '2.5rem', flex: 1, animation: 'fadeUp 0.5s ease' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>
          📋 LOG WORKOUT
        </h2>
        <p style={{ color: 'rgba(245,240,235,0.45)', fontSize: '0.88rem', marginBottom: '2rem' }}>Record your sets, reps and weight</p>

        {/* Form */}
        <div style={{ background: 'var(--gray)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', marginBottom: '2.5rem' }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '1px', marginBottom: '1.5rem', color: 'var(--orange)' }}>NEW ENTRY</h3>

          {success && <div className="success" style={{ marginBottom: '1rem' }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)', marginBottom: '0.4rem' }}>Exercise</label>
                <select value={form.exercise} onChange={e => setForm({ ...form, exercise: e.target.value })} required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}>
                  <option value="">Select exercise...</option>
                  {exercises.map(ex => <option key={ex.id} value={ex.name}>{ex.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)', marginBottom: '0.4rem' }}>Weight (kg)</label>
                <input type="number" min="0" step="0.5" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="e.g. 80" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)', marginBottom: '0.4rem' }}>Reps</label>
                <input type="number" min="1" value={form.reps} onChange={e => setForm({ ...form, reps: e.target.value })} placeholder="e.g. 10" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)', marginBottom: '0.4rem' }}>Sets</label>
                <input type="number" min="1" value={form.sets} onChange={e => setForm({ ...form, sets: e.target.value })} placeholder="e.g. 3" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem', letterSpacing: '1px' }}>
              + LOG WORKOUT
            </button>
          </form>
        </div>

        {/* Workout History */}
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', letterSpacing: '1px', marginBottom: '1.2rem' }}>WORKOUT HISTORY</h3>
        {workouts.length === 0 ? (
          <div style={{ background: 'var(--gray)', border: '1px solid var(--border)', borderRadius: '10px', padding: '3rem', textAlign: 'center', color: 'rgba(245,240,235,0.3)' }}>
            No workouts logged yet. Add your first one above! 💪
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {workouts.map(w => (
              <div key={w.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(255,92,26,0.15)', color: 'var(--orange)', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>{w.date}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{w.exercise}</span>
                  <span style={{ color: 'rgba(245,240,235,0.5)', fontSize: '0.85rem' }}>{w.sets} sets × {w.reps} reps @ {w.weight}kg</span>
                  <span style={{ color: 'var(--orange)', fontSize: '0.82rem', fontWeight: 600 }}>Vol: {w.totalVolume}kg</span>
                </div>
                <button onClick={() => deleteWorkout(w.id)} style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}