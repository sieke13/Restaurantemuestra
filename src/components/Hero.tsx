import '../styles/Hero.css';
import { useEffect, useState } from 'react';
import images from '../assets';
import ImageLoader from './ImageLoader';
import ScrollToPageContent from './ScrollToPageContent';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="hero" id="home">
      <div className={`hero-content ${isLoaded ? 'fade-in' : ''}`}>        <h1>La Cocina Mexicana</h1>
        <p>Auténtica gastronomía mexicana en un ambiente acogedor</p>
        <button className="cta-button" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
          Ver Menú
        </button>
      </div>      <div className={`hero-image ${isLoaded ? 'slide-in' : ''}`}>
        <ImageLoader src={images.restaurantHero} alt="La Cocina Mexicana" />
      </div>
      <ScrollToPageContent />
    </section>
  );
};

export default Hero;
