import { useState } from 'react'
import './FeaturesSection.css'

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const features = [
    {
      icon: '👨‍🏫',
      title: 'Guru Berpengalaman',
      description: 'Tenaga pengajar profesional dan bersertifikasi yang tidak hanya mengajarkan ilmu, tetapi juga membentuk karakter unggul.'
    },
    {
      icon: '⭐',
      title: 'Terakreditasi A',
      description: 'Kualitas pendidikan terjamin dengan akreditasi A yang memberikan peluang lebih luas untuk masa depan.'
    },
    {
      icon: '🏆',
      title: 'Prestasi Gemilang',
      description: 'Raihan prestasi akademik dan non-akademik di tingkat nasional maupun internasional.'
    },
    {
      icon: '📚',
      title: 'Kurikulum Pengerak',
      description: 'Menerapkan Kurikulum Sekolah Pengerak yang inovatif dan berbasis teknologi untuk pembelajaran efektif.'
    }
  ]

  return (
    <div className="features-section">
      <h2 className="features-title">Keunggulan Kami</h2>
      <p className="features-subtitle">Fasilitas dan program unggulan untuk masa depan gemilang</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${hoveredIndex === index ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="feature-icon-wrapper">
              <div className="feature-icon">{feature.icon}</div>
              <div className="icon-glow"></div>
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="feature-border"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
