import { motion } from 'motion/react'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import './SocialLinks.css'

const SocialLinks = () => {
  const socials = [
    { 
      platform: 'GitHub', 
      icon: <Github size={22} />,
      link: 'https://github.com/AHMAD-SYAMIL-SYAUQIE',
      color: '#fff',
      hoverBg: 'linear-gradient(135deg, #333, #24292e)'
    },
    { 
      platform: 'LinkedIn', 
      icon: <Linkedin size={22} />,
      link: 'https://www.linkedin.com/in/ahmad-syamil-syauqie-/',
      color: '#0077b5',
      hoverBg: 'linear-gradient(135deg, #0077b5, #005582)'
    },
    { 
      platform: 'Discord', 
      icon: <MessageCircle size={22} />,
      link: 'https://discord.com/users/599648521401925658',
      color: '#5865F2',
      hoverBg: 'linear-gradient(135deg, #5865F2, #4752c4)'
    },
    { 
      platform: 'Instagram', 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      link: 'https://www.instagram.com/frezuarrr/',
      color: '#E4405F',
      hoverBg: 'linear-gradient(135deg, #E4405F, #C13584, #833AB4)'
    }
  ]

  return (
    <div className="social-links-container">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          title={social.platform}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-item"
          style={{ 
            '--social-color': social.color,
            '--social-hover-bg': social.hoverBg 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="social-icon">{social.icon}</span>
          <span className="social-tooltip">{social.platform}</span>
        </motion.a>
      ))}
    </div>
  )
}

export default SocialLinks