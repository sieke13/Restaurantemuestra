import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Higher order component that ensures the page scrolls to the top
 * when navigating between routes, but preserves scroll position when
 * using the browser's back/forward buttons.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // If there's a hash in the URL (e.g., /#about), scroll to the element
    if (hash) {
      // Give the DOM a moment to update before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Ajuste para compensar altura del header fijo
          const headerOffset = 80; // Altura aproximada del header en píxeles
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Scroll suave hasta la posición ajustada
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Aumentamos un poco el tiempo para asegurar que el DOM esté listo
    } 
    // No hash, just navigate to a regular route - scroll to top
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
