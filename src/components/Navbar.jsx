import { useState, useEffect } from 'react';
import { Sun, Moon, Download, Code2 } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      
      const scrollPosition = window.scrollY + 150; // offset for sticky navbar
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
        <Code2 size={28} style={{ strokeWidth: 2, color: 'var(--accent-purple)' }} />
        <span>Srushti.</span>
      </a>

      {/* Hamburger icon for mobile */}
      <button 
        className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation links & actions */}
      <div className={`nav-links-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* Light/Dark mode switcher */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Glowing Resume button */}
          <a 
            href="/Srushti-Katkar.pdf" 
            download="Srushti-Katkar.pdf"
            className="resume-btn interactive"
          >
            <span>Resume</span>
            <Download size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
