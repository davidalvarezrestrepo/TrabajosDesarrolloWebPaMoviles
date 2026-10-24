import { useCallback, useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useAuthContext } from './useAuthContext';
import { useMisionesContext } from './useMisionesContext';
import { DISTANCIA_META } from '../data/misiones';

interface Coords {
  lat: number;
  lng: number;
}

const RADIO_TIERRA = 6371000;
// Lecturas con precisión peor que esto (en metros) se ignoran.
const PRECISION_MINIMA = 15;
const VELOCIDAD_MAXIMA = 4;
const LECTURAS_PARA_COMPLETAR = 3;

const aRadianes = (grados: number) => (grados * Math.PI) / 180;
const claveOrigen = (uid: string) => `origen_mision2_${uid}`;

export const calcularDesplazamiento = (origen: Coords, actual: Coords) => {
  const y = aRadianes(actual.lat - origen.lat) * RADIO_TIERRA;
  const x = aRadianes(actual.lng - origen.lng) * RADIO_TIERRA * Math.cos(aRadianes(origen.lat));
  return { x, y, distancia: Math.hypot(x, y) };
};

export const useMisionMovimiento = () => {
  const { user } = useAuthContext();
  const { isCompleted, setProgress, completeMission, resetMission } = useMisionesContext();
  const uid = user?.uid;
  const completada = isCompleted(2);

  const [origen, setOrigen] = useState<Coords | null>(null);
  const [actual, setActual] = useState<Coords | null>(null);
  const [enCurso, setEnCurso] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const watchRef = useRef<string | null>(null);
  const inicioRef = useRef<number | null>(null);
  const completandoRef = useRef(false);
  const ultimaRef = useRef<{ coords: Coords; t: number } | null>(null);
  const lecturasDentroRef = useRef(0);

  const desplazamiento = origen && actual ? calcularDesplazamiento(origen, actual) : null;
  const distancia = desplazamiento?.distancia ?? 0;
  const avance = completada ? 1 : Math.min(1, distancia / DISTANCIA_META);

  useEffect(() => {
    if (!uid) return;
    try {
      const guardado = localStorage.getItem(claveOrigen(uid));
      if (guardado) setOrigen(JSON.parse(guardado));
    } catch {
      
    }
  }, [uid]);

  const detener = useCallback(async () => {
    if (watchRef.current) {
      await Geolocation.clearWatch({ id: watchRef.current });
      watchRef.current = null;
    }
    setEnCurso(false);
  }, []);

  const seguir = useCallback(async () => {
    if (watchRef.current) return;
    try {
      await Geolocation.requestPermissions();
      watchRef.current = await Geolocation.watchPosition(
        { enableHighAccuracy: true, maximumAge: 0 },
        (pos, err) => {
          if (err) {
            setError(err.message);
            return;
          }

          
          if (!pos || pos.coords.accuracy > PRECISION_MINIMA) return;

          const nuevo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          const ahora = Date.now();
          const previa = ultimaRef.current;

          
          if (previa) {
            const salto = calcularDesplazamiento(previa.coords, nuevo).distancia;
            const segundos = Math.max((ahora - previa.t) / 1000, 0.5);
            if (salto / segundos > VELOCIDAD_MAXIMA) return;
          }


          ultimaRef.current = { coords: nuevo, t: ahora };
          setActual(nuevo);
        }
      );
      setEnCurso(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);


  useEffect(() => {
    if (origen && !completada) {
      inicioRef.current ??= Date.now();
      seguir();
    }
  }, [origen, completada, seguir]);


  useEffect(() => {
    return () => {
      detener();
    };
  }, [detener]);


  useEffect(() => {
    setProgress(2, avance);
  }, [avance]);


  useEffect(() => {
    if (completada || !origen || completandoRef.current) return;
    if (distancia >= DISTANCIA_META) {
      lecturasDentroRef.current += 1;
    } else {
      lecturasDentroRef.current = 0;
    }
    if (lecturasDentroRef.current >= LECTURAS_PARA_COMPLETAR) {
      completandoRef.current = true;
      const segundos = inicioRef.current ? (Date.now() - inicioRef.current) / 1000 : 0;
      detener().then(() => completeMission(2, segundos));
    }
  }, [actual]);

  const capturarOrigen = async () => {
    setError(null);
    try {
      await Geolocation.requestPermissions();
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const nuevo = { lat: pos.coords.latitude, lng: pos.coords.longitude };

      if (uid) {
        try {
          localStorage.setItem(claveOrigen(uid), JSON.stringify(nuevo));
        } catch {
      
        }
      }
      inicioRef.current = Date.now();
      completandoRef.current = false;
      ultimaRef.current = null;
      lecturasDentroRef.current = 0;
      setActual(nuevo);
      setOrigen(nuevo);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const reiniciar = async () => {
    await detener();
    if (uid) {
      try {
        localStorage.removeItem(claveOrigen(uid));
      } catch {
     
      }
    }
    inicioRef.current = null;
    completandoRef.current = false;
    ultimaRef.current = null;
    lecturasDentroRef.current = 0;
    setOrigen(null);
    setActual(null);
    setError(null);
    await resetMission(2);
  };

  return {
    origen,
    actual,
    desplazamiento,
    distancia,
    avance,
    enCurso,
    error,
    completada,
    capturarOrigen,
    reiniciar,
  };
};