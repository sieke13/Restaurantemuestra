import { useState } from 'react';
import { menuItems, categories } from '../data/restaurantData';
import ImageLoader from './ImageLoader';
import '../styles/Menu.css';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="menu" id="menu-full">
      <div className="container">
        <h2 className="section-title">Nuestro Menú</h2>
        
        <div className="menu-categories">
          <button 
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Todos
          </button>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-items">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <ImageLoader src={item.imageUrl} alt={item.name} />
                {item.tags && item.tags.includes('popular') && (
                  <span className="popular-tag">Popular</span>                )}
              </div>
              <div className="menu-item-details">                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-item-price">${item.price.toFixed(2)} MXN</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="menu-item-tags">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="menu-item-tag">
                        {tag}
                      </span>
                    ))}
                  </div>                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
