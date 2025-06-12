import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente que hace scroll al inicio de la página cuando cambiamos de ruta
const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTopOnNavigation;
