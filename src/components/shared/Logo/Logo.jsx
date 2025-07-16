// Çocuk dostu logo bileşeni - MindSense markası için
import './Logo.css'

const Logo = ({ size = 'medium', animated = true }) => {
  
  // Logo sınıflarını oluştur
  const logoClasses = [
    'logo',
    `logo--${size}`,
    animated && 'logo--animated'
  ].filter(Boolean).join(' ')

  return (
    <div className={logoClasses}>
      {/* Logo ikonu - Beyin ve yıldız kombinasyonu */}
      <div className="logo-icon">
        <div className="logo-brain">
          <div className="brain-left"></div>
          <div className="brain-right"></div>
        </div>
        <div className="logo-stars">
          <div className="star star-1">⭐</div>
          <div className="star star-2">✨</div>
          <div className="star star-3">🌟</div>
        </div>
      </div>
      
      {/* Logo metni */}
      <div className="logo-text">
        <span className="logo-mind">Mind</span>
        <span className="logo-sense">Sense</span>
      </div>
      
      {/* Alt başlık */}
      <div className="logo-subtitle">
        Öğrenmenin Geleceği
      </div>
    </div>
  )
}

export default Logo 