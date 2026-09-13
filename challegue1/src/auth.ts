const TOKEN_KEY = 'logged';

export function login(): void {
  localStorage.setItem(TOKEN_KEY, 'true');
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLogged(): boolean {
  return localStorage.getItem(TOKEN_KEY) === 'true';
}

export const USUARIO_VALIDO = 'user@mail.com';
export const PASSWORD_VALIDO = '123';

export function validarCredenciales(email: string, password: string): boolean {
  return email === USUARIO_VALIDO && password === PASSWORD_VALIDO;
}