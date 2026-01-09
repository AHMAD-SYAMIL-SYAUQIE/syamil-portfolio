import { useState, useEffect } from 'react'
import ShinyText from '../../component/ShinyText'
import { MovingBorder } from '../../component/MovingBorder'
import './HeroSection.css'
import '../../component/MovingBorder.css'

const HeroSection = ({ setCurrentPage }) => {
  const [typingText, setTypingText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = [
    'Network Enthusiast',
    'IT Support Learner',
    'Future Network Engineer',
    'Junior IT Technician',
    'Networking & Infrastructure Learner',
    'Technology Enthusiast'
  ]

  useEffect(() => {
    let timeoutId

    const typeEffect = () => {
      const currentText = typingTexts[textIndex]

      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)

        if (charIndex === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % typingTexts.length)
          timeoutId = setTimeout(typeEffect, 100)
        } else {
          timeoutId = setTimeout(typeEffect, 50)
        }
      } else {
        setTypingText(currentText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)

        if (charIndex === currentText.length) {
          setIsDeleting(true)
          timeoutId = setTimeout(typeEffect, 2000)
        } else {
          timeoutId = setTimeout(typeEffect, 100)
        }
      }
    }

    timeoutId = setTimeout(typeEffect, 100)

    return () => clearTimeout(timeoutId)
  }, [textIndex, charIndex, isDeleting, typingTexts])

  return (
    <div className="hero-section">
      <div className="hero-text">
        <div className="hero-greeting">
          <span className="greeting-text">Hi, I'm</span>
          <h1 className="hero-name">
            <ShinyText text="Ahmad Syamil Syauqie" speed={6} />
          </h1>
        </div>
        <div className="typing-text">{typingText}</div>
        <p><ShinyText text="Connecting digital worlds through reliable networking and modern IT systems." speed={6} /></p>
        <div className="cta-buttons">
          <MovingBorder
            as="a"
            href="#"
            borderRadius="12px"
            duration={3000}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('projects')
            }}
          >
            View Projects
          </MovingBorder>
          <MovingBorder
            as="a"
            href="#"
            borderRadius="12px"
            duration={3000}
            containerClassName="moving-border-secondary"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('contact')
            }}
          >
            Get In Touch
          </MovingBorder>
        </div>
      </div>
      <div className="hero-visual">
        <div className="network-orb-container">
          <div className="orb-core"></div>
          <div className="network-node"></div>
          <div className="network-node"></div>
          <div className="network-node"></div>
          <div className="network-node"></div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection