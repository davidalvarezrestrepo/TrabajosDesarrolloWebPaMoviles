import { useState, useEffect } from 'react';

interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
}

function useCargarContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: '1', nombre: 'Ana', telefono: '3001112233' },
        { id: '2', nombre: 'Luis', telefono: '3014445566' },
        { id: '3', nombre: 'Miguel', telefono: '3014445566' },
        { id: '4', nombre: 'María', telefono: '3453534543' },
        { id: '5', nombre: 'Lola', telefono: '878686787' },
        { id: '6', nombre: 'Mar', telefono: '1231312' },
        { id: '7', nombre: 'Sol', telefono: '242343423342' },
        { id: '8', nombre: 'Luna', telefono: '676886867' },
        { id: '9', nombre: 'Marce', telefono: '234242342' },
      ]);
      setCargando(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { contactos, setContactos, cargando };
}

export default useCargarContactos;