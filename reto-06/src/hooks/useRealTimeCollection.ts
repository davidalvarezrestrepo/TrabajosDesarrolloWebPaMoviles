import { useState, useEffect } from 'react';
import { ref, get, push, set, remove, onValue } from 'firebase/database';
import { db } from '../firebase/config';

const useRealTimeCollection = <T>(table: string) => {
  const [results, setResults] = useState<(T & { id: string })[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tiempo real
  useEffect(() => {
    setIsPending(true);
    const dbRef = ref(db, table);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...(value as T),
          }));
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [table]);


  const getAll = async () => {
    setIsPending(true);
    setError(null);
    try {
      const snapshot = await get(ref(db, table));
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([id, value]) => ({
          id,
          ...(value as T),
        }));
        setResults(data);
      } else {
        setResults([]);
      }
      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };


  const add = async (data: Record<string, unknown>) => {
    setIsPending(true);
    setError(null);
    try {
      const newRef = await push(ref(db, table), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
      return newRef;
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
      return null;
    }
  };

  // Actualizar registro
  const update = async (id: string, data: Record<string, unknown>) => {
    setIsPending(true);
    setError(null);
    try {
      await set(ref(db, `${table}/${id}`), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      setIsPending(false);
      return true;
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
      return false;
    }
  };

  // Eliminar registro
  const deleteDoc = async (id: string) => {
    setIsPending(true);
    setError(null);
    try {
      await remove(ref(db, `${table}/${id}`));
      setIsPending(false);
      return true;
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, getAll, add, update, deleteDoc };
};

export default useRealTimeCollection;