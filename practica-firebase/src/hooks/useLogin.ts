import { useState, useEffect } from 'react';

interface Sesion {
  usuario: string;
  nombre: string;
}

// Usuario fijo de MediClinic (Ionic, app del médico)
const USUARIO_FIJO = {
  usuario: 'doc',
  password: 'doc123',
  nombre: 'Dr. Rodríguez',
};

const STORAGE_KEY = 'mediclinic-ionic:sesion';

function useLogin() {
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);

  // Al montar: revisar si ya hay sesión guardada
  useEffect(() => {
    const guardada = localStorage.getItem(STORAGE_KEY);

    if (guardada) {
      setSesion(JSON.parse(guardada));
    }
  }, []);

  function iniciarSesion(usuario: string, password: string) {
    if (usuario === USUARIO_FIJO.usuario && password === USUARIO_FIJO.password) {
      const nuevaSesion: Sesion = {
        usuario: USUARIO_FIJO.usuario,
        nombre: USUARIO_FIJO.nombre,
      };

      setSesion(nuevaSesion);
      setErrorLogin(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaSesion));
    } else {
      setErrorLogin(true);
    }
  }

  function cerrarSesion() {
    setSesion(null);
    setErrorLogin(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  function cerrarToast() {
    setErrorLogin(false);
  }

  return { sesion, errorLogin, iniciarSesion, cerrarSesion, cerrarToast };
}

export default useLogin;