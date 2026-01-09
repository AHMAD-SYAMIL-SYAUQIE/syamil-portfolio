import './ProfileSection.css'
import profileImage from '../../assets/orang ganteng.jpg'

const ProfileSection = () => {
  const handleMouseMove = (e) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    element.style.setProperty('--mouse-x', `${x}%`)
    element.style.setProperty('--mouse-y', `${y}%`)
  }

  // Touch support for mobile
  const handleTouchMove = (e) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    element.style.setProperty('--mouse-x', `${x}%`)
    element.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <div 
      className="profile-section"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="profile-image-container">
        <div className="profile-ring"></div>
        <div className="profile-ring"></div>
        <div className="profile-image">
          <img src={profileImage} alt="Ahmad Syamil Syauqie" />
        </div>
      </div>
      <div className="profile-info">
        <h2>Ahmad Syamil Syauqie</h2>
        <h3>Network Enthusiast & IT Support Learner</h3>
        <p>
          Passionate about technology and networking, focused on building a solid 
          IT foundation through hands-on experience and continuous learning
        </p>
      </div>
    </div>
  )
}

export default ProfileSection