// Ders Butonu bileşeni - Interaktif ders seçimi
import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import './LessonButton.css'

const LessonButton = ({ lesson, onClick }) => {
  const [isPressed, setIsPressed] = useState(false)

  // Buton basma animasyonu
  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  return (
    <button
      className={`lesson-button ${isPressed ? 'button-pressed' : ''}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        '--lesson-color': lesson.color,
        '--lesson-color-light': lesson.color + '20', // %12.5 opacity
        '--lesson-color-dark': lesson.color + 'CC' // %80 opacity
      }}
      aria-label={`${lesson.name} dersini seç`}
    >
      {/* Ders ikonu */}
      <div className="lesson-icon">
        <span className="icon-emoji">{lesson.icon}</span>
      </div>

      {/* Ders bilgileri */}
      <div className="lesson-info">
        <h3 className="lesson-name">{lesson.name}</h3>
        <p className="lesson-description">{lesson.description}</p>
      </div>

      {/* Ok ikonu */}
      <div className="lesson-arrow">
        <FiArrowRight size={20} />
      </div>

      {/* Hover efekti için parıltı */}
      <div className="lesson-shine"></div>

      {/* Tıklama dalgası efekti */}
      <div className="lesson-ripple"></div>
    </button>
  )
}

export default LessonButton 