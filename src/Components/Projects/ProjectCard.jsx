import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, ExternalLink, Github, Calendar, Layers, Sparkles, Code2, Eye, ArrowUpRight } from 'lucide-react'
import './ProjectCard.css'

const ProjectCard = ({ project, onClick }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  const handleTouchMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <motion.div 
      className="project-card"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={onClick}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ '--project-color': project.color || '#00f7ff' }}
    >
      {/* Status Badge */}
      {project.status && (
        <div className={`project-status ${project.status.toLowerCase()}`}>
          <span className="status-dot"></span>
          {project.status}
        </div>
      )}

      {/* Featured Badge */}
      {project.featured && (
        <div className="featured-badge">
          <Sparkles size={14} />
          Featured
        </div>
      )}

      {/* Project Image/Preview */}
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="project-icon-wrapper">
            <span className="project-icon">{project.icon}</span>
            <div className="icon-glow"></div>
          </div>
        )}
        <div className="image-overlay">
          <Eye size={24} />
          <span>View Details</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <div className="project-header">
          <h3>{project.title}</h3>
          <ArrowUpRight className="arrow-icon" size={20} />
        </div>
        <p className="project-description">{project.description}</p>
        
        {/* Tags */}
        <div className="project-tags">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span className="tag" key={index}>{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag tag-more">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Quick Links */}
        <div className="project-links">
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              className="project-link demo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              className="project-link github"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Project Detail Modal Component
export const ProjectDetailModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')

  if (!project) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-detail-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          style={{ '--project-color': project.color || '#00f7ff' }}
        >
          {/* Close Button */}
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          {/* Modal Content */}
          <div className="modal-content">
            {/* Left Side - Preview */}
            <div className="modal-preview">
              <div className="preview-image-container">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="preview-placeholder">
                    <span className="preview-icon">{project.icon}</span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="preview-gallery">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="gallery-thumb">
                      <img src={img} alt={`Screenshot ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    className="modal-btn primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    className="modal-btn secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="modal-details">
              {/* Header */}
              <div className="detail-header">
                <div className="header-top">
                  {project.status && (
                    <span className={`status-badge ${project.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {project.status}
                    </span>
                  )}
                  {project.category && (
                    <span className="category-badge">
                      <Layers size={14} />
                      {project.category}
                    </span>
                  )}
                </div>
                <h2>{project.title}</h2>
                {project.date && (
                  <div className="project-date">
                    <Calendar size={14} />
                    {project.date}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="detail-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tech')}
                >
                  Tech Stack
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <motion.div 
                    className="tab-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <p className="long-description">
                      {project.longDescription || project.description}
                    </p>
                    {project.highlights && (
                      <div className="highlights">
                        <h4><Sparkles size={16} /> Highlights</h4>
                        <ul>
                          {project.highlights.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div 
                    className="tab-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {project.features ? (
                      <ul className="features-list">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>
                            <Code2 size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-data">No features listed</p>
                    )}
                  </motion.div>
                )}

                {activeTab === 'tech' && (
                  <motion.div 
                    className="tab-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="tech-stack">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    {project.techDetails && (
                      <div className="tech-details">
                        {project.techDetails.map((detail, idx) => (
                          <div key={idx} className="tech-detail-item">
                            <span className="tech-label">{detail.label}</span>
                            <span className="tech-value">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Stats */}
              {project.stats && (
                <div className="project-stats">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="stat-item">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default ProjectCard