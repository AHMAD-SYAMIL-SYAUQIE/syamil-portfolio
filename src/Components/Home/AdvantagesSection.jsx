import { useState } from 'react'
import './AdvantagesSection.css'

const AdvantagesSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const advantages = [
    { value: '55+', label: 'Tahun Pengalaman' },
    { value: '100+', label: 'Guru Profesional' },
    { value: 'A', label: 'Akreditasi' },
    { value: '1000+', label: 'Siswa Aktif' }
  ]

  return (
    <div className="advantages-section">
      <div className="advantages-grid">
        {advantages.map((adv, index) => (
          <div
            key={index}
            className={`advantage-card ${activeIndex === index ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClickCapture={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <div className="advantage-bar"></div>
            <div className="advantage-value">{adv.value}</div>
            <div className="advantage-label">{adv.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdvantagesSection
