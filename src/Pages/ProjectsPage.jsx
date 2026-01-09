import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Folder, Filter, Search, Grid3X3, LayoutGrid, Sparkles, Code2, Layers } from 'lucide-react'
import ProjectCard, { ProjectDetailModal } from '../Components/Projects/ProjectCard'
import useScrollReveal from '../hooks/useScrollReveal'
import './ProjectsPage.css'

const ProjectsPage = () => {
  useScrollReveal()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Grid3X3 size={16} /> },
    { id: 'networking', name: 'Networking', icon: '🌐' },
    { id: 'web', name: 'Web Development', icon: '💻' },
    { id: 'automation', name: 'Automation', icon: '⚡' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ]

  const projects = [
    {
      id: 1,
      icon: '🌐',
      title: 'Network Monitoring System',
      description: 'Real-time network traffic analysis and monitoring dashboard with automated alerts and performance metrics.',
      longDescription: 'A comprehensive network monitoring solution that provides real-time visibility into network performance, traffic patterns, and potential security threats. Built with Python and modern web technologies, this system enables IT teams to proactively identify and resolve network issues before they impact business operations.',
      tags: ['Python', 'Flask', 'SNMP', 'Chart.js', 'SQLite', 'REST API'],
      category: 'networking',
      status: 'Completed',
      featured: true,
      color: '#00bceb',
      date: 'Nov 2025',
      demoUrl: '#',
      githubUrl: '#',
      highlights: [
        'Real-time traffic monitoring with live graphs',
        'Automated alert system via email and SMS',
        'Device discovery and inventory management',
        'Historical data analysis and reporting'
      ],
      features: [
        'SNMP-based device polling with configurable intervals',
        'Bandwidth utilization monitoring and trending',
        'Custom dashboard with drag-and-drop widgets',
        'Multi-tenant support for enterprise deployment',
        'RESTful API for third-party integrations',
        'Automated backup of configurations'
      ],
      stats: [
        { value: '50+', label: 'Devices Monitored' },
        { value: '99.9%', label: 'Uptime' },
        { value: '<1s', label: 'Alert Response' }
      ],
      techDetails: [
        { label: 'Backend', value: 'Python 3.11, Flask' },
        { label: 'Database', value: 'SQLite, Redis' },
        { label: 'Frontend', value: 'HTML5, Chart.js' },
        { label: 'Protocol', value: 'SNMP v2c/v3' }
      ]
    },
    {
      id: 2,
      icon: '🎫',
      title: 'IT Helpdesk Portal',
      description: 'Comprehensive ticketing system for IT support management with priority-based routing and SLA tracking.',
      longDescription: 'An enterprise-grade IT helpdesk solution designed to streamline support operations. Features intelligent ticket routing, SLA management, and comprehensive reporting to improve response times and customer satisfaction.',
      tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'jQuery', 'REST API'],
      category: 'web',
      status: 'Completed',
      color: '#9d4edd',
      date: 'Oct 2025',
      demoUrl: '#',
      githubUrl: '#',
      highlights: [
        'Intelligent ticket categorization and routing',
        'SLA tracking with escalation rules',
        'Knowledge base with search functionality',
        'Customer satisfaction surveys'
      ],
      features: [
        'Multi-department ticket management',
        'Priority-based queue system',
        'Email integration for ticket creation',
        'Asset management integration',
        'Time tracking and reporting',
        'Mobile-responsive interface'
      ],
      stats: [
        { value: '1000+', label: 'Tickets Resolved' },
        { value: '4.8/5', label: 'User Rating' },
        { value: '2hr', label: 'Avg Response' }
      ]
    },
    {
      id: 3,
      icon: '⚙️',
      title: 'Network Config Automation',
      description: 'Automated network device configuration and backup management using Ansible and Python scripts.',
      longDescription: 'A powerful automation toolkit for network engineers to manage device configurations at scale. Leverages Ansible playbooks and custom Python scripts to automate repetitive tasks, ensure consistency, and maintain compliance across the network infrastructure.',
      tags: ['Python', 'Ansible', 'Netmiko', 'YAML', 'Git', 'Linux'],
      category: 'automation',
      status: 'In-Progress',
      color: '#00ff88',
      date: 'Dec 2025',
      githubUrl: '#',
      highlights: [
        'Template-based configuration deployment',
        'Automated backup scheduling',
        'Configuration drift detection',
        'Version control integration'
      ],
      features: [
        'Support for Cisco, Juniper, and Huawei devices',
        'Rollback capability for failed deployments',
        'Parallel execution for faster operations',
        'Detailed logging and audit trail',
        'Integration with Git for version control',
        'Custom Jinja2 templates for configurations'
      ],
      stats: [
        { value: '200+', label: 'Devices Managed' },
        { value: '90%', label: 'Time Saved' },
        { value: '0', label: 'Config Errors' }
      ]
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Security Audit Tool',
      description: 'Network security assessment tool for vulnerability scanning and compliance checking.',
      longDescription: 'A security-focused tool designed to help organizations assess their network security posture. Performs automated vulnerability scans, compliance checks, and generates detailed reports with remediation recommendations.',
      tags: ['Python', 'Nmap', 'OpenVAS', 'Docker', 'PostgreSQL'],
      category: 'security',
      status: 'Planned',
      color: '#ff006e',
      date: '2026',
      highlights: [
        'Automated vulnerability scanning',
        'Compliance framework support (CIS, NIST)',
        'Risk scoring and prioritization',
        'Executive summary reports'
      ],
      features: [
        'Port scanning and service detection',
        'CVE database integration',
        'Custom scan profiles',
        'Scheduled assessments',
        'PDF report generation',
        'API for CI/CD integration'
      ]
    },
    {
      id: 5,
      icon: '📊',
      title: 'Network Traffic Analyzer',
      description: 'Deep packet inspection tool for analyzing network traffic patterns and detecting anomalies.',
      longDescription: 'An advanced network analysis tool that captures and analyzes network packets to provide insights into traffic patterns, protocol distribution, and potential security threats. Features machine learning-based anomaly detection.',
      tags: ['Python', 'Scapy', 'Pandas', 'TensorFlow', 'Elasticsearch'],
      category: 'networking',
      status: 'In-Progress',
      color: '#00f7ff',
      date: 'Jan 2026',
      githubUrl: '#',
      highlights: [
        'Real-time packet capture and analysis',
        'Protocol breakdown visualization',
        'ML-based anomaly detection',
        'Historical trend analysis'
      ],
      features: [
        'Support for pcap file analysis',
        'Custom filter expressions',
        'Traffic flow visualization',
        'Bandwidth utilization reports',
        'Integration with SIEM systems',
        'Alert notifications'
      ],
      stats: [
        { value: '10Gbps', label: 'Max Throughput' },
        { value: '100+', label: 'Protocols' },
        { value: '95%', label: 'Detection Rate' }
      ]
    },
    {
      id: 6,
      icon: '🌟',
      title: 'Personal Portfolio Website',
      description: 'Modern, responsive portfolio website with stunning animations and space-themed design.',
      longDescription: 'A showcase of my skills and projects, built with React and featuring smooth animations, interactive elements, and a unique space-inspired aesthetic. Demonstrates proficiency in modern frontend development practices.',
      tags: ['React', 'Vite', 'Framer Motion', 'CSS3', 'JavaScript'],
      category: 'web',
      status: 'Completed',
      featured: true,
      color: '#9d4edd',
      date: 'Dec 2025',
      demoUrl: '#',
      githubUrl: '#',
      highlights: [
        'Smooth scroll animations',
        'Interactive particle background',
        'Responsive design for all devices',
        'Optimized performance'
      ],
      features: [
        'Custom animated components',
        'Dark mode space theme',
        'Certificate showcase with modals',
        'Project gallery with filters',
        'Contact form integration',
        'SEO optimized'
      ],
      stats: [
        { value: '95+', label: 'Performance Score' },
        { value: '100%', label: 'Responsive' },
        { value: 'A+', label: 'Accessibility' }
      ]
    }
  ]

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  // Featured projects
  const featuredProjects = projects.filter(p => p.featured)

  // Project stats
  const projectStats = [
    { value: projects.length, label: 'Total Projects', icon: <Folder size={20} /> },
    { value: projects.filter(p => p.status === 'Completed').length, label: 'Completed', icon: <Sparkles size={20} /> },
    { value: projects.filter(p => p.status === 'In-Progress').length, label: 'In Progress', icon: <Code2 size={20} /> },
    { value: [...new Set(projects.flatMap(p => p.tags))].length, label: 'Technologies', icon: <Layers size={20} /> }
  ]

  return (
    <div id="projects" className="projects-page">
      {/* Header Section */}
      <div className="projects-header scroll-reveal">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="header-label">
            <Code2 size={18} />
            Portfolio
          </span>
          <h1>My Projects</h1>
          <p className="header-subtitle">
            Exploring digital innovations through networking, web development, and automation solutions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="stats-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projectStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="featured-section scroll-reveal">
          <h2 className="section-title">
            <Sparkles size={22} />
            Featured Projects
          </h2>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Filter & Search Section */}
      <section className="filter-section scroll-reveal">
        <div className="filter-header">
          <h2 className="section-title">
            <Folder size={22} />
            All Projects
          </h2>
          
          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          <Filter size={16} />
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              <span className="filter-icon">
                {typeof category.icon === 'string' ? category.icon : category.icon}
              </span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <AnimatePresence mode="wait">
          <motion.div 
            className={`projects-grid ${viewMode}`}
            key={activeFilter + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="project-item"
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="no-projects-icon">🔍</span>
                <h3>No projects found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsPage