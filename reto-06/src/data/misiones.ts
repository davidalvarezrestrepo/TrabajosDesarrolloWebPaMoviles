import { cameraOutline, locationOutline, pulseOutline } from 'ionicons/icons';


export const DISTANCIA_META = 10;
export const SEGUNDOS_QUIETO = 10;

export interface Mision {
  id: number;
  titulo: string;
  descripcion: string;
  puntos: number;
  ruta: string;
  color: string;
  icono: string;
}

export const MISIONES: Mision[] = [
  {
    id: 1,
    titulo: 'Tomar una foto',
    descripcion: 'Captura una imagen y guárdala como evidencia.',
    puntos: 30,
    ruta: '/mision-foto',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    icono: cameraOutline,
  },
  {
    id: 2,
    titulo: `Moverse ${DISTANCIA_META} metros`,
    descripcion: 'Aléjate de tu posición original para completar la distancia.',
    puntos: 40,
    ruta: '/mision-movimiento',
    color: 'linear-gradient(135deg, #10b981, #047857)',
    icono: locationOutline,
  },
  {
    id: 3,
    titulo: `Quieto ${SEGUNDOS_QUIETO} segundos`,
    descripcion: 'Mantén el celular quieto y, al terminar, vibrará.',
    puntos: 50,
    ruta: '/mision-quietud',
    color: 'linear-gradient(135deg, #f59e0b, #b45309)',
    icono: pulseOutline,
  },
];

export const PUNTOS_MAXIMOS = MISIONES.reduce((total, m) => total + m.puntos, 0);


export interface EstadoMision {
  id: number;
  completed: boolean;
  seconds?: number;
}

export interface EstadoMisiones {
  points: number;
  missions: EstadoMision[];
}

export const estadoInicial = (): EstadoMisiones => ({
  points: 0,
  missions: MISIONES.map((m) => ({ id: m.id, completed: false })),
});

export const RANKING_FALSO = [
  { nombre: 'Valentina', puntos: 110 },
  { nombre: 'Santiago', puntos: 80 },
  { nombre: 'Camila', puntos: 50 },
  { nombre: 'Mateo', puntos: 20 },
];