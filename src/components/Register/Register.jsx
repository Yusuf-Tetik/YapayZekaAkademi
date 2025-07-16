// Register sayfası bileşeni - Çocuk dostu kayıt formu
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiLock, FiCalendar, FiUsers } from 'react-icons/fi'

// Paylaşılan bileşenler
import Logo from '../shared/Logo/Logo'
import Input from '../shared/Input/Input'
import Button from '../shared/Button/Button'
import Select from '../shared/Select/Select'

import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')

  // React Hook Form kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm({
    mode: 'onChange'
  })

  // Form değerlerini izle
  const watchedRole = watch('userRole')
  
  // Kullanıcı rolü seçenekleri
  const roleOptions = [
    { value: 'student', label: '🎓 Öğrenci' },
    { value: 'teacher', label: '👩‍🏫 Öğretmen' }
  ]

  // Sınıf seçenekleri (sadece öğrenci için)
  const gradeOptions = [
    { value: '2', label: '2. Sınıf' },
    { value: '3', label: '3. Sınıf' },
    { value: '4', label: '4. Sınıf' },
    { value: '5', label: '5. Sınıf' },
    { value: '6', label: '6. Sınıf' },
    { value: '7', label: '7. Sınıf' },
    { value: '8', label: '8. Sınıf' }
  ]

  // Validation kuralları
  const nameValidation = {
    required: 'Bu alan gereklidir',
    minLength: {
      value: 2,
      message: 'En az 2 karakter olmalıdır'
    },
    pattern: {
      value: /^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/,
      message: 'Sadece harf kullanabilirsiniz'
    }
  }

  const emailValidation = {
    required: 'E-mail adresi gereklidir',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Geçerli bir e-mail adresi giriniz'
    }
  }

  const passwordValidation = {
    required: 'Şifre gereklidir',
    minLength: {
      value: 8,
      message: 'Şifre en az 8 karakter olmalıdır'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Şifre en az 1 küçük harf, 1 büyük harf ve 1 rakam içermelidir'
    }
  }

  const birthDateValidation = {
    required: 'Doğum tarihi gereklidir',
    validate: (value) => {
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      
      if (age < 6) {
        return 'En az 6 yaşında olmalısınız'
      }
      if (age > 100) {
        return 'Geçerli bir doğum tarihi giriniz'
      }
      return true
    }
  }

  const roleValidation = {
    required: 'Kullanıcı rolü seçimi gereklidir'
  }

  const gradeValidation = {
    required: 'Sınıf seçimi gereklidir'
  }

  // Register form gönderimi
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setRegisterError('')

      // Simülasyon - gerçek API entegrasyonu için yer tutucu
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Form verilerini kontrol et
      console.log('Kayıt verileri:', data)
      
      // Demo amaçlı başarılı kayıt simülasyonu
      alert('🎉 Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.')
      navigate('/login')

    } catch (error) {
      setRegisterError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz.')
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Rol değişikliği handler'ı
  const handleRoleChange = (roleValue) => {
    setValue('userRole', roleValue)
    // Eğer öğretmen seçilirse sınıf seçimini temizle
    if (roleValue === 'teacher') {
      setValue('grade', '')
    }
  }

  return (
    <div className="register-container">
      {/* Logo */}
      <Logo size="medium" animated={true} />
      
      {/* Hoş geldin mesajı */}
      <div className="register-welcome">
        <h1 className="register-title">Hadi Başlayalım! 🚀</h1>
        <p className="register-subtitle">
          Öğrenme maceranı başlatmak için kayıt ol
        </p>
      </div>

      {/* Register Formu */}
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Genel hata mesajı */}
        {registerError && (
          <div className="register-error">
            <FiUsers size={20} />
            <span>{registerError}</span>
          </div>
        )}

        {/* İsim ve Soyisim - Yan yana */}
        <div className="register-name-row">
          <Input
            {...register('firstName', nameValidation)}
            type="text"
            label="Adınız"
            placeholder="Adınızı giriniz"
            icon={FiUser}
            error={errors.firstName?.message}
            required
            disabled={isLoading}
          />
          
          <Input
            {...register('lastName', nameValidation)}
            type="text"
            label="Soyadınız"
            placeholder="Soyadınızı giriniz"
            icon={FiUser}
            error={errors.lastName?.message}
            required
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <Input
          {...register('email', emailValidation)}
          type="email"
          label="E-mail Adresiniz"
          placeholder="ornek@email.com"
          icon={FiMail}
          error={errors.email?.message}
          required
          disabled={isLoading}
        />

        {/* Şifre */}
        <Input
          {...register('password', passwordValidation)}
          type="password"
          label="Şifreniz"
          placeholder="Güçlü bir şifre oluşturun"
          icon={FiLock}
          error={errors.password?.message}
          helperText="En az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam"
          required
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Doğum Tarihi */}
        <Input
          {...register('birthDate', birthDateValidation)}
          type="date"
          label="Doğum Tarihiniz"
          icon={FiCalendar}
          error={errors.birthDate?.message}
          required
          disabled={isLoading}
          max={new Date().toISOString().split('T')[0]} // Bugünden sonraki tarihleri engelle
        />

        {/* Kullanıcı Rolü */}
        <Select
          label="Kullanıcı Rolünüz"
          options={roleOptions}
          placeholder="Rolünüzü seçiniz"
          value={watchedRole}
          onChange={handleRoleChange}
          error={errors.userRole?.message}
          required
          disabled={isLoading}
        />

        {/* Sınıf Seçimi - Sadece öğrenci için */}
        {watchedRole === 'student' && (
          <Select
            {...register('grade', gradeValidation)}
            label="Sınıfınız"
            options={gradeOptions}
            placeholder="Sınıfınızı seçiniz"
            value={watch('grade')}
            onChange={(gradeValue) => setValue('grade', gradeValue)}
            error={errors.grade?.message}
            required
            disabled={isLoading}
          />
        )}

        {/* Kayıt ol butonu */}
        <Button
          type="submit"
          variant="secondary"
          size="large"
          loading={isLoading}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol 🎊'}
        </Button>

        {/* Bilgilendirme kutusu */}
        <div className="register-info">
          <p className="info-title">📝 Bilgilendirme:</p>
          <ul className="info-list">
            <li>Tüm bilgileriniz güvenle saklanır</li>
            <li>İstediğiniz zaman hesabınızı silebilirsiniz</li>
            <li>Öğretmenler için özel araçlar mevcuttur</li>
          </ul>
        </div>
      </form>

      {/* Login linki */}
      <div className="register-footer">
        <p className="register-login-text">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="register-login-link">
            Giriş Yap! 🔑
          </Link>
        </p>
      </div>

      {/* Dekoratif elementler */}
      <div className="register-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-star decoration-star-1">⭐</div>
        <div className="decoration-star decoration-star-2">🌟</div>
        <div className="decoration-star decoration-star-3">✨</div>
      </div>
    </div>
  )
}

export default Register 