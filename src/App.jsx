import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import StarsBackground from './Components/Layout/StarsBackground'
import { ShootingStars } from './component/ShootingStars'
import IntroScreen from './Components/Layout/IntroScreen'
import Navbar from './Components/Layout/Navbar'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ProjectsPage from './Pages/ProjectsPage'
import ContactPage from './Pages/ContactPage'
import './Styles/App.css'
import './Styles/mobile-fix.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showIntro, setShowIntro] = useState(true)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  if (showIntro) {
    return <IntroScreen />
  }

  return (
    <div className="app">
      <StarsBackground />
      <ShootingStars 
        minSpeed={15}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={5000}
        starColor="#9E00FF"
        trailColor="#2EB9DF"
      />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        <div className={`page ${currentPage === 'home' ? 'active' : ''}`}>
          <HomePage setCurrentPage={setCurrentPage} />
        </div>
        <div className={`page ${currentPage === 'about' ? 'active' : ''}`}>
          <AboutPage />
        </div>
        <div className={`page ${currentPage === 'projects' ? 'active' : ''}`}>
          <ProjectsPage />
        </div>
        <div className={`page ${currentPage === 'contact' ? 'active' : ''}`}>
          <ContactPage />
        </div>
      </main>
    </div>
  )
}

export default App