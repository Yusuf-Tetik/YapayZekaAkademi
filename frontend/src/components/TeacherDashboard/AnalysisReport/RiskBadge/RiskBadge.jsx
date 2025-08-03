// Risk seviyesi badge bileşeni
import './RiskBadge.css'

function RiskBadge({ level, size = 'normal' }) {
  const getRiskInfo = (level) => {
    switch (level) {
      case 'high':
        return {
          text: 'Yüksek Risk',
          icon: '🔴',
          className: 'risk-high'
        }
      case 'medium':
        return {
          text: 'Orta Risk',
          icon: '🟡',
          className: 'risk-medium'
        }
      case 'low':
        return {
          text: 'Düşük Risk',
          icon: '🟢',
          className: 'risk-low'
        }
      default:
        return {
          text: 'Belirsiz',
          icon: '⚪',
          className: 'risk-unknown'
        }
    }
  }

  const riskInfo = getRiskInfo(level)

  return (
    <div className={`risk-badge ${riskInfo.className} ${size === 'small' ? 'small' : ''}`}>
      <span className="risk-icon">{riskInfo.icon}</span>
      <span className="risk-text">{riskInfo.text}</span>
    </div>
  )
}

export default RiskBadge 