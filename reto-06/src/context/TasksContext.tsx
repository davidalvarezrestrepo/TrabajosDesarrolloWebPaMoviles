import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useRealTimeCollection from '../hooks/useRealTimeCollection';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

interface TasksContextType {
  tareas: Tarea[];
  cargando: boolean;
  agregar: (titulo: string, descripcion?: string) => Promise<void>;
  editar: (id: string, cambios: Partial<Omit<Tarea, 'id'>>) => Promise<void>;
  eliminar: (id: string) => Promise<void>;
  completar: (id: string) => Promise<void>;
  obtenerPorId: (id: string) => Tarea | undefined;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function TasksProvider({ children }: Props) {
  const { results, isPending, add, update, deleteDoc } =
    useRealTimeCollection<Tarea>('tareas');

  const tareas: Tarea[] = results;

  // "cargando" solo para la primera carga, no para cada operación
  const [primeraCarga, setPrimeraCarga] = useState(true);
  useEffect(() => {
    if (!isPending) setPrimeraCarga(false);
  }, [isPending]);

  const agregar = async (titulo: string, descripcion = '') => {
    await add({ titulo, descripcion, completada: false });
  };

  const editar = async (id: string, cambios: Partial<Omit<Tarea, 'id'>>) => {
    const actual = tareas.find((t) => t.id === id);
    if (!actual) return;
    await update(id, {
      titulo: cambios.titulo ?? actual.titulo,
      descripcion: cambios.descripcion ?? actual.descripcion ?? '',
      completada: cambios.completada ?? actual.completada,
    });
  };

  const eliminar = async (id: string) => {
    await deleteDoc(id);
  };

  const completar = async (id: string) => {
    const actual = tareas.find((t) => t.id === id);
    if (!actual) return;
    await update(id, {
      titulo: actual.titulo,
      descripcion: actual.descripcion ?? '',
      completada: !actual.completada,
    });
  };

  const obtenerPorId = (id: string) => tareas.find((t) => t.id === id);

  return (
    <TasksContext.Provider
      value={{ tareas, cargando: primeraCarga, agregar, editar, eliminar, completar, obtenerPorId }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasksContext debe usarse dentro de TasksProvider');
  }
  return ctx;
}