import { useEffect } from 'react'

const StarsBackground = () => {
  useEffect(() => {
    const starsContainer = document.getElementById('stars')

    // Galaxy particles dengan warna cyan/purple/pink
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'galaxy-particle'
      const colors = ['#00f7ff', '#9d4edd', '#ff006e']
      const color = colors[Math.floor(Math.random() * colors.length)]
      particle.style.background = color
      particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${color}`
      particle.style.width = Math.random() * 4 + 2 + 'px'
      particle.style.height = particle.style.width
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 5 + 's'
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
      starsContainer.appendChild(particle)
    }

    // Nebula glow effects
    for (let i = 0; i < 5; i++) {
      const nebula = document.createElement('div')
      nebula.className = 'nebula-glow'
      nebula.style.left = Math.random() * 100 + '%'
      nebula.style.top = Math.random() * 100 + '%'
      nebula.style.animationDelay = Math.random() * 3 + 's'
      nebula.style.animationDuration = (Math.random() * 8 + 12) + 's'
      starsContainer.appendChild(nebula)
    }
  }, [])

  return <div className="stars" id="stars"></div>
}

export default StarsBackground