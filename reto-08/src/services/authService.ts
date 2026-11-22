import { supabase } from '../lib/supabase';

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

/** Devuelve true si la sesión quedó iniciada (confirmación de correo desactivada) */
export async function signUp(email: string, password: string): Promise<boolean> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.session !== null;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}