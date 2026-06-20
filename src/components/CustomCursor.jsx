import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    addEventListeners();

    // Setup listener for elements we want to hover
    const handleHoverEvents = () => {
      const targets = document.querySelectorAll('a, button, input, textarea, select, .interactive');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Run initially and set a MutationObserver to watch for changes
    handleHoverEvents();
    const observer = new MutationObserver(handleHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let animationFrame;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrame = requestAnimationFrame(updateTrail);
    };
    
    animationFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  const cursorStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--accent-cyan)',
    borderRadius: '50%',
    zIndex: 9999,
    pointerEvents: 'none',
    transition: 'transform 0.1s ease, background-color 0.3s ease',
    opacity: hidden ? 0 : 1,
  };

  const trailStyle = {
    position: 'fixed',
    top: -12,
    left: -12,
    transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${hovered ? 1.5 : clicked ? 0.8 : 1})`,
    width: '32px',
    height: '32px',
    border: '2px solid var(--accent-purple)',
    boxShadow: hovered ? '0 0 15px var(--glow-color)' : 'none',
    backgroundColor: hovered ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
    borderRadius: '50%',
    zIndex: 9998,
    pointerEvents: 'none',
    transition: 'transform 0.1s ease-out, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    opacity: hidden ? 0 : 1,
  };

  return (
    <>
      <div className="custom-cursor" style={cursorStyle} />
      <div className="custom-cursor" style={trailStyle} />
    </>
  );
};

export default CustomCursor;
