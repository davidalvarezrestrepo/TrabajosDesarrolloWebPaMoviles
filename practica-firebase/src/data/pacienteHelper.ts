import { PACIENTES_INICIALES } from './pacientesIniciales';

export function nombreCompletoDePaciente(pacienteId: string): string {
  const paciente = PACIENTES_INICIALES.find((p) => p.id === pacienteId);

  if (!paciente) {
    return 'Paciente desconocido';
  }

  return `${paciente.nombre} ${paciente.apellido}`;
}