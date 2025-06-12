import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Función para manejar el scroll suave cuando se hace clic en enlaces internos
    const handleInternalLinkClick = (event: MouseEvent) => {
      // Obtener el elemento que recibió el clic o su ancestro más cercano que sea un enlace
      let target = event.target as HTMLElement;
      
      // Si el clic fue en un hijo del enlace (como un ícono), buscar el enlace padre
      while (target && target.tagName !== 'A') {
        if (target.parentElement) {
          target = target.parentElement;
        } else {
          break;
        }
      }
      
      // Verificar si es un enlace interno (a)
      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');
        
        // Si es un enlace interno que comienza con #
        if (href && href.startsWith('#')) {
          event.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
            if (targetElement) {
            // Ajuste para compensar altura del header fijo
            const headerOffset = 80; // Altura aproximada del header en píxeles
            
            // Pequeño retraso para asegurar que el DOM esté completamente cargado
            setTimeout(() => {
              // Recalcular la posición después del timeout para mayor precisión
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              
              // Scroll suave hasta la posición ajustada
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
              
              // Actualizar la URL sin recargar la página
              window.history.pushState(null, '', href);
            }, 50);
          }
        }
      }
    };

    // Agregar el event listener al documento
    document.addEventListener('click', handleInternalLinkClick);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleInternalLinkClick);
    };
  }, []);
};

export default useSmoothScroll;
