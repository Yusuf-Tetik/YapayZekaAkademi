// Ders özel yapay zeka sohbet arayüzü
import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiSend, FiMic, FiMicOff } from 'react-icons/fi'
import Button from '../shared/Button/Button'
import './LessonChat.css'

// API çağrısı fonksiyonu - gerçek backend ile entegre edilecek
const callAIAPI = async (message, lesson) => {
  // Mock API çağrısı - gerçek endpoint ile değiştirilecek
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     message: message,
  //     lesson: lesson.name,
  //     lessonId: lesson.id
  //   })
  // })
  // 
  // if (!response.ok) {
  //   throw new Error('API çağrısı başarısız')
  // }
  // 
  // return await response.json()
  
  // Şimdilik mock response döndür
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        content: `Bu harika bir soru! ${lesson?.name} dersi hakkında soruduğun "${message}" sorusuna cevap vereyim...\n\nBu konuyu daha iyi anlamak için birlikte çalışabiliriz! Başka sorun var mı? 🤔`
      })
    }, 1500)
  })
}

const LessonChat = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const messagesEndRef = useRef(null)
  
  // URL state'ten ders bilgisini al
  const lesson = location.state?.lesson
  
  // Chat state'leri
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  
  // İlk karşılama mesajını ekle
  useEffect(() => {
    if (lesson) {
      const welcomeMessage = {
        id: 1,
        type: 'ai',
        content: `Merhaba! ${lesson.name} çalışmaya hoş geldin! 🎉\n\nBen senin ${lesson.name} asistanınım. ${lesson.description} konularında sana yardımcı olabilirim. \n\nBana istediğin soruyu sorabilirsin! 😊`,
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMessage])
    }
  }, [lesson])
  
  // Mesajları scroll et
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsLoading(true)
    
    try {
      // API çağrısı - gerçek backend endpoint'i ile değiştirilecek
      const response = await callAIAPI(newMessage, lesson)
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error)
      
      // Hata durumunda kullanıcıya bilgi ver
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Üzgünüm, şu an bir teknik sorun yaşıyorum. Lütfen biraz sonra tekrar deneyin. 😔',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Enter tuşu ile mesaj gönder
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  // Mikrofon butonu (şimdilik pasif)
  const handleMicrophoneClick = () => {
    if (isRecording) {
      setIsRecording(false)
      // Gelecekte: Kayıt durdur ve metne dönüştür
      console.log('Ses kaydı durduruldu - Gelecekte metne dönüştürülecek')
    } else {
      setIsRecording(true)
      // Gelecekte: Ses kaydı başlat
      console.log('Ses kaydı başlatıldı - Gelecekte API entegrasyonu')
      
      // Demo için 3 saniye sonra otomatik durdur
      setTimeout(() => {
        setIsRecording(false)
        setNewMessage('Bu sesli mesaj örneğidir (gelecekte gerçek ses tanıma olacak)')
      }, 3000)
    }
  }

  // Geri dön
  const handleGoBack = () => {
    navigate('/dashboard')
  }
  
  // Eğer ders bilgisi yoksa dashboard'a yönlendir
  if (!lesson) {
    navigate('/dashboard')
    return null
  }
  
  return (
    <div className="lesson-chat">
      {/* Üst header */}
      <div className="lesson-chat-header">
        <div className="header-content">
          <div className="lesson-info">
            <span className="lesson-icon">{lesson.icon}</span>
            <div className="lesson-details">
              <h1 className="lesson-title">{lesson.name}</h1>
              <p className="lesson-subtitle">AI Asistan</p>
            </div>
          </div>
          
          <Button
            variant="secondary"
            size="small"
            onClick={handleGoBack}
            className="back-button"
          >
            <FiArrowLeft />
            Geri Dön
          </Button>
        </div>
      </div>
      
      {/* Chat mesajları alanı */}
      <div className="chat-messages">
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type === 'user' ? 'message-user' : 'message-ai'}`}
            >
              <div className="message-content">
                <div className="message-bubble">
                  {message.content.split('\n').map((line, index) => (
                    <div key={index}>
                      {line}
                      {index < message.content.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading mesajı */}
          {isLoading && (
            <div className="message message-ai">
              <div className="message-content">
                <div className="message-bubble message-loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Mesaj girişi alanı */}
      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? 'Konuşuyor... 🎙️' : `${lesson.name} hakkında soru sor...`}
            className="message-input"
            rows={1}
            disabled={isLoading || isRecording}
          />
          
          {/* Mikrofon butonu */}
          <Button
            onClick={handleMicrophoneClick}
            disabled={isLoading}
            className={`microphone-button ${isRecording ? 'recording' : ''}`}
            size="small"
            title={isRecording ? 'Kaydı durdur' : 'Sesli mesaj gönder'}
          >
            {isRecording ? <FiMicOff /> : <FiMic />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading || isRecording}
            className="send-button"
            size="small"
          >
            <FiSend />
          </Button>
        </div>
        
        {/* Sesli kayıt durumu */}
        {isRecording && (
          <div className="recording-status">
            <div className="recording-animation">
              <div className="recording-dot"></div>
            </div>
            <span>Dinliyorum... (3 saniye demo)</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonChat 