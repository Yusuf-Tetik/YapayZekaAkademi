// Ana uygulama bileşeni - Routing ve genel layout'u yönetir
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Ana sayfa container'ı */}
      <div className="main-container">
        {/* Router tanımlamaları */}
        <Routes>
          {/* Varsayılan rota - login sayfasına yönlendir */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login sayfası rotası */}
          <Route path="/login" element={<Login />} />
          
          {/* Register sayfası rotası */}
          <Route path="/register" element={<Register />} />
          
          {/* Bulunamayan sayfalar için login'e yönlendir */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App 