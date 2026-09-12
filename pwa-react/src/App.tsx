import './App.css'
import hero from './assets/hero.png'

interface Props {
  nombre: string;
  onCerrarSesion: () => void;
}

function App({ nombre, onCerrarSesion }: Props) {
  return (
    <>
      <img
        src={hero}
        alt="Imagen principal de la aplicación"
        className="hero-image"
      />

      <div className="ticks"></div>
      <div className="ticks"></div>

      <p>Bienvenido, {nombre}</p>
      <button onClick={onCerrarSesion}>Cerrar sesión</button>

      <section id="spacer"></section>
    </>
  )
}

export default App