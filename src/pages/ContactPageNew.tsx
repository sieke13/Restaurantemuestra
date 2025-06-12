import { contactInfo } from '../data/restaurantData';
import GoogleMap from '../components/GoogleMap';
import ScrollAnimation from '../components/ScrollAnimation';
import '../styles/ContactPage.css';
import ContactForm from '../components/ContactForm';

const ContactPageNew: React.FC = () => {  
  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <ScrollAnimation animationClass="fade-in">
          <h1>Contacto y Ubicación</h1>
          <p className="contact-page-description">
            Estamos ubicados en el corazón de la ciudad, en un entorno acogedor y accesible. 
            Te invitamos a visitarnos o contactarnos para hacer tu reserva.
          </p>
        </ScrollAnimation>
      </div>

      <div className="contact-location-container">
        <div className="contact-section">
          <ScrollAnimation animationClass="fade-left">
            <section className="contact" id="contact">
              <h2>Contáctanos</h2>
              <div className="contact-container">
                <div className="contact-info">
                  <div className="info-item">
                    <h3>Dirección</h3>
                    <p>{contactInfo.address}</p>
                  </div>
                  <div className="info-item">
                    <h3>Teléfono</h3>
                    <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                  </div>
                  <div className="info-item">
                    <h3>Email</h3>
                    <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                  </div>
                  <div className="info-item">
                    <h3>Horario</h3>
                    {Object.entries(contactInfo.hours).map(([day, hours]) => (
                      <p key={day}><strong>{day}:</strong> {hours}</p>
                    ))}
                  </div>
                </div>
                <div className="contact-form">
                  <ContactForm />
                </div>
              </div>
            </section>
          </ScrollAnimation>
        </div>
        
        <div className="map-section">
          <ScrollAnimation animationClass="fade-right">
            <div className="map-container">
              <h2>Nuestra Ubicación</h2>
              <div className="address-details">
                <p>Nos encontramos en una ubicación privilegiada en {contactInfo.address}. Fácil acceso y estacionamiento disponible en los alrededores.</p>
              </div>
              <div className="google-map">
                <GoogleMap address={contactInfo.address} />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default ContactPageNew;