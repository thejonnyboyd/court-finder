import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LocationSetter = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation, map]);

  return null;
};

function MapView({ courts, userLocation }) {
  return (
    <MapContainer
      center={[54.5973, -5.9301]} 
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {courts.map((court, idx) => (
        <Marker key={idx} position={court.coordinates}>
          <Popup>
            <strong>{court.name}</strong><br />
            {court.address}<br />
            {court.place}<br />
            Hours: {court.openingHours}<br />
            Surface: {court.surface}<br />
            Contact: <a href={court.contact} target="_blank" rel="noreferrer">{court.contact}</a>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      <LocationSetter userLocation={userLocation} />
    </MapContainer>
  );
}

export default MapView;
