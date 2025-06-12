import Hero from '../components/Hero';
import Featured from '../components/Featured';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import ContactNew from '../components/ContactNew';
import Menu from '../components/Menu';
import Reservation from '../components/Reservation';
import Gallery from '../components/Gallery';

const HomePage: React.FC = () => {  return (
    <div className="home-page">
      <Hero />
      <Featured />
      <About />
      <Menu />
      <Gallery />
      <Testimonials />      <Reservation />
      <ContactNew />
    </div>
  );
};

export default HomePage;
