// Ana uygulama bileşeni - Routing ve genel layout'u yönetir
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import StudentDashboard from './components/Dashboard/StudentDashboard'
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard'
import LessonChat from './components/LessonChat/LessonChat'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Varsayılan rota - login sayfasına yönlendir */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Tam ekran rotalar (öğretmen paneli) */}
      <Route path="/teacher-dashboard" element={
        <div className="app-fullscreen">
          <TeacherDashboard />
        </div>
      } />
      
      {/* Dashboard sayfası rotası */}
      <Route path="/dashboard" element={
        <div className="app-fullscreen">
          <StudentDashboard />
        </div>
      } />
      
      {/* Ders sohbet sayfası rotası */}
      <Route path="/lesson/:lessonId" element={
        <div className="app-fullscreen">
          <LessonChat />
        </div>
      } />
      
      {/* Container'lı rotalar (login/register) */}
      <Route path="/login" element={
        <div className="app">
          <div className="main-container">
            <Login />
          </div>
        </div>
      } />
      
      <Route path="/register" element={
        <div className="app">
          <div className="main-container">
            <Register />
          </div>
        </div>
      } />
      
      {/* Bulunamayan sayfalar için login'e yönlendir */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App 