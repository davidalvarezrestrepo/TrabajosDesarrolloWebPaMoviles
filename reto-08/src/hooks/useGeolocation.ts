import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      setError(null);
      const permiso = await Geolocation.requestPermissions();
      if (permiso.location === 'denied') {
        setError('Permiso de ubicación denegado.');
        return;
      }
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      setPosition(pos.coords);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const startTracking = async () => {
    try {
      setError(null);
      await Geolocation.requestPermissions();
      const id = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos, err) => {
          if (err) {
            setError(err.message);
            return;
          }
          if (pos) setPosition(pos.coords);
        }
      );
      setWatchId(id);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const stopTracking = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  return { position, error, watchId, getCurrentLocation, startTracking, stopTracking };
};