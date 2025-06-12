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
  }, [menuOpen]);
  return (
    <header className="header">
      {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}      <div className="logo">
        <Link to="/">
          <h1>La Cocina Mexicana</h1>
        </Link>
      </div>
      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={() => toggleMenu()} end>Inicio</NavLink></li>
          <li><NavLink to="/menu" onClick={() => toggleMenu()}>Menú</NavLink></li>
          <li><a href="/#about" onClick={() => toggleMenu()}>Nosotros</a></li>
          <li><a href="/#gallery" onClick={() => toggleMenu()}>Galería</a></li>
          <li><a href="/#reservation" onClick={() => toggleMenu()}>Reservar</a></li>
          <li><NavLink to="/contacto" onClick={() => toggleMenu()}>Contacto</NavLink></li>
          <li className="mobile-contact"><a href={`tel:${contactInfo.phone}`}>Llamar ahora</a></li>
        </ul>
      </nav>      <div className="contact-info desktop-only">
        <a href={`tel:${contactInfo.phone}`} className="header-phone"><PhoneIcon size={14} /> {contactInfo.phone}</a>
        <div className="header-social">
          {contactInfo.socialMedia && (
            <>              {contactInfo.socialMedia.facebook && (
                <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <FacebookIcon size={14} />
                </a>
              )}
              {contactInfo.socialMedia.instagram && (
                <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <InstagramIcon size={14} />
                </a>
              )}
              {contactInfo.socialMedia.twitter && (
                <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                  <TwitterIcon size={14} />
                </a>
              )}
            </>
          )}
        </div>
        <div className="header-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
