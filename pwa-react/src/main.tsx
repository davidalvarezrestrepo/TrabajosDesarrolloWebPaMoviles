import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CargarContactos from './CargarContactos';
import Loader from './Loader';
import ListaContactos from './ListaContactos';


/*function Contactos() {
  const { contactos, cargando } = CargarContactos();

  return (
    <>
      {cargando ? <Loader /> : <ListaContactos contactos={contactos} />}
    </>
  );
}
*/

function Contactos() {
  const { contactos, setContactos, cargando } = CargarContactos();

  function eliminarContacto(id: string) {
    setContactos(contactos.filter((contacto) => contacto.id !== id));
  }

  function agregarContacto(nombre: string, telefono: string) {
    const nuevoContacto = {
      id: Date.now().toString(),
      nombre: nombre,
      telefono: telefono
    };

    setContactos([...contactos, nuevoContacto]);
  }

  return (
    <>
      {cargando ? (
        <Loader />
      ) : (
        <ListaContactos
          contactos={contactos}
          onEliminar={eliminarContacto}
          onAgregar={agregarContacto}
        />
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Contactos />
  </StrictMode>,  
)


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('Service Worker registrado correctamente');
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}