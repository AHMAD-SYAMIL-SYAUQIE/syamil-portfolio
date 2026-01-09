import { useEffect } from 'react'
import Particles from '../../component/Particles'
import TextGenerateEffect from '../../component/TextGenerateEffect'
import '../../component/TextGenerateEffect.css'
import './IntroScreen.css'

const IntroScreen = () => {
  const welcomeWords = "Welcome  to  The  Zuarr Portofolio"

  return (
    <div className="intro-screen">
      <div className="intro-background">
        <Particles />
      </div>
      
      <div className="intro-content">
        <div className="galaxy-container">
          <div className="galaxy-ring"></div>
          <div className="galaxy-ring"></div>
          <div className="galaxy-ring"></div>
          <div className="galaxy-core"></div>
        </div>
        <div className="welcome-text">
          <TextGenerateEffect 
            words={welcomeWords} 
            duration={0.5}
            filter={true}
          />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen