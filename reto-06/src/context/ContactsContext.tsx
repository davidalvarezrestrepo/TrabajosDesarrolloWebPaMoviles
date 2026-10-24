import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useRealTimeCollection from '../hooks/useRealTimeCollection';

export interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
}

interface ContactsContextType {
  contactos: Contacto[];
  cargando: boolean;
  agregar: (nombre: string, telefono: string, email?: string) => Promise<void>;
  eliminar: (id: string) => Promise<void>;
  obtenerPorId: (id: string) => Contacto | undefined;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function ContactsProvider({ children }: Props) {
  const { results, isPending, add, deleteDoc } =
    useRealTimeCollection<Contacto>('contactos');

  const contactos: Contacto[] = results;

  const [primeraCarga, setPrimeraCarga] = useState(true);
  useEffect(() => {
    if (!isPending) setPrimeraCarga(false);
  }, [isPending]);

  const agregar = async (nombre: string, telefono: string, email?: string) => {
    await add({ nombre, telefono, email: email ?? '' });
  };

  const eliminar = async (id: string) => {
    await deleteDoc(id);
  };

  const obtenerPorId = (id: string) => contactos.find((c) => c.id === id);

  return (
    <ContactsContext.Provider
      value={{ contactos, cargando: primeraCarga, agregar, eliminar, obtenerPorId }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContactsContext() {
  const ctx = useContext(ContactsContext);
  if (!ctx) {
    throw new Error('useContactsContext debe usarse dentro de ContactsProvider');
  }
  return ctx;
}