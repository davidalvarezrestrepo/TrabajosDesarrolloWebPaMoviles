// Supabase responde en inglés: se traducen los mensajes más comunes
const TRADUCCIONES: Record<string, string> = {
  'Invalid login credentials': 'Correo o contraseña incorrectos.',
  'User already registered': 'Ese correo ya está registrado.',
  'Email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.',
  'Password should be at least 6 characters.': 'La contraseña debe tener al menos 6 caracteres.',
};

export function traducirError(error: unknown): string {
  const mensaje =
    typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message)
      : String(error);
  return TRADUCCIONES[mensaje] ?? mensaje;
}