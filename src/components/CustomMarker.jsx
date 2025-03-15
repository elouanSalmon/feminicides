import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { addNewTabToLinks } from '../utils/linkUtils';

const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='48' height='48'%3E%3Cfilter id='shadow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='2' flood-color='%23000' flood-opacity='0.3'/%3E%3C/filter%3E%3Cpath filter='url(%23shadow)' fill='%23e91e63' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  className: 'custom-marker'
});

const CustomMarker = ({ position, name, date, city, age, link }) => {
  // Validate coordinates before rendering
  if (!position || !Array.isArray(position) || position.length !== 2 || 
      typeof position[0] !== 'number' || typeof position[1] !== 'number') {
    console.warn(`Invalid coordinates for marker: ${city} - ${date}`);
    return null;
  }

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#e91e63' }}>{name}</h3>
          <p style={{ margin: '4px 0' }}><strong>Date:</strong> {date}</p>
          <p style={{ margin: '4px 0' }}><strong>Ville:</strong> {city}</p>
          <p style={{ margin: '4px 0' }}><strong>Âge:</strong> {age} ans</p>
          <div style={{ marginTop: '8px' }} dangerouslySetInnerHTML={{ __html: addNewTabToLinks(link) }} />
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;