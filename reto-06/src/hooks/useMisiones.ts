import { useEffect, useRef, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { useLocalNotifications } from './useLocalNotifications';
import { MISIONES, estadoInicial, type EstadoMisiones } from '../data/misiones';

const CLAVE_LOCAL = 'misiones_';

// Completa el estado guardado con las misiones que falten (Firebase omite lo vacío).
const normalizar = (data: any): EstadoMisiones => {
  const base = estadoInicial();
  const guardadas: any[] = Array.isArray(data?.missions) ? data.missions : [];
  const missions = base.missions.map((m) => {
    const guardada = guardadas.find((g) => g && g.id === m.id);
    if (guardada?.completed) {
      return { id: m.id, completed: true, seconds: Number(guardada.seconds) || 0 };
    }
    return m;
  });

  // Los puntos se recalculan desde las misiones completadas, para no arrastrar valores viejos.
  const points = missions
    .filter((m) => m.completed)
    .reduce((total, m) => total + (MISIONES.find((x) => x.id === m.id)?.puntos ?? 0), 0);

  return { points, missions };
};

const leerLocal = (uid: string): EstadoMisiones | null => {
  try {
    const texto = localStorage.getItem(CLAVE_LOCAL + uid);
    return texto ? normalizar(JSON.parse(texto)) : null;
  } catch {
    return null;
  }
};

const guardarLocal = (uid: string, estado: EstadoMisiones) => {
  try {
    localStorage.setItem(CLAVE_LOCAL + uid, JSON.stringify(estado));
  } catch {
    // Si el almacenamiento falla, igual seguimos con Firebase.
  }
};

export const useMisiones = () => {
  const { user } = useAuthContext();
  const { requestPermission, sendNotification } = useLocalNotifications();

  const [estado, setEstado] = useState<EstadoMisiones>(estadoInicial());
  // Avance en vivo de cada misión (0 a 1). Solo vive en memoria.
  const [progress, setProgressState] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia al estado más reciente, para no leer valores viejos en funciones async.
  const estadoRef = useRef(estado);
  estadoRef.current = estado;

  // Al iniciar sesión: carga lo local, luego Firebase, y se queda con lo que tenga más puntos.
  useEffect(() => {
    if (!user) {
      setEstado(estadoInicial());
      setProgressState({});
      return;
    }

    let cancelado = false;
    const uid = user.uid;

    const cargar = async () => {
      setLoading(true);
      setError(null);
      const local = leerLocal(uid);
      if (local && !cancelado) setEstado(local);

      try {
        const snap = await get(ref(db, `usuarios/${uid}`));
        const remoto = snap.exists() ? normalizar(snap.val()) : null;

        if (cancelado) return;
        if (remoto && (!local || remoto.points >= local.points)) {
          setEstado(remoto);
          guardarLocal(uid, remoto);
        } else if (local) {
          // Lo local va más adelante (por ejemplo, se avanzó sin conexión): se sube.
          await set(ref(db, `usuarios/${uid}`), { email: user.email, ...local });
        }
      } catch (err) {
        if (!cancelado) setError((err as Error).message);
      } finally {
        if (!cancelado) setLoading(false);
      }
    };

    cargar();
    return () => {
      cancelado = true;
    };
  }, [user?.uid]);

  // Guarda en memoria, en local y en Firebase.
  const guardar = async (nuevo: EstadoMisiones) => {
    setEstado(nuevo);
    estadoRef.current = nuevo;
    if (!user) return false;

    guardarLocal(user.uid, nuevo);
    try {
      await set(ref(db, `usuarios/${user.uid}`), { email: user.email, ...nuevo });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const notificar = async (title: string, body: string) => {
    const permitido = await requestPermission();
    if (permitido) await sendNotification(title, body);
  };

  const isCompleted = (id: number) => estado.missions.find((m) => m.id === id)?.completed ?? false;

  // La Misión 3 se habilita al completar la Misión 2. Las demás están libres.
  const isUnlocked = (id: number) => (id === 3 ? isCompleted(2) : true);

  const setProgress = (id: number, value: number) => {
    setProgressState((previo) => ({ ...previo, [id]: Math.max(0, Math.min(1, value)) }));
  };

  const completeMission = async (id: number, seconds: number) => {
    const actual = estadoRef.current;
    const mision = MISIONES.find((m) => m.id === id);
    if (!mision || isCompleted(id) || !isUnlocked(id)) return false;

    const nuevo: EstadoMisiones = {
      points: actual.points + mision.puntos,
      missions: actual.missions.map((m) =>
        m.id === id ? { id, completed: true, seconds: Math.round(seconds) } : m
      ),
    };
    setProgress(id, 1);
    const ok = await guardar(nuevo);

    const completadas = nuevo.missions.filter((m) => m.completed).length;
    await notificar('Misiones', 'Has completado una misión');
    if (completadas === MISIONES.length - 1) {
      await notificar('Misiones', 'Te falta 1 misión para completar');
    }
    return ok;
  };

  // Reinicia una misión. Si es la 2, también la 3, porque depende de ella.
  const resetMission = async (id: number) => {
    const actual = estadoRef.current;
    const ids = id === 2 ? [2, 3] : [id];
    const restar = MISIONES.filter((m) => ids.includes(m.id) && isCompleted(m.id)).reduce(
      (total, m) => total + m.puntos,
      0
    );
    const nuevo: EstadoMisiones = {
      points: Math.max(0, actual.points - restar),
      missions: actual.missions.map((m) => (ids.includes(m.id) ? { id: m.id, completed: false } : m)),
    };
    setProgressState((previo) => {
      const copia = { ...previo };
      ids.forEach((i) => delete copia[i]);
      return copia;
    });
    return guardar(nuevo);
  };

  const resetAll = async () => {
    setProgressState({});
    return guardar(estadoInicial());
  };

  // API: envía el puntaje total a Firebase.
  const sendPoints = async () => {
    if (!user) return false;
    setError(null);
    try {
      await set(ref(db, `usuarios/${user.uid}/points`), estadoRef.current.points);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const total = MISIONES.length;
  const completedCount = estado.missions.filter((m) => m.completed).length;
  const percent = Math.round((completedCount / total) * 100);

  return {
    points: estado.points,
    missions: estado.missions,
    progress,
    loading,
    error,
    total,
    completedCount,
    percent,
    isCompleted,
    isUnlocked,
    setProgress,
    completeMission,
    resetMission,
    resetAll,
    sendPoints,
  };
};