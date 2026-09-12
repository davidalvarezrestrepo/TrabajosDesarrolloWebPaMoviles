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

  function agregarPaciente(nombre: string, apellido: string, cc: string, telefono: string): string {
    // Validar duplicado por CC
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

    return '';  // sin error
  }

  return (
    <ListaPacientes
      pacientes={pacientes}
      onAgregar={agregarPaciente}
    />
  );
}

export default AppRoot;