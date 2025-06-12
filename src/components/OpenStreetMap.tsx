import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/GoogleMap.css';
import L from 'leaflet';

// Corregir el problema de los iconos de marcadores en Leaflet
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface OpenStreetMapProps {
  address: string;
}

// Coordenadas por defecto (Iramuco, Guanajuato, México)
const DEFAULT_POSITION: [number, number] = [19.96351, -100.92105];
const DEFAULT_ZOOM = 13;

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ address }) => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Usamos el servicio gratuito de Nominatim para geocodificar
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );

        if (!response.ok) {
          throw new Error('Error al geocodificar la dirección');
        }

        const data = await response.json();
        
        if (data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError('No se encontró la dirección');
          // Usar posición por defecto
          setPosition(DEFAULT_POSITION);
        }
      } catch (err) {
        console.error('Error geocodificando dirección:', err);
        setError('Error al buscar la dirección');
        // Usar posición por defecto
        setPosition(DEFAULT_POSITION);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  return (
    <div className="map-wrapper">
      {isLoading ? (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Cargando el mapa...</p>
        </div>
      ) : (
        <MapContainer 
          center={position} 
          zoom={DEFAULT_ZOOM} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {error ? 'Ubicación aproximada' : address}
            </Popup>
          </Marker>
        </MapContainer>
      )}
      
      {error && (
        <div className="map-error">
          <p>{error}</p>
          <p>Mostrando ubicación aproximada</p>
        </div>
      )}
    </div>
  );
};

export default OpenStreetMap;
