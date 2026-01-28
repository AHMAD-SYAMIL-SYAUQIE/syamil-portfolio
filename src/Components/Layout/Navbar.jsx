import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact', cta: true },
];

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <nav className="navbar-main">
      <div className="navbar-inner">
        <div className="logo">ZUARR</div>
        <ul className="nav-links-desktop">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={
                  "nav-link-btn" +
                  (item.cta
                    ? " nav-link-cta"
                    : currentPage === item.id
                    ? " nav-link-active"
                    : "")
                }
                onClick={() => setCurrentPage(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="aceternity-hamburger z-[1100]"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="aceternity-menu"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4,0,0.2,1] } }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.28, ease: [0.4,0,0.2,1] } }}
          >
            <div
              className="aceternity-bg"
              onClick={() => setOpen(false)}
            />
            <button
              className="aceternity-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >×</button>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={
                      "aceternity-link" +
                      (item.cta
                        ? " aceternity-cta"
                        : currentPage === item.id
                        ? " aceternity-active"
                        : "")
                    }
                    onClick={() => {
                      setCurrentPage(item.id);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;