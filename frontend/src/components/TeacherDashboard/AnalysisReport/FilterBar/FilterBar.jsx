// Analiz raporu filtreleme bileşeni
import { useState } from 'react'
import './FilterBar.css'

function FilterBar({ filters, onFilterChange, onClearFilters, totalRecords, filteredRecords }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Sınıf seçenekleri (2-8 arası)
  const classOptions = [
    { value: '', label: 'Tüm Sınıflar' },
    { value: '2-A', label: '2-A' },
    { value: '2-B', label: '2-B' },
    { value: '3-A', label: '3-A' },
    { value: '3-B', label: '3-B' },
    { value: '4-A', label: '4-A' },
    { value: '4-B', label: '4-B' },
    { value: '5-A', label: '5-A' },
    { value: '5-B', label: '5-B' },
    { value: '6-A', label: '6-A' },
    { value: '6-B', label: '6-B' },
    { value: '6-C', label: '6-C' },
    { value: '7-A', label: '7-A' },
    { value: '7-B', label: '7-B' },
    { value: '8-A', label: '8-A' },
    { value: '8-B', label: '8-B' }
  ]

  // Risk seviyesi seçenekleri
  const riskLevelOptions = [
    { value: '', label: 'Tüm Risk Seviyeleri' },
    { value: 'low', label: '🟢 Düşük Risk' },
    { value: 'medium', label: '🟡 Orta Risk' },
    { value: 'high', label: '🔴 Yüksek Risk' }
  ]

  const handleInputChange = (field, value) => {
    if (field === 'dateRange') {
      onFilterChange({ dateRange: value })
    } else {
      onFilterChange({ [field]: value })
    }
  }

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...filters.dateRange, [type]: value }
    handleInputChange('dateRange', newDateRange)
  }

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (typeof value === 'object') {
      return count + (value.start || value.end ? 1 : 0)
    }
    return count + (value ? 1 : 0)
  }, 0)

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <div className="filter-info">
          <span className="results-count">
            {filteredRecords} / {totalRecords} kayıt gösteriliyor
          </span>
          {activeFiltersCount > 0 && (
            <span className="active-filters">
              ({activeFiltersCount} filtre aktif)
            </span>
          )}
        </div>
        
        <div className="filter-controls">
          <button 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            🔍 {isExpanded ? 'Filtreleri Gizle' : 'Filtreleri Göster'}
          </button>
          
          {activeFiltersCount > 0 && (
            <button 
              className="clear-filters-button"
              onClick={onClearFilters}
            >
              🗑️ Temizle
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-row">
            <div className="filter-group">
              <label>Öğrenci Arama</label>
              <input
                type="text"
                placeholder="Öğrenci adı ile ara..."
                value={filters.student}
                onChange={(e) => handleInputChange('student', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Sınıf</label>
              <select
                value={filters.class}
                onChange={(e) => handleInputChange('class', e.target.value)}
                className="filter-select"
              >
                {classOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Risk Seviyesi</label>
              <select
                value={filters.riskLevel}
                onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                className="filter-select"
              >
                {riskLevelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group date-group">
              <label>Tarih Aralığı</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="filter-input date-input"
                />
                <span className="date-separator">-</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="filter-input date-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar 