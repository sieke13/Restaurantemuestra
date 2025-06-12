import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Higher order component that ensures the page scrolls to the top
 * when navigating between routes, but preserves scroll position when
 * using the browser's back/forward buttons.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();  useEffect(() => {
    // Si hay un hash en la URL (ejemplo: /#about), desplazarse al elemento
    if (hash) {
      // Función para desplazarse al elemento
      const scrollToHashElement = () => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Ajuste para compensar altura del header fijo
          const headerOffset = 100; // Altura ligeramente mayor para evitar solapamiento
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Scroll suave hasta la posición ajustada
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };
      
      // Ejecutar la función inmediatamente
      scrollToHashElement();
      
      // Y también con un pequeño retraso para garantizar que el DOM esté completamente cargado
      setTimeout(scrollToHashElement, 50);
      // Una segunda llamada con mayor retraso para casos más problemáticos
      setTimeout(scrollToHashElement, 300);
    } 
    // Si no hay hash, simplemente desplazarse al inicio de la página
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
