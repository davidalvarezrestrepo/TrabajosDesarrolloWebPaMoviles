import { useState, useEffect } from 'react';
import { Visita, VISITAS_INICIALES, EstadoVisita } from '../data/visitasIniciales';

const STORAGE_KEY = 'mediclinic-ionic:visitas';

const FLUJO_ESTADOS: EstadoVisita[] = ['pendiente', 'en_camino', 'finalizada'];

function useVisitas() {
  const [visitas, setVisitas] = useState<Visita[]>(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY);
    return guardadas ? JSON.parse(guardadas) : VISITAS_INICIALES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitas));
  }, [visitas]);

  function cambiarEstado(id: string) {
    setVisitas((prev) =>
      prev.map((v) => {
        if (v.id !== id) return v;

        const indiceActual = FLUJO_ESTADOS.indexOf(v.estado);
        const siguienteIndice = indiceActual + 1;

        if (siguienteIndice >= FLUJO_ESTADOS.length) return v;

        return { ...v, estado: FLUJO_ESTADOS[siguienteIndice] };
      })
    );
  }

  return { visitas, cambiarEstado };
}

export default useVisitas;