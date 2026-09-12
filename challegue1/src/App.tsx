import './App.css'
import hero from './assets/hero.png'

function App() {
  return (
    <>
      <img 
  src={hero} 
  alt="Imagen principal de la aplicación" 
  className="hero-image"
/>

      <div className="ticks"></div>

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  )
}

export default App