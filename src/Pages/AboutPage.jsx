import ProfileSection from '../Components/About/ProfileSection'
import Certificates from '../Components/About/Certificates'
import Skills from '../Components/About/Skills'
import useScrollReveal from '../hooks/useScrollReveal'
import './AboutPage.css'

const AboutPage = () => {
  useScrollReveal()

  return (
    <div id="about">
      <div className="about-content">
        <div className="about-header scroll-reveal">
          <h1>About Me</h1>
          <p style={{ color: '#aaa', fontSize: '1.2em' }}>Navigating the Network of code and connectivity</p>
        </div>

        <div className="scroll-reveal-scale">
          <ProfileSection />
        </div>
        <div className="scroll-reveal-left">
          <Certificates />
        </div>
        <div className="scroll-reveal-right">
          <Skills />
        </div>
      </div>
    </div>
  )
}

export default AboutPage