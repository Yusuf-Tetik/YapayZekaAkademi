// Öğrenci analiz raporları bileşeni
import { useState, useEffect } from 'react'
import FilterBar from './FilterBar/FilterBar'
import AnalysisTable from './AnalysisTable/AnalysisTable'
import './AnalysisReport.css'

// Mock data - gerçek uygulamada API'den gelecek
const mockAnalysisData = [
  {
    id: 1,
    studentName: 'Ahmet Yılmaz',
    class: '3-A',
    date: '2024-01-15',
    summary: 'Matematik dersinde konsantrasyon sorunu',
    warningStatus: 'Orta',
    riskLevel: 'low',
    emotionalState: 'Kaygılı',
    subject: 'Matematik',
    riskDetails: null
  },
  {
    id: 2,
    studentName: 'Ayşe Demir',
    class: '5-B',
    date: '2024-01-14',
    summary: 'Sosyal etkileşimde zorlanma',
    warningStatus: 'Yüksek',
    riskLevel: 'high',
    emotionalState: 'Endişeli',
    subject: 'Sosyal Bilgiler',
    riskDetails: {
      riskyPhrase: "Bu dersi hiç anlamıyorum, hep başarısızım",
      emotion: 'fear',
      confidence: 89,
      timestamp: '2024-01-14 14:23:15',
      explanation: 'Sistemimiz bu ifadede riskli duygu algıladı. Öğrencide düşük öz güven ve korku belirtileri tespit edildi. Lütfen öğrenci ile iletişime geçin.'
    }
  },
  {
    id: 3,
    studentName: 'Mehmet Kaya',
    class: '4-A',
    date: '2024-01-13',
    summary: 'Ders performansında düşüş',
    warningStatus: 'Düşük',
    riskLevel: 'medium',
    emotionalState: 'Normal',
    subject: 'Fen Bilgisi',
    riskDetails: null
  },
  {
    id: 4,
    studentName: 'Fatma Özkan',
    class: '6-C',
    date: '2024-01-12',
    summary: 'Agresif davranış eğilimi',
    warningStatus: 'Kritik',
    riskLevel: 'high',
    emotionalState: 'Öfkeli',
    subject: 'Türkçe',
    riskDetails: {
      riskyPhrase: "Neden hiçbir şey doğru gitmiyor, hep ben suçlanıyorum",
      emotion: 'anger',
      confidence: 94,
      timestamp: '2024-01-12 11:45:22',
      explanation: 'Sistemimiz bu ifadede yüksek düzeyde öfke ve kendini suçlama algıladı. Öğrencide agresif davranış riski bulunmaktadır. Acil müdahale gerekebilir.'
    }
  },
  {
    id: 5,
    studentName: 'Ali Çelik',
    class: '7-B',
    date: '2024-01-11',
    summary: 'Pozitif gelişim gösteriyor',
    warningStatus: 'Yok',
    riskLevel: 'low',
    emotionalState: 'Mutlu',
    subject: 'İngilizce',
    riskDetails: null
  },
  {
    id: 6,
    studentName: 'Zeynep Kara',
    class: '2-A',
    date: '2024-01-10',
    summary: 'Sosyal kaygı belirtileri',
    warningStatus: 'Yüksek',
    riskLevel: 'high',
    emotionalState: 'Endişeli',
    subject: 'Matematik',
    riskDetails: {
      riskyPhrase: "Kimse benimle konuşmak istemiyor, yalnızım",
      emotion: 'sadness',
      confidence: 92,
      timestamp: '2024-01-10 09:15:33',
      explanation: 'Sistemimiz bu ifadede sosyal izolasyon ve üzüntü algıladı. Öğrencide sosyal kaygı ve yalnızlık hissi tespit edildi. Rehber öğretmen desteği önerilir.'
    }
  },
  {
    id: 7,
    studentName: 'Can Özdemir',
    class: '8-A',
    date: '2024-01-09',
    summary: 'Başarılı ders katılımı',
    warningStatus: 'Yok',
    riskLevel: 'low',
    emotionalState: 'Mutlu',
    subject: 'Fen Bilgisi',
    riskDetails: null
  }
]

function AnalysisReport() {
  const [analysisData, setAnalysisData] = useState(mockAnalysisData)
  const [filteredData, setFilteredData] = useState(mockAnalysisData)
  const [filters, setFilters] = useState({
    student: '',
    dateRange: { start: '', end: '' },
    riskLevel: '',
    class: ''
  })

  // Filtreleme işlevi
  useEffect(() => {
    let filtered = analysisData

    // Öğrenci adına göre filtreleme
    if (filters.student) {
      filtered = filtered.filter(item => 
        item.studentName.toLowerCase().includes(filters.student.toLowerCase())
      )
    }

    // Tarih aralığına göre filtreleme
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date)
        const startDate = new Date(filters.dateRange.start)
        const endDate = new Date(filters.dateRange.end)
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    // Risk seviyesine göre filtreleme
    if (filters.riskLevel) {
      filtered = filtered.filter(item => item.riskLevel === filters.riskLevel)
    }

    // Sınıfa göre filtreleme
    if (filters.class) {
      filtered = filtered.filter(item => item.class === filters.class)
    }

    setFilteredData(filtered)
  }, [filters, analysisData])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const clearFilters = () => {
    setFilters({
      student: '',
      dateRange: { start: '', end: '' },
      riskLevel: '',
      class: ''
    })
  }

  return (
    <div className="analysis-report">
      <div className="analysis-header">
        <h2>📊 Öğrenci Analiz Raporları</h2>
        <p className="analysis-subtitle">
          Öğrencilerin geçmiş analiz sonuçlarını görüntüleyin ve filtreleyebilirsiniz
        </p>
      </div>

      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        totalRecords={analysisData.length}
        filteredRecords={filteredData.length}
      />

      <AnalysisTable data={filteredData} />
    </div>
  )
}

export default AnalysisReport 