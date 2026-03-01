const muscleColors = {
  'Chest': '#e74c3c',
  'Back': '#3498db', 
  'Legs': '#2ecc71',
  'Shoulders': '#9b59b6',
  'Arms': '#f39c12',
  'Core': '#1abc9c',
  'Strength': '#ff5c1a',
}

const exerciseInfo = {
  'Bench Press': { muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate', emoji: '🏋️' },
  'Back Squat': { muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', emoji: '🦵' },
  'Deadlift': { muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced', emoji: '💪' },
  'Overhead Press': { muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate', emoji: '🔝' },
  'Pull-Up': { muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate', emoji: '⬆️' },
  'Barbell Row': { muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate', emoji: '🏋️' },
  'Dumbbell Curl': { muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', emoji: '💪' },
  'Tricep Dip': { muscle: 'Arms', equipment: 'Bodyweight', difficulty: 'Beginner', emoji: '🔽' },
  'Leg Press': { muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner', emoji: '🦵' },
  'Lat Pulldown': { muscle: 'Back', equipment: 'Machine', difficulty: 'Beginner', emoji: '⬇️' },
  'Romanian Deadlift': { muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', emoji: '🏋️' },
  'Bulgarian Split Squat': { muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Advanced', emoji: '🦵' },
}

export default function ExerciseCard({ name, category }) {
  const info = exerciseInfo[name] || { muscle: category || 'Strength', equipment: 'Various', difficulty: 'Intermediate', emoji: '🏋️' }
  const muscleColor = muscleColors[info.muscle] || '#ff5c1a'

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: '12px', padding: '1.5rem',
      transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: '0.8rem'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '2rem' }}>{info.emoji}</div>
        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: '20px',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px',
          background: `${muscleColor}22`, color: muscleColor, border: `1px solid ${muscleColor}44`
        }}>
          {info.muscle}
        </span>
      </div>

      {/* Name */}
      <div style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>{name}</div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'rgba(245,240,235,0.4)' }}>Equipment</span>
          <span style={{ color: 'rgba(245,240,235,0.7)', fontWeight: 500 }}>{info.equipment}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'rgba(245,240,235,0.4)' }}>Difficulty</span>
          <span style={{ color: 'rgba(245,240,235,0.7)', fontWeight: 500 }}>{info.difficulty}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'rgba(245,240,235,0.4)' }}>Source</span>
          <span style={{ color: 'rgba(245,240,235,0.7)', fontWeight: 500 }}>wger API</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* Add to workout button */}
      <button style={{
        width: '100%', padding: '0.55rem', background: 'rgba(255,92,26,0.1)',
        border: '1px solid rgba(255,92,26,0.3)', borderRadius: '6px',
        color: 'var(--orange)', fontFamily: 'inherit', fontSize: '0.82rem',
        fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.5px'
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,92,26,0.1)'; e.currentTarget.style.color = 'var(--orange)' }}
        onClick={() => window.location.href = '/log'}
      >
        + Add to Workout
      </button>
    </div>
  )
}