import { useState } from 'react';

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  cc: string;
  telefono: string;
}

interface Props {
  pacientes: Paciente[];
  onAgregar: (nombre: string, apellido: string, cc: string, telefono: string) => string;
}

function ListaPacientes({ pacientes, onAgregar }: Props) {
  const [error, setError] = useState<string>('');

  function manejarEnvio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = event.currentTarget;

    const nombre = formulario.nombre.value.trim();
    const apellido = formulario.apellido.value.trim();
    const cc = formulario.cc.value.trim();
    const telefono = formulario.telefono.value.trim();

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!soloLetras.test(nombre)) {
      setError('El nombre solo puede contener letras y espacios');
      return;
    }

    if (!soloLetras.test(apellido)) {
      setError('El apellido solo puede contener letras y espacios');
      return;
    }

    const soloNumeros = /^[0-9]+$/;

    if (!soloNumeros.test(cc)) {
      setError('La CC solo puede contener números');
      return;
    }

    const errorPadre = onAgregar(nombre, apellido, cc, telefono);

    if (errorPadre) {
      setError(errorPadre);
      return;
    }

    setError('');
    formulario.reset();
  }

  return (
    <>
      <h2>Pacientes</h2>

      <form onSubmit={manejarEnvio}>
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="text" name="apellido" placeholder="Apellido" required />
        <input type="text" name="cc" placeholder="CC" required />
        <input type="tel" name="telefono" placeholder="Teléfono" required />

        <button type="submit">Agregar paciente</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            {paciente.nombre} {paciente.apellido} — CC: {paciente.cc} — Tel: {paciente.telefono}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaPacientes;