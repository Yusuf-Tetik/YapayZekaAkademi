// Çocuk dostu seçim bileşeni - Dropdown/Select için
import { forwardRef, useState } from 'react'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import './Select.css'

const Select = forwardRef(({ 
  label,
  options = [],
  error,
  success,
  helperText,
  placeholder = "Seçiniz...",
  required = false,
  disabled = false,
  value,
  onChange,
  ...props 
}, ref) => {
  
  const [isOpen, setIsOpen] = useState(false)
  
  // Select sınıflarını oluştur
  const selectClasses = [
    'select-field',
    error && 'select-field--error',
    success && 'select-field--success',
    disabled && 'select-field--disabled',
    isOpen && 'select-field--open'
  ].filter(Boolean).join(' ')
  
  // Seçilen değerin label'ını bul
  const selectedOption = options.find(option => option.value === value)
  const displayValue = selectedOption ? selectedOption.label : placeholder
  
  // Seçim yapar
  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }
  
  // Dropdown'ı aç/kapat
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }
  
  // Klavye navigasyonu
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="select-wrapper">
      {/* Label */}
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      {/* Select container */}
      <div className="select-container">
        {/* Ana select butonu */}
        <button
          ref={ref}
          type="button"
          className={selectClasses}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          {...props}
        >
          <span className={`select-value ${!selectedOption ? 'select-placeholder' : ''}`}>
            {displayValue}
          </span>
          
          <div className="select-icon">
            <FiChevronDown size={20} />
          </div>
        </button>
        
        {/* Dropdown seçenekleri */}
        {isOpen && (
          <div className="select-dropdown">
            <ul className="select-options" role="listbox">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`select-option ${value === option.value ? 'select-option--selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span className="select-option-label">{option.label}</span>
                  {value === option.value && (
                    <FiCheck size={16} className="select-option-check" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Yardımcı metin veya hata mesajı */}
      {(error || helperText) && (
        <div className={`select-message ${error ? 'select-message--error' : 'select-message--helper'}`}>
          {error || helperText}
        </div>
      )}
      
      {/* Dropdown dışına tıklandığında kapat */}
      {isOpen && (
        <div 
          className="select-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select 