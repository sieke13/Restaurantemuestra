import { contactInfo } from '../data/restaurantData';
import GoogleMap from '../components/GoogleMap';
import ScrollAnimation from '../components/ScrollAnimation';
import '../styles/ContactPage.css';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulamos el envío del formulario
      setTimeout(() => {
        // Aquí iría la lógica para enviar el mensaje al servidor
        console.log('Formulario enviado:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Ocultar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
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
                  <h3>Envíanos un Mensaje</h3>
                  
                  {isSubmitted && (
                    <div className="form-success">
                      ¡Mensaje enviado con éxito! Te responderemos a la mayor brevedad posible.
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className={`form-group ${errors.name ? 'error' : ''}`}>
                      <label htmlFor="name">Nombre</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    
                    <div className={`form-group ${errors.email ? 'error' : ''}`}>
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    
                    <div className={`form-group ${errors.subject ? 'error' : ''}`}>
                      <label htmlFor="subject">Asunto</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && <p className="error-message">{errors.subject}</p>}
                    </div>
                    
                    <div className={`form-group ${errors.message ? 'error' : ''}`}>
                      <label htmlFor="message">Mensaje</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                    
                    <button 
                      type="submit" 
                      className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                  </form>
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
                <p><strong>Dirección:</strong> {contactInfo.address}</p>
                <p><strong>Cómo llegar:</strong> Estamos a 5 minutos caminando de la estación de metro Central, y disponemos de aparcamiento para nuestros clientes.</p>
              </div>
              <GoogleMap address={contactInfo.address} />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
