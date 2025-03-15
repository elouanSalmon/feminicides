import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@mui/material/styles';
import { addNewTabToLinks } from '../utils/linkUtils';

const CustomMarker = ({ position, name, date, city, age, link }) => {
  const theme = useTheme();

  // Mise à jour de l'icône pour correspondre au thème
  const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='36' height='36'%3E%3Cfilter id='shadow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1' flood-color='%23000' flood-opacity='0.3'/%3E%3C/filter%3E%3Ccircle cx='12' cy='12' r='10' fill='%23${theme.palette.primary.main.replace('#', '')}' filter='url(%23shadow)' /%3E%3Ccircle cx='12' cy='12' r='5' fill='white' /%3E%3C/svg%3E`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    className: 'custom-marker',
  });

  // Validation des coordonnées
  if (
    !position ||
    !Array.isArray(position) ||
    position.length !== 2 ||
    typeof position[0] !== 'number' ||
    typeof position[1] !== 'number'
  ) {
    console.warn(`Invalid coordinates for marker: ${city} - ${date}`);
    return null;
  }

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '280px',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          <h3
            style={{
              margin: '0 0 12px 0',
              color: theme.palette.primary.main,
              fontSize: '20px',
              fontWeight: 600,
              borderBottom: `2px solid ${theme.palette.primary.light}`,
              paddingBottom: '8px',
            }}
          >
            {name}
          </h3>
          <p style={{ margin: '6px 0', fontSize: '14px', color: theme.palette.text.secondary }}>
            <strong>Date:</strong> {date}
          </p>
          <p style={{ margin: '6px 0', fontSize: '14px', color: theme.palette.text.secondary }}>
            <strong>Ville:</strong> {city}
          </p>
          <p style={{ margin: '6px 0', fontSize: '14px', color: theme.palette.text.secondary }}>
            <strong>Âge:</strong> {age} ans
          </p>
          <div
            style={{
              marginTop: '12px',
              padding: '8px',
              backgroundColor: theme.palette.background.default,
              borderRadius: '4px',
              fontSize: '14px',
            }}
            dangerouslySetInnerHTML={{ __html: addNewTabToLinks(link) }}
          />
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
