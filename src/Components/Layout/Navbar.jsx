import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [open, setOpen] = useState(false);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  return (
    <nav className="navbar-main">
      <div className="navbar-inner">
        <div className="logo">ZUARR</div>
        <ul className="nav-links-desktop">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={currentPage === item.id ? 'nav-link-btn nav-link-active' : 'nav-link-btn'}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="hamburger-menu-btn"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu-overlay">
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >×</button>
          <ul className="mobile-menu-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className={currentPage === item.id ? 'mobile-menu-link active' : 'mobile-menu-link'}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;