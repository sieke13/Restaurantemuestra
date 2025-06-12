import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ScrollToPageContent.css';

const ScrollToPageContent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Solo mostrar en la página de inicio
    if (location.pathname !== '/') {
      setVisible(false);
      return;
    }
    
    const handleScroll = () => {
      // Mostrar el botón después de desplazarse un poco
      const scrolled = window.scrollY;
      setVisible(scrolled < 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const scrollToContent = () => {
    const featuredSection = document.getElementById('menu');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button 
      className="scroll-to-content"
      onClick={scrollToContent}
      aria-label="Desplazarse hacia abajo"
    >
      <span className="arrow">↓</span>
      <span className="text">Descubre Nuestro Menú</span>
    </button>
  );
};

export default ScrollToPageContent;
