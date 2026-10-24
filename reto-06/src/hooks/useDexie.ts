import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';

const useDexie = (table: string, filterFn: ((item: any) => boolean) | null = null) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tiempo real local con useLiveQuery
  const results =
    useLiveQuery(() => {
      if (filterFn) {
        return (db as any)[table].filter(filterFn).toArray();
      }
      return (db as any)[table].toArray();
    }, [table]) ?? [];

  // Agregar
  const add = async (data: Record<string, unknown>) => {
    setIsPending(true);
    setError(null);
    try {
      await (db as any)[table].add({
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };

  // Actualizar
  const update = async (id: number, data: Record<string, unknown>) => {
    setIsPending(true);
    setError(null);
    try {
      await (db as any)[table].update(id, data);
      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };

  // Eliminar
  const deleteItem = async (id: number) => {
    setIsPending(true);
    setError(null);
    try {
      await (db as any)[table].delete(id);
      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };

  // newFunction: marcar/desmarcar como favorita
  const toggleFavorita = async (id: number, favoritaActual: boolean) => {
    setIsPending(true);
    setError(null);
    try {
      await (db as any)[table].update(id, { favorita: !favoritaActual });
      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };

  return { results, isPending, error, add, update, deleteItem, toggleFavorita };
};

export default useDexie;