interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
}

interface Props {
  contactos: Contacto[];
  onEliminar: (id: string) => void;
  onAgregar: (nombre: string, telefono: string) => void;
}

function ListaContactos({ contactos, onEliminar, onAgregar }: Props) {
  function manejarEnvio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = event.currentTarget;

    const nombre = formulario.nombre.value;
    const telefono = formulario.telefono.value;

    onAgregar(nombre, telefono);

    formulario.reset();
  }

  return (
    <>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          required
        />

        <button type="submit">
          Agregar contacto
        </button>
      </form>

      <ul>
        {contactos.map((contacto) => (
          <li key={contacto.id}>
            {contacto.nombre} — {contacto.telefono}

            <button onClick={() => onEliminar(contacto.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaContactos;