import { motion } from 'motion/react'
import { Mail, MapPin, Clock, Send, MessageSquare, Sparkles } from 'lucide-react'
import ContactForm from '../Components/Contact/ContactForm'
import SocialLinks from '../Components/Contact/SocialLinks'
import BoxesBackground from '../component/BoxesBackground'
import '../component/BoxesBackground.css'
import useScrollReveal from '../hooks/useScrollReveal'
import './ContactPage.css'

const ContactPage = () => {
  useScrollReveal()

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'ahmadsyamil.dev@gmail.com',
      subtitle: 'Drop me a line anytime',
      color: '#00f7ff'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Indonesia',
      subtitle: 'Available for remote work',
      color: '#9d4edd'
    },
    {
      icon: <Clock size={24} />,
      title: 'Response Time',
      value: '< 24 Hours',
      subtitle: 'Usually faster!',
      color: '#00ff88'
    }
  ]

  return (
    <div id="contact" className="contact-page">
      {/* Interactive Boxes Background - Optimized for performance */}
      <BoxesBackground rows={8} cols={12} />
      
      {/* Animated Background Elements */}
      <div className="contact-bg-elements">
        <div className="contact-gradient-orb orb-1"></div>
        <div className="contact-gradient-orb orb-2"></div>
      </div>

      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header scroll-reveal">
          <motion.div
            className="header-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare size={16} />
            <span>Let's Connect</span>
          </motion.div>
          
          <h1 className="contact-title">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello? 
            I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="contact-content">
          {/* Left Side - Contact Info */}
          <div className="contact-info-section scroll-reveal">
            {/* Contact Info Cards */}
            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-info-card"
                  style={{ '--card-color': info.color }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="info-card-icon">
                    {info.icon}
                  </div>
                  <div className="info-card-content">
                    <span className="info-card-title">{info.title}</span>
                    <span className="info-card-value">{info.value}</span>
                    <span className="info-card-subtitle">{info.subtitle}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Response Card */}
            <motion.div 
              className="quick-response-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="quick-response-header">
                <Sparkles size={20} />
                <h3>Let's Connect</h3>
              </div>
              <p>
                I'm always excited to discuss new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
              <div className="availability-status">
                <span className="status-dot"></span>
                <span>Open for internship & collaboration opportunities</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="contact-social-section">
              <h4>Find me on</h4>
              <SocialLinks />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section scroll-reveal-scale">
            <div className="form-card">
              <div className="form-card-header">
                <Send size={24} />
                <h2>Send me a message</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage