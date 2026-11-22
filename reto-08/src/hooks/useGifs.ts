import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { Gif } from '../types/gif';
import { getGifs } from '../services/giphyService';

export function useGifs(query: string) {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [total, setTotal] = useState(0);
  const [nextOffset, setNextOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(
    async (offset: number) => {
      // Si hay una petición en curso, se cancela (AbortController)
      controller.current?.abort();
      const ctrl = new AbortController();
      controller.current = ctrl;

      setLoading(true);
      setError(null);
      try {
        const page = await getGifs(query, offset, ctrl.signal);
        setTotal(page.total);
        setNextOffset(offset + page.gifs.length);
        setGifs((prev) => {
          if (offset === 0) return page.gifs;
          const ids = new Set(prev.map((g) => g.id)); // GIPHY a veces repite GIFs entre páginas
          return [...prev, ...page.gifs.filter((g) => !ids.has(g.id))];
        });
      } catch (e) {
        if (!axios.isCancel(e)) setError(e instanceof Error ? e.message : 'Error inesperado.');
      } finally {
        if (controller.current === ctrl) setLoading(false);
      }
    },
    [query],
  );

  // Cada vez que cambia la búsqueda, se carga desde el inicio
  useEffect(() => {
    void load(0);
    return () => controller.current?.abort();
  }, [load]);

  return {
    gifs,
    loading,
    error,
    hasMore: nextOffset < total,
    loadMore: () => load(nextOffset),
    retry: () => load(0),
  };
}