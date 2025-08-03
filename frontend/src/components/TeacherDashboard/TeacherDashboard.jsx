// Öğretmen ana dashboard bileşeni
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnalysisReport from './AnalysisReport/AnalysisReport'
import Header from '../Dashboard/Header/Header'
import './TeacherDashboard.css'

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('analysis')
  const navigate = useNavigate()

  // Öğretmen mock data
  const teacherData = {
    name: 'Öğretmen Kullanıcı',
    grade: 'Öğretmen',
    avatar: null
  }

  // Logout fonksiyonu
  const handleLogout = () => {
    // Burada authentication cleanup yapılabilir
    console.log('Öğretmen çıkış yapıyor...')
    navigate('/login')
  }

  // Profil fonksiyonu
  const handleProfileClick = () => {
    console.log('Profil sayfasına yönlendir...')
    // Gelecekte profil sayfası implementasyonu
  }

  return (
    <div className="teacher-dashboard">
      <Header 
        student={teacherData}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />
      
      <div className="teacher-dashboard-container">
        <div className="teacher-sidebar">
          <h2>Öğretmen Paneli</h2>
          <nav className="teacher-nav">
            <button 
              className={`nav-button ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              📊 Analiz Raporları
            </button>
            <button 
              className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              👥 Öğrenci Listesi
            </button>
          </nav>
        </div>

        <div className="teacher-content">
          {activeTab === 'analysis' && <AnalysisReport />}
          {activeTab === 'students' && (
            <div className="coming-soon">
              <h3>Öğrenci Listesi</h3>
              <p>Bu özellik yakında eklenecek...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard 