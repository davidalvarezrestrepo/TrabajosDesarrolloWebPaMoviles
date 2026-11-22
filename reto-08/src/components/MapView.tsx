import { useEffect } from 'react';
import type { LatLngTuple } from 'leaflet';
import { CircleMarker, MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet';
import './MapView.css';

interface MapViewProps {
  center: LatLngTuple;
  path?: LatLngTuple[];
  follow?: boolean;
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

function MapController({ center, path, follow }: MapViewProps) {
  const map = useMap();
  const [lat, lng] = center;

  // Ionic anima la página al entrar: se recalcula el tamaño para que el mapa no quede cortado
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (follow) map.panTo([lat, lng]);
  }, [map, lat, lng, follow]);

  useEffect(() => {
    if (!follow && path && path.length > 1) map.fitBounds(path, { padding: [30, 30] });
  }, [map, path, follow]);

  return null;
}

export default function MapView({ center, path = [], follow = false }: MapViewProps) {
  return (
    <MapContainer center={center} zoom={17} className="map">
      <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />
      {path.length > 1 && <Polyline positions={path} pathOptions={{ color: '#3880ff', weight: 5 }} />}
      <CircleMarker
        center={center}
        radius={9}
        pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#3880ff', fillOpacity: 1 }}
      />
      <MapController center={center} path={path} follow={follow} />
    </MapContainer>
  );
}