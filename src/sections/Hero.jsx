import { useState, useEffect } from 'react';
import { Mail, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';
import self from '../assets/self.jpg'

// Custom inline SVG icons for brands (since lucide-react deprecated them in v0.400+)
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

const Hero = () => {
  const roles = ["Frontend Developer", "Java Programmer", "Designer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect logic
  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing text
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at the end of word
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting text
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Framer motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, cubicBezier: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* Left side: Avatar Profile */}
      <motion.div 
        className="hero-left"
        initial="hidden"
        animate="visible"
        variants={avatarVariants}
      >
        <div className="avatar-container">
          <img
            src={self}
            alt="Srushti Katkar Profile"
            className="avatar-image"
/>
        </div>
      </motion.div>

      {/* Right side: Texts & Actions */}
      <motion.div 
        className="hero-right"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className="hero-greeting" variants={itemVariants}>
          Welcome to my portfolio
        </motion.span>
        
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi, I'm <span>Srushti Katkar</span>
        </motion.h1>

        <motion.div className="hero-typing" variants={itemVariants}>
          I'm a <span className="typing-text">{currentText}</span>
        </motion.div>

        <motion.p className="hero-description" variants={itemVariants}>
          Computer Engineering student with strong foundations in Data Structures and Object-Oriented Programming. Skilled in 
          developing responsive web applications using modern technologies and building modular, scalable solutions. Seeking an 
          entry-level Software Engineering role to apply problem-solving and programming skills. 
        </motion.p>

        {/* Buttons */}
        <motion.div className="hero-buttons" variants={itemVariants}>
          <a 
            href="#projects" 
            className="glow-btn interactive"
            onClick={handleScrollToProjects}
          >
            View Projects
            <ArrowRight size={18} />
          </a>
          <a 
            href="/Srushti-Katkar.pdf" 
            download="Srushti-Katkar.pdf"
            className="outline-btn interactive"
          >
            Download Resume
            <Download size={18} />
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div className="hero-socials" variants={itemVariants}>
          <a 
            href="https://github.com/Srushti2225/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon interactive"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/srushti-katkar-032936293/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon interactive"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="mailto:srushtikatkar69@gmail.com" 
            className="social-icon interactive"
            aria-label="Email Me"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
