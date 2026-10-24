import { useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '@capacitor/motion';
import { useHaptics } from './useHaptics';
import { useMisionesContext } from './useMisionesContext';
import { SEGUNDOS_QUIETO } from '../data/misiones';


const UMBRAL_MOVIMIENTO = 1.5;

interface Lectura {
  x: number;
  y: number;
  z: number;
}

export const useMisionQuietud = () => {
  const { isCompleted, setProgress, completeMission, resetMission } = useMisionesContext();
  const { vibrate } = useHaptics();
  const completada = isCompleted(3);

  const [enCurso, setEnCurso] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const listenerRef = useRef<{ remove: () => Promise<void> } | null>(null);
  const intervaloRef = useRef<number | null>(null);
  const activoRef = useRef(false);
  const inicioRef = useRef(0);
  const quietoDesdeRef = useRef(0);
  const ultimaLecturaRef = useRef<Lectura | null>(null);
  const terminandoRef = useRef(false);

  const detener = useCallback(async () => {
    activoRef.current = false;
    if (intervaloRef.current !== null) {
      window.clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    if (listenerRef.current) {
      await listenerRef.current.remove();
      listenerRef.current = null;
    }
    setEnCurso(false);
  }, []);

  const terminar = async () => {
    const tiempo = (Date.now() - inicioRef.current) / 1000;
    await detener();
    await vibrate(500);
    await completeMission(3, tiempo);
  };

  const empezar = async () => {
    if (enCurso || completada) return;
    setError(null);
    try {
      terminandoRef.current = false;
      ultimaLecturaRef.current = null;
      inicioRef.current = Date.now();
      quietoDesdeRef.current = Date.now();
      activoRef.current = true;
      setSegundos(0);

      const listener = await Motion.addListener('accel', (evento) => {
        const a = evento.accelerationIncludingGravity;
        const actual: Lectura = { x: a.x || 0, y: a.y || 0, z: a.z || 0 };
        const previa = ultimaLecturaRef.current;
        ultimaLecturaRef.current = actual;
        if (!previa) return;

        const cambio =
          Math.abs(actual.x - previa.x) + Math.abs(actual.y - previa.y) + Math.abs(actual.z - previa.z);
  
        if (cambio > UMBRAL_MOVIMIENTO) quietoDesdeRef.current = Date.now();
      });

      if (!activoRef.current) {
        await listener.remove();
        return;
      }
      listenerRef.current = listener;

      intervaloRef.current = window.setInterval(() => {
        const quieto = Math.min(SEGUNDOS_QUIETO, (Date.now() - quietoDesdeRef.current) / 1000);
        setSegundos(quieto);
        setProgress(3, quieto / SEGUNDOS_QUIETO);
        if (quieto >= SEGUNDOS_QUIETO && !terminandoRef.current) {
          terminandoRef.current = true;
          terminar();
        }
      }, 100);

      setEnCurso(true);
    } catch (err) {
      setError((err as Error).message);
      await detener();
    }
  };

  const reiniciar = async () => {
    await detener();
    terminandoRef.current = false;
    setSegundos(0);
    setError(null);
    await resetMission(3);
  };


  useEffect(() => {
    return () => {
      detener();
    };
  }, [detener]);

  return {
    enCurso,
    segundos: completada ? SEGUNDOS_QUIETO : segundos,
    error,
    completada,
    empezar,
    reiniciar,
  };
};