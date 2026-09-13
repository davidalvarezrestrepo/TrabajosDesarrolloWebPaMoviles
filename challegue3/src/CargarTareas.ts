import { useState, useEffect } from 'react';

export interface Tarea {
  id: string;
  titulo: string;
  completada: boolean;
}

function useCargarTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTareas([
        { id: '1', titulo: 'Estudiar Ionic', completada: false },
        { id: '2', titulo: 'Hacer el reto 3', completada: false },
        { id: '3', titulo: 'Configurar Capacitor', completada: true },
      ]);
      setCargando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return { tareas, setTareas, cargando };
}

export default useCargarTareas;