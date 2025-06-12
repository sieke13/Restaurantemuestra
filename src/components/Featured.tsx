import { menuItems } from '../data/restaurantData';
import '../styles/Featured.css';
import ImageLoader from './ImageLoader';

const Featured: React.FC = () => {
  // Get 3 popular items from the menu
  const featuredItems = menuItems
    .filter(item => item.tags?.includes('popular'))
    .slice(0, 3);
  return (
    <section className="featured" id="menu">
      <h2>Nuestros Platos Destacados</h2>
      <div className="featured-items">
        {featuredItems.map(item => (
          <div key={item.id} className="featured-item">
            <div className="featured-image">
              <ImageLoader src={item.imageUrl} alt={item.name} />
            </div>
            <div className="featured-content">              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">${item.price.toFixed(2)} MXN</span>
            </div>
          </div>
        ))}
      </div>      <div className="view-full-menu">
        <a 
          href="#menu-full" 
          className="view-menu-button"
          onClick={(e) => {
            e.preventDefault();
            const menuElement = document.getElementById('menu-full');
            if (menuElement) {
              const headerOffset = 80;
              const elementPosition = menuElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
              
              // Actualizar la URL sin recargar la página
              window.history.pushState(null, '', '#menu-full');
            }
          }}
        >Ver Menú Completo</a>
      </div>
    </section>
  );
};

export default Featured;
