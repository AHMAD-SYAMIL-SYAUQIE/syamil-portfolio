import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, Download, ExternalLink, ChevronRight, ChevronLeft, Award, Calendar, BookOpen, Sparkles } from 'lucide-react'
import './Certificates.css'

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [imageZoomed, setImageZoomed] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const carouselRef = useRef(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCategory || selectedCertificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCategory, selectedCertificate])

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth
      if (width >= 1201) {
        setItemsPerView(4)
      } else if (width >= 901) {
        setItemsPerView(3)
      } else if (width >= 601) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Data sertifikat dengan struktur hierarkis
  const certificateCategories = [
    {
      id: 'networking',
      title: 'Networking',
      icon: '🌐',
      color: '#00bceb',
      subcategories: [
        {
          name: 'Cisco CCNA',
          certificates: [
            {
              id: 'net-fund',
              title: 'CCNA: Introduction to Networks',
              issuer: 'Cisco Networking Academy',
              date: 'Mar 2025',
              image: '/certificates/_certificate_ahmad-syamil-syauqie-tik24-stu-pnj-ac-id_ad37646b-1f3b-4830-b50f-1bb512507d67.png',
              description: 'Covers basic networking concepts including OSI model, IP addressing, and network devices. Offered by State Polytechnic of Jakarta.',
              skills: ['TCP/IP Fundamentals', 'Network Topologies', 'Basic Routing', 'Subnetting'],
              verifyUrl: 'https://www.credly.com/badges/ec6cdb62-4ae3-496e-aa8f-98634251ce12/public_url',
              downloadUrl: '/certificates/_certificate_ahmad-syamil-syauqie-tik24-stu-pnj-ac-id_ad37646b-1f3b-4830-b50f-1bb512507d67.png'
            },
            {
              id: 'switch-route',
              title: 'CCNA: Switching, Routing, and Wireless Essentials',
              issuer: 'Cisco Networking Academy',
              date: 'Dec 2025',
              image: '/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_ahmad-syamil-syauqie-tik24-stu-pnj-ac-id_161b00d3-8fa0-4fd9-a18d-f17c534aeaeb.png',
              description: 'Advanced concepts in network switching and routing protocols including VLANs, STP, and wireless networking essentials. Offered by Politeknik Negeri Jakarta.',
              skills: ['VLANs', 'STP Protocol', 'OSPF', 'EIGRP', 'Inter-VLAN Routing', 'Wireless Essentials'],
              verifyUrl: 'https://www.credly.com/badges/2789e5d3-607f-4d4a-8961-3a0a0d780d9c/public_url',
              downloadUrl: '/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_ahmad-syamil-syauqie-tik24-stu-pnj-ac-id_161b00d3-8fa0-4fd9-a18d-f17c534aeaeb.png'
            }
          ]
        },
        {
          name: 'Huawei DataCom',
          certificates: [
            {
              id: 'huawei-datacom',
              title: 'HCIA-Datacom',
              issuer: 'Huawei',
              date: 'Nov 2025',
              image: '/certificates/data com.png',
              description: 'Huawei Certified ICT Associate in Datacom covering routing & switching, network security, and network management.',
              skills: ['Routing & Switching', 'Network Security', 'Network Management', 'IP Networking'],
              verifyUrl: 'https://e.huawei.com/en/talent/#/personal/mycert?tab=cert',
              downloadUrl: '/certificates/data com.png'
            }
          ]
        }
      ]
    },
    {
      id: 'os',
      title: 'Operating System',
      icon: '🐧',
      color: '#fcc624',
      subcategories: [
        {
          name: 'Huawei OpenEuler',
          certificates: [
            {
              id: 'huawei-openeuler',
              title: 'HCIA-openEuler',
              issuer: 'Huawei',
              date: 'Jan 2026',
              image: '/certificates/huawei open eluler.png',
              description: 'Huawei Certified ICT Associate in openEuler covering Linux fundamentals, system administration, and openEuler ecosystem.',
              skills: ['Linux Administration', 'openEuler OS', 'System Configuration', 'Shell Scripting'],
              verifyUrl: 'https://e.huawei.com/en/talent/#/personal/mycert?tab=cert',
              downloadUrl: '/certificates/huawei open eluler.png'
            }
          ]
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: '🔒',
      color: '#ff6b6b',
      subcategories: [
        {
          name: 'Security Fundamentals',
          certificates: [
            {
              id: 'cs-cybersec',
              title: 'Fundamental Cyber Security',
              issuer: 'Coding Studio',
              date: 'Oct 2025',
              image: '/certificates/Sertifikat Fundamental Cyber Security - Ahmad Syamil Syauqie - b8n1jg0Drz.png',
              description: 'Fundamental course covering cybersecurity concepts, threats, and basic defense mechanisms. Issued in Jakarta.',
              skills: ['Cyber Threats', 'Security Fundamentals', 'Network Security', 'Data Protection'],
              verifyUrl: 'https://codingstudio.id/',
              downloadUrl: '/certificates/Sertifikat Fundamental Cyber Security - Ahmad Syamil Syauqie - b8n1jg0Drz.png'
            }
          ]
        }
      ]
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      icon: '🤖',
      color: '#9d4edd',
      subcategories: [
        {
          name: 'AI Fundamentals',
          certificates: [
            {
              id: 'dicoding-ai',
              title: 'Belajar Dasar AI',
              issuer: 'Dicoding Indonesia',
              date: '2025',
              image: '/certificates/sertifikat fundamental dasar ai - dicoding.png',
              description: 'Fundamental course covering artificial intelligence concepts and applications.',
              skills: ['AI Fundamentals', 'Machine Learning Basics', 'Neural Networks', 'AI Applications'],
              verifyUrl: 'https://www.dicoding.com/certificates/1RXYQ27RQZVM',
              downloadUrl: '/certificates/sertifikat fundamental dasar ai - dicoding.png'
            }
          ]
        }
      ]
    }
  ]

  // Total slides calculation based on items per view
  const totalCategories = certificateCategories.length
  const maxSlide = Math.max(0, totalCategories - itemsPerView)
  
  // Reset slide if current is out of bounds
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide)
    }
  }, [maxSlide, currentSlide])
  
  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide))
  }

  // Calculate slide percentage based on items per view
  const slidePercentage = 100 / itemsPerView

  // Handle swipe for mobile
  const handleDragEnd = (event, info) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      nextSlide()
    } else if (info.offset.x > threshold) {
      prevSlide()
    }
  }

  // Kategori Card Component
  const CategoryCard = ({ category, index }) => (
    <motion.div
      className="category-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedCategory(category)}
      style={{ '--accent-color': category.color }}
    >
      <div className="category-icon">{category.icon}</div>
      <h3>{category.title}</h3>
      <p>{category.subcategories.reduce((acc, sub) => acc + sub.certificates.length, 0)} Certificates</p>
      <ChevronRight className="category-arrow" />
    </motion.div>
  )

  // Category Detail Modal
  const CategoryModal = ({ category, onClose }) => (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="category-modal"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        style={{ '--accent-color': category.color }}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <span className="modal-icon">{category.icon}</span>
          <h2>{category.title}</h2>
        </div>

        <div className="subcategories-list">
          {category.subcategories.map((subcategory, subIdx) => (
            <div key={subIdx} className="subcategory-section">
              <h3 className="subcategory-title">
                <Award size={18} />
                {subcategory.name}
              </h3>
              <div className="certificates-list">
                {subcategory.certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    className="certificate-item"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98, backgroundColor: 'rgba(0, 247, 255, 0.15)' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCertificate(cert)
                    }}
                  >
                    <div className="cert-item-info">
                      <span className="cert-item-title">{cert.title}</span>
                      <span className="cert-item-issuer">{cert.issuer}</span>
                    </div>
                    <ChevronRight size={18} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )

  // Certificate Detail Modal
  const CertificateDetail = ({ certificate, onClose }) => (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="certificate-detail-modal"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="certificate-detail-content">
          {/* Left Side - Certificate Preview */}
          <div className="certificate-preview-section">
            <motion.div 
              className={`certificate-image-container ${imageZoomed ? 'zoomed' : ''}`}
              onClick={() => setImageZoomed(!imageZoomed)}
              layoutId={`cert-image-${certificate.id}`}
            >
              <img 
                src={certificate.image} 
                alt={certificate.title}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%231a1f3a" width="400" height="300"/><text fill="%2300f7ff" font-family="monospace" font-size="14" x="50%" y="50%" text-anchor="middle">Certificate Preview</text></svg>'
                }}
              />
              <div className="image-overlay">
                <span>{imageZoomed ? 'Click to minimize' : 'Click to zoom'}</span>
              </div>
            </motion.div>

            {/* Buttons moved here - below preview */}
            <div className="cert-actions">
              <a 
                href={certificate.downloadUrl} 
                className="cert-btn cert-btn-primary"
                download
              >
                <Download size={18} />
                Download Certificate
              </a>
              <a 
                href={certificate.verifyUrl} 
                className="cert-btn cert-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={18} />
                Verify Credential
              </a>
            </div>
          </div>

          {/* Right Side - Certificate Info */}
          <div className="certificate-info-section">
            <div className="cert-header">
              <h2>{certificate.title}</h2>
              <p className="cert-issuer">{certificate.issuer}</p>
              <div className="cert-issued-badge">
                <Calendar size={14} />
                <span>Issued: {certificate.date}</span>
              </div>
            </div>

            <div className="cert-detail-block">
              <h4>
                <BookOpen size={18} />
                Description
              </h4>
              <p>{certificate.description}</p>
            </div>

            <div className="cert-detail-block">
              <h4>
                <Sparkles size={18} />
                Skills Gained
              </h4>
              <div className="skills-tags">
                {certificate.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Zoomed Image Overlay */}
      <AnimatePresence>
        {imageZoomed && (
          <motion.div
            className="zoomed-image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImageZoomed(false)}
          >
            <motion.img
              src={certificate.image}
              alt={certificate.title}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect fill="%231a1f3a" width="800" height="600"/><text fill="%2300f7ff" font-family="monospace" font-size="24" x="50%" y="50%" text-anchor="middle">Certificate Preview</text></svg>'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="certificates-section">
      <h2 className="certificates-title">Certifications & Achievements</h2>
      <p className="certificates-subtitle">Swipe or use arrows to explore my certifications</p>
      
      {/* Carousel Container */}
      <div className="carousel-container">
        {/* Navigation Arrows */}
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-viewport" ref={carouselRef}>
          <motion.div 
            className="carousel-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${currentSlide * slidePercentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {certificateCategories.map((category, index) => (
              <div className="carousel-slide" key={category.id}>
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar Indicator */}
      <div className="carousel-indicators">
        <div className="carousel-progress-container">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-progress-bar">
          <motion.div 
            className="carousel-progress-fill"
            initial={{ width: 0 }}
            animate={{ 
              width: maxSlide === 0 ? '100%' : `${((currentSlide + 1) / (maxSlide + 1)) * 100}%` 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <span className="carousel-counter">
          {currentSlide + 1} / {maxSlide + 1}
        </span>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedCategory && !selectedCertificate && (
            <CategoryModal 
              category={selectedCategory} 
              onClose={() => setSelectedCategory(null)} 
            />
          )}
        </AnimatePresence>,
        document.body
      )}

      {createPortal(
        <AnimatePresence>
          {selectedCertificate && (
            <CertificateDetail 
              certificate={selectedCertificate} 
              onClose={() => setSelectedCertificate(null)} 
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

export default Certificates