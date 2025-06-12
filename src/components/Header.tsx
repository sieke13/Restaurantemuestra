import { contactInfo } from '../data/restaurantData';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import { FacebookIcon, InstagramIcon, TwitterIcon, PhoneIcon } from './Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Controlar el scroll del body cuando cambia el estado del menú
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    
    // Cleanup para restaurar el scroll cuando el componente se desmonta
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);  return (
    <header className="header">
      {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}      <div className="header-section left">        <div 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          role="button" 
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} 
          aria-expanded={menuOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMenu();
            }
          }}
        >
          <div className="menu-icon-container">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="menu-circle"></div>
          </div>
        </div>
      </div>
      <div className="header-section center logo-section">
        <div className="logo">
          <Link to="/">
            <h1>La Cocina Mexicana</h1>
          </Link>
        </div>
      </div>
      <div className="header-section right">
        <div className="social-contact-icons">
          <a href={`tel:${contactInfo.phone}`} className="header-icon phone-icon" aria-label="Llamar al restaurante">
            <PhoneIcon size={22} />
          </a>
          <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="Visitar Facebook">
            <FacebookIcon size={22} />
          </a>
          <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="Visitar Instagram">
            <InstagramIcon size={22} />
          </a>
          <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="Visitar Twitter">
            <TwitterIcon size={22} />
          </a>
        </div>
        <div className="theme-container">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div><nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={() => toggleMenu()} end>Inicio</NavLink></li>
          <li><NavLink to="/menu" onClick={() => toggleMenu()}>Menú</NavLink></li>
          <li>
            <a 
              href="/#about" 
              onClick={(e) => {
                e.preventDefault();
                toggleMenu();
                
                // Esperar a que se cierre el menú antes de navegar
                setTimeout(() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    const headerOffset = 100;
                    const offsetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', '/#about');
                  }
                }, 300);
              }}
            >
              Nosotros
            </a>
          </li>
          <li>
            <a 
              href="/#gallery" 
              onClick={(e) => {
                e.preventDefault();
                toggleMenu();
                
                // Esperar a que se cierre el menú antes de navegar
                setTimeout(() => {
                  const gallerySection = document.getElementById('gallery');
                  if (gallerySection) {
                    const headerOffset = 100;
                    const offsetPosition = gallerySection.getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', '/#gallery');
                  }
                }, 300);
              }}
            >
              Galería
            </a>
          </li>
          <li>
            <a 
              href="/#reservation" 
              onClick={(e) => {
                e.preventDefault();
                toggleMenu();
                
                // Esperar a que se cierre el menú antes de navegar
                setTimeout(() => {
                  const reservationSection = document.getElementById('reservation');
                  if (reservationSection) {
                    const headerOffset = 100;
                    const offsetPosition = reservationSection.getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', '/#reservation');
                  }
                }, 300);
              }}
            >
              Reservar
            </a>
          </li>
          <li><NavLink to="/contacto" onClick={() => toggleMenu()}>Contacto</NavLink></li>
          <li className="mobile-contact"><a href={`tel:${contactInfo.phone}`}>Llamar ahora</a></li>
        </ul>      </nav>
    </header>
  );
};

export default Header;
