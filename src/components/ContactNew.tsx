import { contactInfo } from '../data/restaurantData';
import '../styles/Contact.css';
import '../styles/SocialMedia.css';
import ScrollAnimation from './ScrollAnimation';
import ContactForm from './ContactForm';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './Icons';

const ContactNew: React.FC = () => {
  return (
    <section className="contact" id="contact">
      <ScrollAnimation animationClass="fade-in">
        <div className="contact-header">
          <h2>Contáctanos</h2>
          <p className="contact-subtitle">¡Estamos felices de atenderte! Si tienes alguna pregunta o comentario, no dudes en escribirnos.</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-banner">Información</div>
            <div className="info-item address">
              <h3>Dirección</h3>
              <p>{contactInfo.address}</p>
            </div>
            <div className="info-item phone">
              <h3>Teléfono</h3>
              <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
            </div>
            <div className="info-item email">
              <h3>Email</h3>
              <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            </div>
            <div className="info-item hours">
              <h3>Horario</h3>
              <div className="hours-grid">
                {Object.entries(contactInfo.hours).map(([day, hours]) => (
                  <p key={day}><strong>{day}:</strong> <span>{hours}</span></p>
                ))}
              </div>
            </div>            <div className="social-media">
              <h3>Síguenos</h3>              {contactInfo.socialMedia && (
                <div className="social-links social-links-contact">                  
                  {contactInfo.socialMedia.facebook && (
                    <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link-circle facebook">
                      <FacebookIcon size={20} />
                    </a>
                  )}
                  {contactInfo.socialMedia.instagram && (
                    <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link-circle instagram">
                      <InstagramIcon size={20} />
                    </a>
                  )}
                  {contactInfo.socialMedia.twitter && (
                    <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link-circle twitter">
                      <TwitterIcon size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="contact-form">
            <ContactForm />
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default ContactNew;