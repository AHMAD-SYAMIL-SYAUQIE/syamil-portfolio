import './Navbar.css'

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleClick = (pageId) => {
    setCurrentPage(pageId)
  }

  return (
    <nav>
      <div className="logo">ZUARR</div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={`${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.id)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar