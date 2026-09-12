import { useState } from 'react';
import useLogin from './useLogin';
import Login from './Login';
import App from './App';
import useCargarPacientes from './CargarPacientes';
import ListaPacientes from './ListaPacientes';

function AppRoot() {
  const { sesion, error, iniciarSesion, cerrarSesion } = useLogin();

  if (!sesion) {
    return <Login onIniciarSesion={iniciarSesion} error={error} />;
  }

  return (
    <>
      <App nombre={sesion.nombre} onCerrarSesion={cerrarSesion} />
      <Pacientes />
    </>
  );
}

function Pacientes() {
  const { pacientes, setPacientes } = useCargarPacientes();

  // Ebuscador EN padre
  const [busqueda, setBusqueda] = useState<string>('');

  function agregarPaciente(nombre: string, apellido: string, cc: string, telefono: string): string {
    const yaExiste = pacientes.some((p) => p.cc === cc);

    if (yaExiste) {
      return 'Ya existe un paciente con esa CC';
    }

    const nuevo = {
      id: Date.now().toString(),
      nombre,
      apellido,
      cc,
      telefono,
    };

    setPacientes([...pacientes, nuevo]);

    return '';
  }

  const busquedaLimpia = busqueda.trim().toLowerCase();

  const pacientesFiltrados = busquedaLimpia === ''
    ? pacientes
    : pacientes.filter((p) =>
        p.nombre.toLowerCase().includes(busquedaLimpia) ||
        p.apellido.toLowerCase().includes(busquedaLimpia) ||
        p.cc.includes(busquedaLimpia)
      );

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o CC"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ListaPacientes
        pacientes={pacientesFiltrados}
        onAgregar={agregarPaciente}
      />
    </>
  );
}

export default AppRoot;