import { fechaHoy } from './fecha';

export type EstadoVisita = 'pendiente' | 'en_camino' | 'finalizada';

export interface Visita {
  id: string;
  pacienteId: string;
  fecha: string;    // YYYY-MM-DD
  hora: string;     // HH:mm
  estado: EstadoVisita;
}

// Calculamos "hoy" y algunas fechas cercanas para variar
const HOY = fechaHoy();
const MAÑANA = calcularFechaRelativa(1);
const AYER = calcularFechaRelativa(-1);

function calcularFechaRelativa(diasDesdeHoy: number): string {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + diasDesdeHoy);

  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}

export const VISITAS_INICIALES: Visita[] = [
  // Las 3 visitas del día (HOY) con estados mezclados
  { id: 'v1', pacienteId: 'p1', fecha: HOY,    hora: '09:00', estado: 'pendiente'  },
  { id: 'v2', pacienteId: 'p2', fecha: HOY,    hora: '10:30', estado: 'en_camino'  },
  { id: 'v3', pacienteId: 'p3', fecha: HOY,    hora: '14:00', estado: 'finalizada' },

  // 2 visitas de otros días (no aparecen en el listado "de hoy")
  { id: 'v4', pacienteId: 'p4', fecha: MAÑANA, hora: '11:00', estado: 'pendiente'  },
  { id: 'v5', pacienteId: 'p5', fecha: AYER,   hora: '16:00', estado: 'finalizada' },
];