import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (pageId) => {
    setCurrentPage(pageId);
    setMenuOpen(false); // close menu on nav
  };

  return (
    <nav>
      <div className="logo">ZUARR</div>
      <button
        className="navbar-hamburger"
        aria-label="Open menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={`${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;