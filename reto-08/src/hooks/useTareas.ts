import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Tarea } from '../types/tarea';
import {
  actualizarTarea, crearTarea, eliminarTarea, listarTareas,
} from '../services/tareasService';
import { traducirError } from '../utils/errores';

export function useTareas(userId: string | undefined) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    try {
      setTareas(await listarTareas());
      setError(null);
    } catch (e) {
      setError(traducirError(e));
    }
  }, []);

  // Carga inicial + lista en vivo (Realtime): cualquier cambio en la tabla recarga la lista
  useEffect(() => {
    if (!userId) {
      setTareas([]);
      return;
    }
    void cargar();

    const canal = supabase
      .channel(`tareas-${userId}-${Date.now()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, () => {
        void cargar();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(canal);
    };
  }, [userId, cargar]);

  const ejecutar = async (accion: () => Promise<void>) => {
    try {
      await accion();
      await cargar();
    } catch (e) {
      setError(traducirError(e));
    }
  };

  return {
    tareas,
    error,
    crear: (titulo: string) => ejecutar(() => crearTarea(titulo)),
    alternar: (t: Tarea) => ejecutar(() => actualizarTarea(t.id, { completada: !t.completada })),
    renombrar: (t: Tarea, titulo: string) => ejecutar(() => actualizarTarea(t.id, { titulo })),
    eliminar: (t: Tarea) => ejecutar(() => eliminarTarea(t.id)),
  };
}