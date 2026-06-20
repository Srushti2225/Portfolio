import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import CanvasParticles from './components/CanvasParticles';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [scrollWidth, setScrollWidth] = useState('0%');

  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle entry splash loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loader screen
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll progress indicators
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolledPercentage = (window.scrollY / totalScroll) * 100;
        setScrollWidth(`${scrolledPercentage}%`);
      }
    };

    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Scroll indicator bar */}
      <div className="scroll-progress" style={{ width: scrollWidth }} />

      {/* Splash entry loader */}
      <Loader isLoading={isLoading} />

      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Dynamic interactive plexus background */}
      <CanvasParticles theme={theme} />

      {/* Floating accent background gradients */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Main Website Structure */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
