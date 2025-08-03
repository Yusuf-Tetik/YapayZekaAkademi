// Çocuk dostu buton bileşeni - Renkli ve etkileşimli tasarım
import { forwardRef } from 'react'
import './Button.css'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  ...props 
}, ref) => {
  
  // Buton sınıflarını oluştur
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading'
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Loading durumunda spinner göster */}
      {loading && (
        <div className="btn__spinner">
          <div className="spinner"></div>
        </div>
      )}
      
      {/* Buton içeriği */}
      <span className={`btn__content ${loading ? 'btn__content--hidden' : ''}`}>
        {children}
      </span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button 