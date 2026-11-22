import type { TrackPoint } from '../types/tracking';

const EARTH_RADIUS_M = 6371000;
const toRad = (deg: number) => (deg * Math.PI) / 180;

type LatLng = Pick<TrackPoint, 'lat' | 'lng'>;

/** Distancia entre dos puntos en metros (fórmula de Haversine) */
export function distanceMeters(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export const totalDistance = (points: LatLng[]): number =>
  points.reduce((sum, p, i) => (i === 0 ? 0 : sum + distanceMeters(points[i - 1], p)), 0);

export const formatDistance = (meters: number): string =>
  meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(2)} km`;