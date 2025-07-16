// Çocuk dostu input bileşeni - Form girişleri için
import { forwardRef, useState } from 'react'
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import './Input.css'

const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  success,
  helperText,
  icon: IconComponent,
  placeholder,
  required = false,
  disabled = false,
  ...props 
}, ref) => {
  
  // Şifre görünürlüğü durumu
  const [showPassword, setShowPassword] = useState(false)
  
  // Input sınıflarını oluştur
  const inputClasses = [
    'input-field',
    error && 'input-field--error',
    success && 'input-field--success',
    disabled && 'input-field--disabled',
    IconComponent && 'input-field--with-icon'
  ].filter(Boolean).join(' ')
  
  // Şifre görünürlüğünü değiştir
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // Gerçek input tipi (şifre görünürlüğüne göre)
  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="input-wrapper">
      {/* Label */}
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="input-container">
        {/* Sol taraf ikonu */}
        {IconComponent && (
          <div className="input-icon input-icon--left">
            <IconComponent size={20} />
          </div>
        )}
        
        {/* Ana input alanı */}
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        
        {/* Sağ taraf ikonları */}
        <div className="input-icons-right">
          {/* Şifre görünürlük butonu */}
          {type === 'password' && (
            <button
              type="button"
              className="input-icon input-icon--password"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          )}
          
          {/* Durum ikonları */}
          {error && (
            <div className="input-icon input-icon--error">
              <FiAlertCircle size={20} />
            </div>
          )}
          
          {success && !error && (
            <div className="input-icon input-icon--success">
              <FiCheckCircle size={20} />
            </div>
          )}
        </div>
      </div>
      
      {/* Yardımcı metin veya hata mesajı */}
      {(error || helperText) && (
        <div className={`input-message ${error ? 'input-message--error' : 'input-message--helper'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input 