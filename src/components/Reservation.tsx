import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import '../styles/Reservation.css';
import ScrollAnimation from './ScrollAnimation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: string;
  specialRequests: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  people?: string;
}

const Reservation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Generamos las opciones de hora para la reserva
  const timeOptions = [];
  for (let i = 12; i <= 22; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const minute = j === 0 ? '00' : '30';
      timeOptions.push(`${hour}:${minute}`);
    }
  }

  // Fecha mínima para reservar (día actual)
  const today = new Date().toISOString().split('T')[0];
  
  // Fecha máxima para reservar (3 meses adelante)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validaciones
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono no es válido';
    }
    
    if (!formData.date) {
      newErrors.date = 'La fecha es obligatoria';
    }
    
    if (!formData.time) {
      newErrors.time = 'La hora es obligatoria';
    }
    
    if (!formData.people) {
      newErrors.people = 'El número de personas es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    if (validateForm()) {
      // Aquí iría la lógica para enviar la reserva al servidor
      console.log('Formulario enviado:', formData);
      
      // Mostrar mensaje de confirmación
      setSubmitted(true);
      
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        people: '',
        specialRequests: ''
      });
      
      // Desaparecer el mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <ScrollAnimation animationClass="fade-in">
        <h2>Reserva una Mesa</h2>
        <p className="section-info">
          Haz tu reserva online y garantiza tu mesa. Para grupos grandes (más de 10 personas)
          por favor contacta con nosotros por teléfono.
        </p>
        
        {submitted && (
          <div className="confirmation-message">
            ¡Reserva enviada con éxito! Te contactaremos para confirmar los detalles.
          </div>
        )}
        
        <div className="reservation-form-container">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">Nombre Completo*</label>
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
              <label htmlFor="email">Email*</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
              <label htmlFor="phone">Teléfono*</label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            
            <div className={`form-group ${errors.date ? 'error' : ''}`}>
              <label htmlFor="date">Fecha*</label>
              <input 
                type="date" 
                id="date"
                name="date" 
                min={today}
                max={maxDateStr}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="error-message">{errors.date}</p>}
            </div>
            
            <div className={`form-group ${errors.time ? 'error' : ''}`}>
              <label htmlFor="time">Hora*</label>
              <select 
                id="time"
                name="time" 
                value={formData.time}
                onChange={handleChange}
              >
                <option value="">Selecciona una hora</option>
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && <p className="error-message">{errors.time}</p>}
            </div>
            
            <div className={`form-group ${errors.people ? 'error' : ''}`}>
              <label htmlFor="people">Número de Personas*</label>
              <select 
                id="people"
                name="people" 
                value={formData.people}
                onChange={handleChange}
              >
                <option value="">Selecciona el número de personas</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                ))}
              </select>
              {errors.people && <p className="error-message">{errors.people}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="specialRequests">Peticiones Especiales</label>
              <textarea 
                id="specialRequests"
                name="specialRequests" 
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                placeholder="Alergias, preferencias, ocasión especial, etc."
              ></textarea>
            </div>
            
            <div className="form-group">
              <button type="submit" className="submit-button">Reservar Mesa</button>
            </div>
          </form>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default Reservation;
