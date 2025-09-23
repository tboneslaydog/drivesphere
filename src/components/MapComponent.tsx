import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
  speed?: number;
  heading?: number;
}

interface MapComponentProps {
  currentLocation: Location | null;
  route: Location[];
}

const MapUpdater: React.FC<{ currentLocation: Location | null }> = ({ currentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView([currentLocation.latitude, currentLocation.longitude], 13);
    }
  }, [currentLocation, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ currentLocation, route }) => {
  const mapRef = useRef<L.Map>(null);

  const routePositions = route.map(loc => [loc.latitude, loc.longitude] as [number, number]);

  return (
    <MapContainer
      center={currentLocation ? [currentLocation.latitude, currentLocation.longitude] : [40.7128, -74.0060]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater currentLocation={currentLocation} />
      
      {currentLocation && (
        <Marker
          position={[currentLocation.latitude, currentLocation.longitude]}
        />
      )}
      
      {route.length > 1 && (
        <Polyline
          positions={routePositions}
          color="blue"
          weight={4}
          opacity={0.7}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
