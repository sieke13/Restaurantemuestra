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
          // Prevenir navegación por defecto
          event.preventDefault();
          
          // Extraer el ID del elemento destino
          const targetId = href.substring(1);
          
          // Asegurarse de que el elemento exista
          const scrollToElement = () => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              // Ajuste para compensar la altura del header fijo
              const headerOffset = 100; // Un poco más para evitar que quede parcialmente oculto
              
              // Recalcular la posición para mayor precisión
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              
              // Scroll suave hasta la posición ajustada
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
              
              // Actualizar la URL sin recargar la página
              window.history.pushState(null, '', href);
            }
          };
          
          // Ejecutar inmediatamente el scroll y también con un pequeño retraso 
          // para garantizar que funcione en todos los casos
          scrollToElement();
          // Backup para dispositivos lentos o cuando el DOM no está completamente listo
          setTimeout(scrollToElement, 10);
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
