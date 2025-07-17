// Dashboard Layout bileşeni - Responsive düzen yönetimi
import './DashboardLayout.css'

const DashboardLayout = ({ children }) => {
  return (
    <main className="dashboard-layout">
      {/* Ana içerik alanı */}
      <div className="dashboard-content">
        <div className="content-container">
          {children}
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout 