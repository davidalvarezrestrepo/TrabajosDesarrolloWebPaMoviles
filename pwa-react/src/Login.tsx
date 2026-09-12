interface Props {
  onIniciarSesion: (usuario: string, password: string) => void;
  error: string;
}

function Login({ onIniciarSesion, error }: Props) {
  function manejarEnvio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = event.currentTarget;

    const usuario = formulario.usuario.value;
    const password = formulario.password.value;

    onIniciarSesion(usuario, password);
  }

  return (
    <>
      <h2>Iniciar sesión</h2>

      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />

        <button type="submit">
          Ingresar
        </button>
      </form>

      {error && <p>{error}</p>}
    </>
  );
}

export default Login;