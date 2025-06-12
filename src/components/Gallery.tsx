import { useState, useEffect } from 'react';
import '../styles/Gallery.css';
import ImageLoader from './ImageLoader';
import ScrollAnimation from './ScrollAnimation';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Imágenes de la galería
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60',
      alt: 'Interior del restaurante',
      caption: 'Interior acogedor con iluminación cálida'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60',
      alt: 'Plato de pasta',
      caption: 'Pasta fresca con salsa casera'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=60',
      alt: 'Ensalada mediterránea',
      caption: 'Ensalada fresca con ingredientes locales'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60',
      alt: 'Vino y quesos',
      caption: 'Selección de vinos españoles y quesos artesanales'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1585672840563-f2af2ced55c9?w=800&auto=format&fit=crop&q=60',
      alt: 'Postres variados',
      caption: 'Nuestra selección de postres caseros'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=60',
      alt: 'Terraza exterior',
      caption: 'Disfruta de nuestra acogedora terraza'
    }
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevenir scroll cuando el lightbox está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restaurar scroll
    document.body.style.overflow = 'auto';
  };

  const navToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const navToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };
  // Agregar event listener para teclas
  useEffect(() => {
    if (lightboxOpen) {
      // Manejar teclas para navegación
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!lightboxOpen) return;
        
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [lightboxOpen, galleryImages.length]);

  return (
    <section className="gallery" id="gallery">
      <ScrollAnimation animationClass="fade-in">
        <h2>Nuestra Galería</h2>
        <p className="gallery-description">
          Explora imágenes de nuestro restaurante, platos deliciosos y momentos especiales.
        </p>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <ImageLoader src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <div className="gallery-caption">{image.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollAnimation>
      
      {/* Lightbox */}
      <div className={`lightbox ${lightboxOpen ? 'active' : ''}`} onClick={closeLightbox}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          
          <img 
            src={galleryImages[currentImageIndex]?.src} 
            alt={galleryImages[currentImageIndex]?.alt}
            className="lightbox-image"
          />
          
          <div className="lightbox-nav">
            <button onClick={navToPrev}>&lt;</button>
            <button onClick={navToNext}>&gt;</button>
          </div>
          
          <div className="lightbox-caption">
            {galleryImages[currentImageIndex]?.caption}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
