import { useState, useEffect, useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState([])
  const skillsRef = useRef(null)
  
  const skills = [
    { name: 'Linux Basic', level: 85, description: 'Command line, System administration' },
    { name: 'C++', level: 75, description: 'Object-oriented programming' },
    { name: 'HTML & CSS', level: 90, description: 'Web design & responsive layout' },
    { name: 'JavaScript', level: 80, description: 'Interactive web applications' },
    { name: 'Java', level: 70, description: 'Backend development' },
    { name: 'Python', level: 85, description: 'Automation & scripting' },
    { name: 'Networking', level: 80, description: 'TCP/IP, Routing, Switching' },
    { name: 'SQL', level: 75, description: 'Database management' },
    { name: 'Git & GitHub', level: 85, description: 'Version control' },
    { name: 'Network Security', level: 70, description: 'Firewall, VPN, Security protocols' }
  ]

  useEffect(() => {
    // Langsung set skills tanpa menunggu IntersectionObserver
    setAnimatedSkills(skills)
  }, [])

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  // Touch support for mobile
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
    <div className="skills-section">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div 
            className="skill-card" 
            key={index}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ '--animation-delay': `${index * 0.1}s` }}
          >
            <h3>{skill.name}</h3>
            <p style={{ color: '#aaa' }}>{skill.description}</p>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ 
                  width: animatedSkills.length > 0 ? `${skill.level}%` : '0%',
                  transition: `width 1.5s ease-in-out ${index * 0.1}s` // Stagger animation
                }}
              ></div>
            </div>
            <div className="skill-level" style={{ color: '#00f7ff', fontSize: '0.9em', marginTop: '5px' }}>
              {skill.level}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills