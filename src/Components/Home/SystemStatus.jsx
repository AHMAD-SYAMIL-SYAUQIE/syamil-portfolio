import './SystemStatus.css'

const SystemStatus = () => {
  const stats = [
    { icon: '📊', value: '25+', label: 'Projects' },
    { icon: '🎓', value: '6+', label: 'Certificates' },
    { icon: '⚡', value: '24/7', label: 'Support' },
    { icon: '🌐', value: '100%', label: 'Dedication' }
  ]

  return (
    <div className="system-status-wrapper">
      <div className="status-line left"></div>
      <div className="system-status-bar">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="status-line right"></div>
    </div>
  )
}

export default SystemStatus