import { useState, useEffect } from 'react';

export interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
}

function useCargarContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: '1', nombre: 'Ana', telefono: '3001112233', email: 'ana@mail.com' },
        { id: '2', nombre: 'Luis', telefono: '3014445566', email: 'luis@mail.com' },
        { id: '3', nombre: 'Miguel', telefono: '3017778899', email: 'miguel@mail.com' },
        { id: '4', nombre: 'María', telefono: '3453534543', email: 'maria@mail.com' },
        { id: '5', nombre: 'Lola', telefono: '3128786787', email: 'lola@mail.com' },
      ]);
      setCargando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  function agregarContacto(nombre: string, telefono: string, email?: string) {
    const nuevo: Contacto = {
      id: Date.now().toString(),
      nombre,
      telefono,
      email,
    };
    setContactos((prev) => [...prev, nuevo]);
  }

  function eliminarContacto(id: string) {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  }

  function buscarContacto(id: string): Contacto | undefined {
    return contactos.find((c) => c.id === id);
  }

  return { contactos, cargando, agregarContacto, eliminarContacto, buscarContacto };
}

export default useCargarContactos;