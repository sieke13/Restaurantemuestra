import { useEffect, useRef, useState } from 'react';
import '../styles/LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

/**
 * LazyImage component that implements true lazy loading using Intersection Observer API
 * Only loads images when they are about to enter the viewport
 */
const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = '#e2e2e2' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to detect when image is in viewport
  useEffect(() => {
    const currentRef = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before it enters viewport
        threshold: 0.01
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Handle image loading once it's in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
  }, [isInView, src]);

  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-container ${className}`}
      style={{ 
        backgroundColor: placeholderColor,
        aspectRatio: '16/9',
      }}
    >
      {error && (
        <div className="image-error">
          <span>⚠️</span>
          <p>Error al cargar la imagen</p>
        </div>
      )}
      
      {isInView && !error && (
        <img 
          src={src} 
          alt={alt} 
          className={isLoaded ? 'loaded' : 'loading'}
          loading="lazy"
        />
      )}
      
      {isInView && !isLoaded && !error && (
        <div className="lazy-image-loader">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
