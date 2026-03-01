import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import WorkoutLog from './pages/WorkoutLog'
import Progress from './pages/Progress'
import Nutrition from './pages/Nutrition'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('liftory_token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/log" element={<PrivateRoute><WorkoutLog /></PrivateRoute>} />
      <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
      <Route path="/nutrition" element={<PrivateRoute><Nutrition /></PrivateRoute>} />
    </Routes>
  )
}

export default App