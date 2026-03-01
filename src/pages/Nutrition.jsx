import Sidebar from '../components/Sidebar'

const meals = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (100g)', calories: 216, protein: 4.5, carbs: 45, fat: 1.8 },
  { name: 'Eggs (2)', calories: 140, protein: 12, carbs: 1, fat: 10 },
  { name: 'Oats (100g)', calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
]

export default function Nutrition() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', padding: '2.5rem', flex: 1, animation: 'fadeUp 0.5s ease' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '1px', marginBottom: '0.3rem' }}>
          🥗 NUTRITION
        </h2>
        <p style={{ color: 'rgba(245,240,235,0.45)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          Common foods and their macros — powered by wger API
        </p>

        {/* Macro summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Daily Calories', value: '2,400', unit: 'kcal goal' },
            { label: 'Protein Goal', value: '180g', unit: 'per day' },
            { label: 'Carbs Goal', value: '250g', unit: 'per day' },
            { label: 'Fat Goal', value: '70g', unit: 'per day' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(245,240,235,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--orange)' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(245,240,235,0.4)' }}>{s.unit}</div>
            </div>
          ))}
        </div>

        {/* Food table */}
        <div style={{ background: 'var(--gray)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '1rem' }}>
            {['Food', 'Calories', 'Protein', 'Carbs', 'Fat'].map(h => (
              <span key={h} style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(245,240,235,0.4)' }}>{h}</span>
            ))}
          </div>
          {meals.map((meal, i) => (
            <div key={i} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '1rem', alignItems: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,92,26,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{meal.name}</span>
              <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{meal.calories}</span>
              <span style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.88rem' }}>{meal.protein}g</span>
              <span style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.88rem' }}>{meal.carbs}g</span>
              <span style={{ color: 'rgba(245,240,235,0.6)', fontSize: '0.88rem' }}>{meal.fat}g</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}