import { useState, useEffect } from 'react';

interface Usuario {
  usuario: string;
  password: string;
  nombre: string;

}

interface Sesion {
  usuario: string;
  nombre: string;

}

const USUARIOS: Usuario[] = [
  { usuario: 'admin',      password: 'admin123',  nombre: 'Administrador'},
  { usuario: 'jperez',     password: 'jperez123', nombre: 'Dr. Juan Pérez' },
  { usuario: 'mrodriguez', password: 'mr123',     nombre: 'Enf. María R.'},
];

function useLogin() {
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const guardada = localStorage.getItem('sesion');

    if (guardada) {
      setSesion(JSON.parse(guardada));
    }
  }, []);

  function iniciarSesion(usuario: string, password: string) {
    const encontrado = USUARIOS.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (encontrado) {
      const nuevaSesion: Sesion = {
        usuario: encontrado.usuario,
        nombre: encontrado.nombre,

      };

      setSesion(nuevaSesion);
      setError('');
      localStorage.setItem('sesion', JSON.stringify(nuevaSesion));
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  }

  function cerrarSesion() {
    setSesion(null);
    setError('');
    localStorage.removeItem('sesion');
  }

  return { sesion, error, iniciarSesion, cerrarSesion };
}

export default useLogin;