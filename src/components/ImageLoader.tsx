import { useState, useEffect } from 'react';
import '../styles/ImageLoader.css';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
  }, [src]);

  return (
    <div className={`image-loader-container ${className}`}>
      {!isLoaded && !error && (
        <div className="image-loader">
          <div className="spinner"></div>
        </div>
      )}
      {error && (
        <div className="image-error">
          <span>⚠️</span>
          <p>Error al cargar la imagen</p>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={isLoaded ? 'loaded' : 'loading'} 
        style={{ display: error ? 'none' : 'block' }}
      />
    </div>
  );
};

export default ImageLoader;
