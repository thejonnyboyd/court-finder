import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ courts }) => {
  return (
    <MapContainer center={[54.5973, -5.9301]} zoom={8} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {courts.map((court, idx) => (
        <Marker key={idx} position={court.coordinates}>
          <Popup>
            <strong>{court.name}</strong><br />
            {court.address}<br />
            {court.place}<br />
            Hours: {court.openingHours}<br />
            Surface: {court.surface}<br />
            Contact: <a href={court.contact}>{court.contact}</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
