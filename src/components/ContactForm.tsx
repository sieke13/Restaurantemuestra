import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import '../styles/ContactForm.css';
import '../styles/FormAnimations.css';

interface ContactFormProps {
  compact?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ compact = false }) => {  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
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
        console.log('Mensaje enviado:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
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
    <div className={`contact-form-container ${compact ? 'compact' : ''}`}>
      <h3>Envíanos un Mensaje</h3>
        {isSubmitted && (
        <div className="form-success">
          <span className="success-icon">✓</span>
          <div className="success-message">
            <strong>¡Mensaje enviado con éxito!</strong>
            <p>Te responderemos a la mayor brevedad posible.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form-elegant">
        <div className={`form-field ${errors.name ? 'error' : ''}`}>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className={`form-field ${errors.email ? 'error' : ''}`}>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className={`form-field ${errors.message ? 'error' : ''}`}>
          <textarea 
            id="message" 
            name="message" 
            rows={3} 
            placeholder="Tu mensaje"
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
  );
};

export default ContactForm;
