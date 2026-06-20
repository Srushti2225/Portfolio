import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setFadeClass('fade-out');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800); // match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`loader-overlay ${fadeClass}`}>
      <div className="loader-container">
        <div className="loader-ring" />
        <h2 className="loader-text">SRUSHTI KATKAR</h2>
        <span className="loader-subtitle">Portfolio Loading</span>
      </div>
    </div>
  );
};

export default Loader;
