import { useState, useEffect } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import '../styles/QRMenu.css';

const QRMenu: React.FC = () => {
  // Crear URL absoluta para el menú
  const [menuURL, setMenuURL] = useState('');
  const [downloadName, setDownloadName] = useState('menu-la-cocina-mexicana');
  
  useEffect(() => {
    // Asegurarnos de que la URL es la correcta incluso si la app está en una ruta personalizada
    setMenuURL(`${window.location.origin}/menu`);
  }, []);

  // Función para descargar el QR como imagen
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${downloadName}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="qr-menu-container">
      <div className="qr-code-wrapper">
        <QRCode
          id="qr-code"
          value={menuURL}
          size={200}
          level={"H"}
          includeMargin={true}
          imageSettings={{
            src: "/favicon.svg",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      
      <div className="qr-menu-instructions">
        <p>Escanea este código QR con tu teléfono para ver nuestro menú completo.</p>
        <div className="qr-download-section">
          <input
            type="text"
            value={downloadName}
            onChange={(e) => setDownloadName(e.target.value)}
            placeholder="Nombre del archivo"
            className="qr-filename-input"
          />
          <button onClick={downloadQRCode} className="qr-download-btn">
            Descargar QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRMenu;
