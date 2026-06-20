import { useState, useEffect } from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

// Custom inline SVG icons for brands (deprecated in recent lucide-react)
const Github = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show "Back to Top" button when scrolled past a threshold
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleLinkClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#home" className="footer-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          Srushti Katkar
        </a>

        {/* Quick Links */}
        <ul className="footer-links">
          <li className="footer-link">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>Home</a>
          </li>
          <li className="footer-link">
            <a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About</a>
          </li>
          <li className="footer-link">
            <a href="#skills" onClick={(e) => { e.preventDefault(); handleLinkClick('skills'); }}>Skills</a>
          </li>
          <li className="footer-link">
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleLinkClick('projects'); }}>Projects</a>
          </li>
          <li className="footer-link">
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>Contact</a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="footer-socials">
          <a 
            href="https://github.com/Srushti2225" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon interactive"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/srushti-katkar-032936293/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon interactive"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="mailto:srushtikatkar69@gmail.com" 
            className="footer-social-icon interactive"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <p>Copyright &copy; 2026 Srushti Katkar. All Rights Reserved.</p>
        </div>
      </div>

      {/* Floating Back to Top button */}
      <button
        type="button"
        className={`back-to-top interactive ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to Top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
