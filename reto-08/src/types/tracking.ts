export interface TrackPoint {
  lat: number;
  lng: number;
  speed: number | null; // m/s, si el GPS la reporta
  timestamp: number;
}

export interface Track {
  id: string;
  startedAt: number;
  endedAt: number;
  distanceMeters: number;
  points: TrackPoint[];
}