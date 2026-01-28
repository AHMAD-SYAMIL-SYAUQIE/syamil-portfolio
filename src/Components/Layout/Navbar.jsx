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

  // Disable scroll & add menu-open class saat menu open
  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000]">
      <div className="flex justify-between items-center px-5 py-4">
        <div className="text-cyan-400 font-bold text-xl tracking-widest drop-shadow-glow">ZUARR</div>
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
            <ul className="relative z-10 flex flex-col items-center justify-center h-full gap-7">
              {navItems.map((item) => (
                <li key={item.id} className="w-full flex justify-center">
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