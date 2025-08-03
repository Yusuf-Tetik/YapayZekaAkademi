// Dashboard Header bileşeni - Profil ve navigasyon
import { useState } from 'react'
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi'
import Logo from '../../shared/Logo/Logo'
import './Header.css'

const Header = ({ student, onProfileClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Dropdown menüyü aç/kapat
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Menü dışına tıklandığında kapat
  const handleBackdropClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Backdrop - menü açıkken arka planı karartır */}
      {isMenuOpen && (
        <div className="header-backdrop" onClick={handleBackdropClick}></div>
      )}

      <header className="dashboard-header">
        {/* Sol taraf - Logo */}
        <div className="header-left">
          <Logo size="small" />
          <div className="header-brand">
            <span className="brand-text">MindSense</span>
          </div>
        </div>

        {/* Sağ taraf - Kullanıcı menüsü */}
        <div className="header-right">
          <div className={`user-menu ${isMenuOpen ? 'menu-open' : ''}`}>
            {/* Kullanıcı butonu */}
            <button 
              className="user-button"
              onClick={toggleMenu}
              aria-label="Kullanıcı menüsü"
            >
              {/* Profil avatarı veya ikon */}
              <div className="user-avatar">
                {student?.avatar ? (
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="avatar-image"
                  />
                ) : (
                  <FiUser size={20} />
                )}
              </div>

              {/* Kullanıcı adı (mobilde gizli) */}
              <span className="user-name">
                {student?.name?.split(' ')[0] || 'Öğrenci'}
              </span>

              {/* Dropdown oku */}
              <FiChevronDown 
                size={16} 
                className={`dropdown-arrow ${isMenuOpen ? 'arrow-up' : ''}`}
              />
            </button>

            {/* Dropdown menü */}
            <div className={`dropdown-menu ${isMenuOpen ? 'menu-visible' : ''}`}>
              {/* Profil bilgileri */}
              <div className="menu-header">
                <div className="menu-avatar">
                  {student?.avatar ? (
                    <img 
                      src={student.avatar} 
                      alt={student.name}
                      className="menu-avatar-image"
                    />
                  ) : (
                    <FiUser size={24} />
                  )}
                </div>
                <div className="menu-user-info">
                  <p className="menu-user-name">{student?.name}</p>
                  <p className="menu-user-grade">{student?.grade}. Sınıf</p>
                </div>
              </div>

              {/* Menü öğeleri */}
              <div className="menu-items">
                {/* Çıkış yap */}
                <button 
                  className="menu-item logout-item"
                  onClick={() => {
                    console.log('Logout button clicked!')
                    console.log('onLogout function:', onLogout)
                    if (onLogout && typeof onLogout === 'function') {
                      onLogout()
                    } else {
                      console.error('onLogout prop is not a function or is missing!')
                    }
                    setIsMenuOpen(false)
                  }}
                >
                  <FiLogOut size={18} />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header 