import { testimonials } from '../data/restaurantData';
import '../styles/Testimonials.css';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <h2>Lo Que Dicen Nuestros Clientes</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="rating">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <span key={index} className="star">★</span>
              ))}
            </div>
            <p className="testimonial-content">"{testimonial.content}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
