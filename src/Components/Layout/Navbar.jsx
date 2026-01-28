import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleClick = (pageId) => {
    setCurrentPage(pageId);
  };

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
                  handleClick(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;