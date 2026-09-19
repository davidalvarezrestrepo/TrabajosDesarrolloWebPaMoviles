export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
}

export const PACIENTES_INICIALES: Paciente[] = [
  { id: 'p1', nombre: 'Carlos',   apellido: 'Ramírez' },
  { id: 'p2', nombre: 'Sofía',    apellido: 'Gómez' },
  { id: 'p3', nombre: 'Andrés',   apellido: 'Torres' },
  { id: 'p4', nombre: 'Valentina', apellido: 'Hernández' },
  { id: 'p5', nombre: 'Diego',    apellido: 'Castro' },
];