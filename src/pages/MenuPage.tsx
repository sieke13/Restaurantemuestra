import Menu from '../components/Menu';
import ScrollAnimation from '../components/ScrollAnimation';
import QRMenu from '../components/QRMenu';
import '../styles/MenuPage.css';

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <ScrollAnimation animationClass="fade-in">
          <h1>Nuestro Menú</h1>
          <p className="menu-page-description">
            Descubre nuestra amplia variedad de platos preparados con los mejores ingredientes y el auténtico sabor de la cocina mexicana.
          </p>
        </ScrollAnimation>
      </div>

      <div className="menu-page-content">
        <ScrollAnimation animationClass="fade-in">
          <Menu />
        </ScrollAnimation>
      </div>

      <div className="menu-qr-section">
        <ScrollAnimation animationClass="fade-in">
          <h2>Llévate Nuestro Menú</h2>
          <p>
            Escanea este código QR para tener acceso a nuestro menú en tu dispositivo móvil 
            o compártelo con tus amigos y familiares.
          </p>
          <QRMenu />
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default MenuPage;
