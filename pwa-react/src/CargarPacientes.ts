import { useState, useEffect } from 'react';

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  cc: string;
  telefono: string;
}

function useCargarPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(() => {
    const guardados = localStorage.getItem('pacientes');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  return { pacientes, setPacientes };
}

export default useCargarPacientes;