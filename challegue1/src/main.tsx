import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import App from './App.tsx'
import CargarContactos from './CargarContactos';
import Loader from './Loader';
import ListaContactos from './ListaContactos';


import { IonApp, setupIonicReact } from '@ionic/react';

setupIonicReact();





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

/*createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Contactos />
  </StrictMode>,  
)
*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IonApp>
      <App>
        <Contactos />
      </App>
    </IonApp>
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