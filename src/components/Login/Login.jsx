// Login sayfası bileşeni - Çocuk dostu giriş formu
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiLock, FiUserCheck } from 'react-icons/fi'

// Paylaşılan bileşenler
import Logo from '../shared/Logo/Logo'
import Input from '../shared/Input/Input'
import Button from '../shared/Button/Button'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // React Hook Form kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    mode: 'onChange'
  })

  // Form değerlerini izle
  const watchedFields = watch()

  // Email validation kuralları
  const emailValidation = {
    required: 'E-mail adresi gereklidir',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Geçerli bir e-mail adresi giriniz'
    }
  }

  // Şifre validation kuralları
  const passwordValidation = {
    required: 'Şifre gereklidir',
    minLength: {
      value: 6,
      message: 'Şifre en az 6 karakter olmalıdır'
    }
  }

  // Login form gönderimi
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setLoginError('')

      // Simülasyon - gerçek API entegrasyonu için yer tutucu
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Demo amaçlı - gerçek autentikasyon burada olacak
      if (data.email === 'demo@mindsense.com' && data.password === 'demo123') {
        // Başarılı giriş - dashboard'a yönlendir
        console.log('Giriş başarılı:', data)
        navigate('/dashboard')
      } else {
        setLoginError('E-mail veya şifre hatalı. Lütfen tekrar deneyiniz.')
      }

    } catch (error) {
      setLoginError('Bir hata oluştu. Lütfen tekrar deneyiniz.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Logo */}
      <Logo size="medium" animated={true} />
      
      {/* Hoş geldin mesajı */}
      <div className="login-welcome">
        <h1 className="login-title">Tekrar Hoş Geldin! 🌟</h1>
        <p className="login-subtitle">
          Öğrenme macerana devam etmek için giriş yap
        </p>
      </div>

      {/* Login Formu */}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Genel hata mesajı */}
        {loginError && (
          <div className="login-error">
            <FiUserCheck size={20} />
            <span>{loginError}</span>
          </div>
        )}

        {/* Email input */}
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

        {/* Şifre input */}
        <Input
          {...register('password', passwordValidation)}
          type="password"
          label="Şifreniz"
          placeholder="Şifrenizi giriniz"
          icon={FiLock}
          error={errors.password?.message}
          required
          disabled={isLoading}
          autoComplete="current-password"
        />

        {/* Giriş butonu */}
        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={isLoading}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap 🚀'}
        </Button>

        {/* Demo bilgileri */}
        <div className="login-demo">
          <p className="demo-title">🎯 Demo için:</p>
          <p className="demo-info">
            E-mail: <strong>demo@mindsense.com</strong><br />
            Şifre: <strong>demo123</strong>
          </p>
        </div>
      </form>

      {/* Kayıt ol linki */}
      <div className="login-footer">
        <p className="login-register-text">
          Henüz hesabın yok mu?{' '}
          <Link to="/register" className="login-register-link">
            Hemen Kayıt Ol! ✨
          </Link>
        </p>
      </div>

      {/* Dekoratif elementler */}
      <div className="login-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-star decoration-star-1">⭐</div>
        <div className="decoration-star decoration-star-2">🌟</div>
      </div>
    </div>
  )
}

export default Login 