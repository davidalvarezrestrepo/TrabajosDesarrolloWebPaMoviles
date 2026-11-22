import { supabase } from '../lib/supabase';
import type { Tarea } from '../types/tarea';

const TABLA = 'tareas';

// RLS garantiza que cada usuario solo vea y modifique sus propias tareas
export async function listarTareas(): Promise<Tarea[]> {
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Tarea[];
}

export async function crearTarea(titulo: string): Promise<void> {
  // user_id se llena solo con auth.uid() (valor por defecto de la tabla)
  const { error } = await supabase.from(TABLA).insert({ titulo });
  if (error) throw error;
}

export async function actualizarTarea(
  id: number,
  cambios: Partial<Pick<Tarea, 'titulo' | 'completada'>>,
): Promise<void> {
  const { error } = await supabase.from(TABLA).update(cambios).eq('id', id);
  if (error) throw error;
}

export async function eliminarTarea(id: number): Promise<void> {
  const { error } = await supabase.from(TABLA).delete().eq('id', id);
  if (error) throw error;
}