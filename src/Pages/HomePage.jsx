import HeroSection from '../Components/Home/HeroSection'
import SystemStatus from '../Components/Home/SystemStatus'
import useScrollReveal from '../hooks/useScrollReveal'
import './HomePage.css'

const HomePage = ({ setCurrentPage }) => {
  useScrollReveal()

  return (
    <div id="home">
      <div className="home-content">
        <HeroSection setCurrentPage={setCurrentPage} />
        <div className="scroll-reveal">
          <SystemStatus />
        </div>
      </div>
    </div>
  )
}

export default HomePage