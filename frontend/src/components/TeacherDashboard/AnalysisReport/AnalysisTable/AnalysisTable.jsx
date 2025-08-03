// Analiz raporu tablo bileşeni
import { useState } from 'react'
import RiskBadge from '../RiskBadge/RiskBadge'
import RiskModal from '../RiskModal/RiskModal'
import './AnalysisTable.css'

function AnalysisTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [selectedRow, setSelectedRow] = useState(null)
  const [riskModalData, setRiskModalData] = useState(null)

  // Sıralama işlevi
  const sortData = (data, config) => {
    if (!config.key) return data

    return [...data].sort((a, b) => {
      if (config.key === 'date') {
        const dateA = new Date(a[config.key])
        const dateB = new Date(b[config.key])
        return config.direction === 'asc' ? dateA - dateB : dateB - dateA
      }
      
      if (config.key === 'riskLevel') {
        const riskOrder = { high: 3, medium: 2, low: 1 }
        const riskA = riskOrder[a[config.key]] || 0
        const riskB = riskOrder[b[config.key]] || 0
        return config.direction === 'asc' ? riskA - riskB : riskB - riskA
      }

      const aValue = a[config.key]?.toString().toLowerCase() || ''
      const bValue = b[config.key]?.toString().toLowerCase() || ''
      
      if (aValue < bValue) return config.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return config.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕️'
    return sortConfig.direction === 'asc' ? '⬆️' : '⬇️'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getWarningIcon = (warningStatus) => {
    switch (warningStatus) {
      case 'Kritik':
        return '🚨'
      case 'Yüksek':
        return '⚠️'
      case 'Orta':
        return '🟡'
      case 'Düşük':
        return '🟢'
      default:
        return '✅'
    }
  }

  const getWarningClass = (warningStatus) => {
    switch (warningStatus) {
      case 'Kritik':
        return 'warning-critical'
      case 'Yüksek':
        return 'warning-high'
      case 'Orta':
        return 'warning-medium'
      case 'Düşük':
        return 'warning-low'
      default:
        return 'warning-none'
    }
  }

  const sortedData = sortData(data, sortConfig)

  if (data.length === 0) {
    return (
      <div className="analysis-table-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Gösterilecek analiz bulunamadı</h3>
          <p>Filtreleri değiştirmeyi deneyin veya farklı kriterler kullanın.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analysis-table-container">
      <div className="table-wrapper">
        <table className="analysis-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('studentName')} className="sortable">
                Öğrenci Adı {getSortIcon('studentName')}
              </th>
              <th onClick={() => handleSort('class')} className="sortable">
                Sınıf {getSortIcon('class')}
              </th>
              <th onClick={() => handleSort('date')} className="sortable">
                Tarih {getSortIcon('date')}
              </th>
              <th onClick={() => handleSort('subject')} className="sortable">
                Ders {getSortIcon('subject')}
              </th>
              <th>Analiz Özeti</th>
              <th onClick={() => handleSort('warningStatus')} className="sortable">
                Uyarı Durumu {getSortIcon('warningStatus')}
              </th>
              <th onClick={() => handleSort('riskLevel')} className="sortable">
                Risk Seviyesi {getSortIcon('riskLevel')}
              </th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr 
                key={item.id} 
                className={`table-row ${item.riskLevel === 'high' ? 'high-risk' : ''} ${selectedRow === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedRow(selectedRow === item.id ? null : item.id)}
              >
                <td className="student-name">
                  <div className="student-info">
                    <span className="name">{item.studentName}</span>
                    <span className="emotion">{item.emotionalState}</span>
                  </div>
                </td>
                <td className="class-cell">
                  <span className="class-badge">{item.class}</span>
                </td>
                <td className="date-cell">
                  {formatDate(item.date)}
                </td>
                <td className="subject-cell">
                  {item.subject}
                </td>
                <td className="summary-cell">
                  <div className="summary-text">
                    {item.summary}
                  </div>
                </td>
                                 <td className="warning-cell">
                   <div className={`warning-badge ${getWarningClass(item.warningStatus)}`}>
                     {getWarningIcon(item.warningStatus)} {item.warningStatus}
                   </div>
                 </td>
                <td className="risk-cell">
                  <RiskBadge level={item.riskLevel} />
                </td>
                                 <td className="actions-cell">
                   <button 
                     className="action-button view-button"
                     onClick={(e) => {
                       e.stopPropagation()
                       console.log('Detay görüntüle:', item)
                     }}
                   >
                     👁️ Detay
                   </button>
                   {item.riskLevel === 'high' && item.riskDetails && (
                     <button 
                       className="action-button risk-button"
                       onClick={(e) => {
                         e.stopPropagation()
                         console.log('Risk button clicked, item:', item)
                         console.log('Risk details:', item.riskDetails)
                         const modalData = { ...item.riskDetails, studentName: item.studentName }
                         console.log('Setting modal data:', modalData)
                         setRiskModalData(modalData)
                       }}
                       title="Riskli analiz detaylarını göster"
                     >
                       🚨 Risk Raporu
                     </button>
                   )}
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="legend">
          <span className="legend-title">Risk Seviyeleri:</span>
          <div className="legend-items">
            <span className="legend-item">🟢 Düşük</span>
            <span className="legend-item">🟡 Orta</span>
            <span className="legend-item">🔴 Yüksek</span>
          </div>
        </div>
      </div>
      
      {/* Risk Modal */}
      {riskModalData && (
        <RiskModal
          riskData={riskModalData}
          studentName={riskModalData.studentName}
          onClose={() => {
            console.log('Closing risk modal')
            setRiskModalData(null)
          }}
        />
      )}
      
      {/* Debug: Modal state */}
      {console.log('Current riskModalData:', riskModalData)}
    </div>
  )
}

export default AnalysisTable 