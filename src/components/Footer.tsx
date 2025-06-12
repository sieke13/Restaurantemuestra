import { contactInfo } from '../data/restaurantData';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FacebookIcon, InstagramIcon, TwitterIcon, ReactIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>La Cocina Mexicana</h3>
          <p>{contactInfo.address}</p>
          <p>{contactInfo.phone}</p>
          <p>{contactInfo.email}</p>
        </div>
        
        <div className="footer-navigation">
          <h3>Navegación</h3>
          <ul className="footer-nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/menu">Menú</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><a href="/#about">Nosotros</a></li>
            <li><a href="/#reservation">Reservar</a></li>
          </ul>
        </div>
        
        <div className="footer-hours">
          <h3>Horario</h3>
          {Object.entries(contactInfo.hours).map(([day, hours]) => (
            <p key={day}>{day}: {hours}</p>
          ))}
        </div>
          <div className="footer-social">
          <h3>Síguenos</h3>          <div className="social-links">            {contactInfo.socialMedia.facebook && (
              <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                <FacebookIcon size={16} />
              </a>
            )}
            {contactInfo.socialMedia.instagram && (
              <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                <InstagramIcon size={16} />
              </a>
            )}
            {contactInfo.socialMedia.twitter && (
              <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                <TwitterIcon size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} La Cocina Mexicana. Todos los derechos reservados. <span className="footer-by">Hecho por <strong>Sieke</strong> <ReactIcon size={16} className="react-footer-icon" /></span></p>
      </div>
    </footer>
  );
};

export default Footer;
