import '../styles/About.css';
import images from '../assets';
import ImageLoader from './ImageLoader';
import ScrollAnimation from './ScrollAnimation';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <ScrollAnimation animationClass="fade-right">
        <div className="about-content">
          <h2>Nuestra Historia</h2>
          <p>            Fundado en 2010, La Cocina Mexicana nació con la pasión de traer los auténticos 
            sabores de la gastronomía mexicana a nuestra ciudad. Nuestra cocina combina 
            tradiciones culinarias centenarias con técnicas modernas para ofrecerle una 
            experiencia gastronómica excepcional.
          </p>
          <p>            Nuestro chef ejecutivo, Carlos Rodríguez, formado en prestigiosas escuelas culinarias 
            de México, selecciona personalmente los ingredientes más frescos y de la mejor calidad 
            para crear platos que son un homenaje a la rica tradición culinaria mexicana.
          </p>
        </div>
      </ScrollAnimation>      <ScrollAnimation animationClass="fade-left" delay={300}>
        <div className="about-image">
          <div className="image-container">
            <ImageLoader src={images.restaurantInterior} alt="Interior del restaurante" className="main-image" />
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default About;
