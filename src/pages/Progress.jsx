import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

export default function Progress() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('liftory_workouts') || '[]')
    setWorkouts(stored.reverse())
  }, [])

  // Prepare chart data
  const chartData = workouts.slice(0, 10).map((w, i) => ({
    name: w.date || `Day ${i + 1}`,
    weight: w.weight,
    reps: w.reps,
    volume: w.totalVolume,
    exercises: 1
  }))

  const totalVolume = workouts.reduce((sum, w) => sum + (w.totalVolume || 0), 0)
  const totalReps = workouts.reduce((sum, w) => sum + (w.reps || 0), 0)
  const totalWorkouts = workouts.length

  const cardStyle = {
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem'
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '2.5rem', flex: 1, animation: 'fadeUp 0.5s ease' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>
          📊 PROGRESS
        </h2>
        <p style={{ color: 'rgba(245,240,235,0.45)', fontSize: '0.88rem', marginBottom: '2rem' }}>Visualize your fitness journey</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Workouts', value: totalWorkouts, unit: 'logged' },
            { label: 'Total Volume', value: `${totalVolume.toLocaleString()}`, unit: 'kg lifted' },
            { label: 'Total Reps', value: totalReps.toLocaleString(), unit: 'reps performed' },
            { label: 'Exercises', value: [...new Set(workouts.map(w => w.exercise))].length, unit: 'unique' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(245,240,235,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--orange)' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(245,240,235,0.4)' }}>{s.unit}</div>
            </div>
          ))}
        </div>

        {workouts.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem', color: 'rgba(245,240,235,0.3)' }}>
            No workout data yet. Log some workouts first to see your progress charts! 💪
          </div>
        ) : (
          <>
            {/* Weight Over Time */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '1.5rem', color: 'var(--orange)' }}>WEIGHT LIFTED OVER TIME</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#f5f0eb' }} />
                  <Bar dataKey="weight" fill="#ff5c1a" radius={[4, 4, 0, 0]} name="Weight (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Reps Over Time */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '1.5rem', color: 'var(--orange)' }}>REPS PER WORKOUT</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#f5f0eb' }} />
                  <Line type="monotone" dataKey="reps" stroke="#ff5c1a" strokeWidth={2} dot={{ fill: '#ff5c1a', r: 4 }} name="Reps" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Total Volume */}
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '1.5rem', color: 'var(--orange)' }}>TOTAL VOLUME OVER TIME</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(245,240,235,0.3)" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#f5f0eb' }} />
                  <Legend />
                  <Line type="monotone" dataKey="volume" stroke="#ff5c1a" strokeWidth={2} dot={{ fill: '#ff5c1a', r: 4 }} name="Volume (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  )
}