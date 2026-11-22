import { useCallback, useEffect, useRef, useState } from 'react';
import { Geolocation, type Position } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Haptics } from '@capacitor/haptics';
import type { Track, TrackPoint } from '../types/tracking';
import { saveTrack } from '../services/trackingStorage';
import { notify } from '../services/notificationService';
import { distanceMeters, totalDistance } from '../utils/geo';

const GPS_OPTIONS = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };
const MIN_STEP_M = 5;              // ignora el "ruido" del GPS
const LOW_BATTERY = 0.15;          // 15 %
const IDLE_MS = 2 * 60 * 1000;     // 2 minutos sin moverse
const FAST_SPEED_MS = 8.3;         // ~30 km/h
const CHECK_EVERY_MS = 30_000;     // revisión de batería e inactividad

const toPoint = (pos: Position): TrackPoint => ({
  lat: pos.coords.latitude,
  lng: pos.coords.longitude,
  speed: pos.coords.speed ?? null,
  timestamp: pos.timestamp,
});

const vibrate = (ms: number) => Haptics.vibrate({ duration: ms }).catch(() => undefined);

async function isBatteryLow(): Promise<boolean> {
  try {
    const { batteryLevel, isCharging } = await Device.getBatteryInfo();
    return batteryLevel !== undefined && batteryLevel <= LOW_BATTERY && !isCharging;
  } catch {
    return false; // algunos navegadores no exponen la batería
  }
}

export function useTracking() {
  const [position, setPosition] = useState<TrackPoint | null>(null);
  const [points, setPoints] = useState<TrackPoint[]>([]);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const watchId = useRef<string | null>(null);
  const pointsRef = useRef<TrackPoint[]>([]);
  const startedAt = useRef(0);
  const lastMoveAt = useRef(0);
  const idleNotified = useRef(false);
  const fastNotified = useRef(false);

  // Ubicación inicial al abrir la app
  useEffect(() => {
    Geolocation.getCurrentPosition(GPS_OPTIONS)
      .then((pos) => setPosition(toPoint(pos)))
      .catch(() => setError('No se pudo obtener la ubicación. Activa el GPS y concede los permisos.'));
  }, []);

  const handlePosition = useCallback((pos: Position) => {
    const point = toPoint(pos);
    setPosition(point);
    setError(null);

    const last = pointsRef.current[pointsRef.current.length - 1];
    if (!last || distanceMeters(last, point) >= MIN_STEP_M) {
      pointsRef.current = [...pointsRef.current, point];
      setPoints(pointsRef.current);
      lastMoveAt.current = Date.now();
      idleNotified.current = false;
    }

    if (point.speed !== null && point.speed > FAST_SPEED_MS && !fastNotified.current) {
      fastNotified.current = true;
      void notify('¡Vas muy rápido!', `Velocidad: ${Math.round(point.speed * 3.6)} km/h`);
    }
  }, []);

  const start = useCallback(async () => {
    if (await isBatteryLow()) {
      setError('Batería baja (15 % o menos): conecta el cargador para iniciar el tracking.');
      return;
    }

    pointsRef.current = [];
    setPoints([]);
    setError(null);
    startedAt.current = Date.now();
    lastMoveAt.current = Date.now();
    idleNotified.current = false;
    fastNotified.current = false;

    await vibrate(500);
    watchId.current = await Geolocation.watchPosition(GPS_OPTIONS, (pos, err) => {
      if (err || !pos) {
        setError('Se perdió la señal del GPS.');
        return;
      }
      handlePosition(pos);
    });
    setTracking(true);
  }, [handlePosition]);

  /** Detiene el tracking y guarda el recorrido. Devuelve null si fue muy corto. */
  const stop = useCallback(async (reason?: string): Promise<Track | null> => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
    }
    setTracking(false);
    await vibrate(200);
    if (reason) await notify('Tracking detenido', reason);

    const pts = pointsRef.current;
    if (pts.length < 2) return null;

    const track: Track = {
      id: String(startedAt.current),
      startedAt: startedAt.current,
      endedAt: Date.now(),
      distanceMeters: totalDistance(pts),
      points: pts,
    };
    await saveTrack(track);
    return track;
  }, []);

  // Mientras se graba: revisa batería baja e inactividad
  useEffect(() => {
    if (!tracking) return;

    const timer = setInterval(async () => {
      if (await isBatteryLow()) {
        await stop('Batería baja: se detuvo el tracking y se guardó el recorrido.');
        return;
      }
      if (!idleNotified.current && Date.now() - lastMoveAt.current > IDLE_MS) {
        idleNotified.current = true;
        await notify('¿Sigues ahí?', 'Llevas más de 2 minutos sin moverte.');
      }
    }, CHECK_EVERY_MS);

    return () => clearInterval(timer);
  }, [tracking, stop]);

  // Limpia el GPS si se desmonta el componente
  useEffect(() => {
    return () => {
      if (watchId.current) void Geolocation.clearWatch({ id: watchId.current });
    };
  }, []);

  return { position, points, tracking, error, start, stop };
}