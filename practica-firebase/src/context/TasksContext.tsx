import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

interface TasksContextType {
  tareas: Tarea[];
  cargando: boolean;
  agregar: (titulo: string, descripcion?: string) => void;
  editar: (id: string, cambios: Partial<Omit<Tarea, 'id'>>) => void;
  eliminar: (id: string) => void;
  completar: (id: string) => void;
  obtenerPorId: (id: string) => Tarea | undefined;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function TasksProvider({ children }: Props) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTareas([
        { id: '1', titulo: 'Estudiar Ionic', descripcion: 'Repasar componentes', completada: false },
        { id: '2', titulo: 'Hacer el reto 5', descripcion: 'Firebase + contextos', completada: false },
        { id: '3', titulo: 'Configurar Capacitor', descripcion: '', completada: true },
      ]);
      setCargando(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const agregar = (titulo: string, descripcion = '') => {
    const nueva: Tarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      completada: false,
    };
    setTareas((prev) => [...prev, nueva]);
  };

  const editar = (id: string, cambios: Partial<Omit<Tarea, 'id'>>) => {
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t)));
  };

  const eliminar = (id: string) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const completar = (id: string) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const obtenerPorId = (id: string) => tareas.find((t) => t.id === id);

  return (
    <TasksContext.Provider
      value={{ tareas, cargando, agregar, editar, eliminar, completar, obtenerPorId }}
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