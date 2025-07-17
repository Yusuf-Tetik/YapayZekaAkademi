// Öğrenci Dashboard sayfası - Ana bileşen
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Bileşenler
import Header from './Header/Header'
import DashboardLayout from './DashboardLayout/DashboardLayout'
import LessonButton from './LessonButton/LessonButton'

import './StudentDashboard.css'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock öğrenci verisi ve ders listesi
  useEffect(() => {
    // Simülasyon - gerçek API çağrısı burada olacak
    const mockStudent = {
      id: 1,
      name: 'Ahmet Yılmaz',
      grade: '3', // 3. sınıf
      avatar: null
    }

    // Sınıfa özel ders listesi (3. sınıf için)
    const mockLessons = [
      {
        id: 1,
        name: 'Matematik',
        icon: '🔢',
        color: '#4A90E2', // Mavi
        description: 'Sayılar, toplama, çıkarma'
      },
      {
        id: 2,
        name: 'Türkçe',
        icon: '📚',
        color: '#F5A623', // Turuncu
        description: 'Okuma, yazma, kelimeler'
      },
      {
        id: 3,
        name: 'Fen Bilgisi',
        icon: '🔬',
        color: '#7ED321', // Yeşil
        description: 'Doğa, deney, keşif'
      },
      {
        id: 4,
        name: 'Sosyal Bilgiler',
        icon: '🌍',
        color: '#BD10E0', // Mor
        description: 'Tarih, coğrafya, toplum'
      },
      {
        id: 5,
        name: 'İngilizce',
        icon: '🗣️',
        color: '#50E3C2', // Teal
        description: 'Kelimeler, konuşma, oyunlar'
      },
      {
        id: 6,
        name: 'Resim',
        icon: '🎨',
        color: '#D0021B', // Kırmızı
        description: 'Çizim, boyama, sanat'
      }
    ]

    // Yükleme simülasyonu
    setTimeout(() => {
      setStudent(mockStudent)
      setLessons(mockLessons)
      setLoading(false)
    }, 1000)
  }, [])

  // Ders seçimi
  const handleLessonSelect = (lesson) => {
    console.log('Seçilen ders:', lesson)
    // İleride ders sayfasına yönlendirme burada olacak
    // navigate(`/lesson/${lesson.id}`)
    alert(`🎯 ${lesson.name} dersine hoş geldin! Bu özellik yakında eklenecek.`)
  }

  // Profil sayfasına git
  const handleProfileClick = () => {
    console.log('Profil sayfasına git')
    // navigate('/profile')
    alert('👤 Profil sayfası yakında eklenecek!')
  }

  // Çıkış yap
  const handleLogout = () => {
    console.log('Çıkış yapılıyor...')
    // Auth context'ten çıkış işlemi burada olacak
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">🌟</div>
        <p>Dashboard yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="student-dashboard">
      {/* Üst header alanı */}
      <Header 
        student={student}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
      />

      {/* Ana dashboard içeriği */}
      <DashboardLayout>
        {/* Hoş geldin mesajı */}
        <div className="dashboard-welcome">
          <h1 className="welcome-title">
            Merhaba {student?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="welcome-subtitle">
            Bugün hangi dersi öğrenmek istiyorsun?
          </p>
        </div>

        {/* Ders butonları grid'i */}
        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <LessonButton
              key={lesson.id}
              lesson={lesson}
              onClick={() => handleLessonSelect(lesson)}
            />
          ))}
        </div>

        {/* Motivasyon mesajı */}
        <div className="dashboard-motivation">
          <p className="motivation-text">
            🌟 Her ders yeni bir macera! Öğrenmeye devam et! 🚀
          </p>
        </div>
      </DashboardLayout>

      {/* Dekoratif elementler */}
      <div className="dashboard-decoration">
        <div className="decoration-element decoration-1">⭐</div>
        <div className="decoration-element decoration-2">🌈</div>
        <div className="decoration-element decoration-3">✨</div>
        <div className="decoration-element decoration-4">🎯</div>
      </div>
    </div>
  )
}

export default StudentDashboard 