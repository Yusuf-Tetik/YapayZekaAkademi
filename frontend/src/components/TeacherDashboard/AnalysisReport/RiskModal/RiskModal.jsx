// Riskli analiz detay modal bileşeni
import { FiX, FiAlertTriangle, FiClock, FiTarget } from 'react-icons/fi'
import './RiskModal.css'

function RiskModal({ riskData, studentName, onClose }) {
  console.log('RiskModal rendered with:', { riskData, studentName })
  
  if (!riskData) {
    console.log('RiskModal: No riskData provided, returning null')
    return null
  }

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'anger':
        return '😡'
      case 'fear':
        return '😰'
      case 'sadness':
        return '😢'
      case 'anxiety':
        return '😟'
      default:
        return '⚠️'
    }
  }

  const getEmotionLabel = (emotion) => {
    switch (emotion) {
      case 'anger':
        return 'Öfke'
      case 'fear':
        return 'Korku'
      case 'sadness':
        return 'Üzüntü'
      case 'anxiety':
        return 'Kaygı'
      default:
        return 'Belirsiz'
    }
  }

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="risk-modal-backdrop" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="risk-modal">
        <div className="risk-modal-header">
          <div className="risk-header-content">
            <FiAlertTriangle size={24} className="risk-icon" />
            <div>
              <h3>🚨 Riskli Analiz Raporu</h3>
              <p>Öğrenci: <strong>{studentName}</strong></p>
            </div>
          </div>
          <button className="risk-close-button" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="risk-modal-content">
          {/* Ana Uyarı Mesajı */}
          <div className="risk-warning-box">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">
              <h4>Dikkat Gerekli</h4>
              <p>{riskData.explanation}</p>
            </div>
          </div>

          {/* Analiz Detayları */}
          <div className="risk-details">
            <h4>📋 Analiz Detayları</h4>
            
            <div className="detail-item">
              <div className="detail-label">
                <FiTarget size={16} />
                <span>Riskli İfade</span>
              </div>
              <div className="detail-value risky-phrase">
                "{riskData.riskyPhrase}"
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <span className="emotion-icon">{getEmotionIcon(riskData.emotion)}</span>
                <span>Tespit Edilen Duygu</span>
              </div>
              <div className="detail-value">
                <span className="emotion-tag">
                  {getEmotionLabel(riskData.emotion)}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <span>🎯</span>
                <span>Güven Oranı</span>
              </div>
              <div className="detail-value">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${riskData.confidence}%` }}
                  ></div>
                  <span className="confidence-text">{riskData.confidence}%</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <FiClock size={16} />
                <span>Tespit Zamanı</span>
              </div>
              <div className="detail-value">
                {formatDateTime(riskData.timestamp)}
              </div>
            </div>
          </div>

          {/* Öneriler */}
          <div className="risk-recommendations">
            <h4>💡 Önerilen Aksiyonlar</h4>
            <ul className="recommendations-list">
              <li>👨‍🏫 Öğrenci ile birebir görüşme yapın</li>
              <li>🧠 Rehber öğretmen desteği alın</li>
              <li>👨‍👩‍👧‍👦 Aile ile iletişime geçin</li>
              <li>📝 Durumu kayıt altına alın</li>
            </ul>
          </div>
        </div>

        <div className="risk-modal-footer">
          <button className="action-button primary" onClick={onClose}>
            ✅ Anladım
          </button>
          <button className="action-button secondary">
            📞 Rehber Öğretmeni Ara
          </button>
        </div>
      </div>
    </>
  )
}

export default RiskModal 