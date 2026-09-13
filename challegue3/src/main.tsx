import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

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

import { IonApp, setupIonicReact } from '@ionic/react';
import App from './App';
import useCargarTareas from './CargarTareas';
import Loader from './Loader';
import ListaTareas from './ListaTareas';

setupIonicReact();

function Tareas() {
  const { tareas, setTareas, cargando } = useCargarTareas();

  function agregarTarea(titulo: string) {
    const nueva = {
      id: Date.now().toString(),
      titulo,
      completada: false,
    };
    setTareas([...tareas, nueva]);
  }

  function completarTarea(id: string) {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  }

  function eliminarTarea(id: string) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  return (
    <>
      {cargando ? (
        <Loader />
      ) : (
        <ListaTareas
          tareas={tareas}
          onAgregar={agregarTarea}
          onCompletar={completarTarea}
          onEliminar={eliminarTarea}
        />
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IonApp>
      <App>
        <Tareas />
      </App>
    </IonApp>
  </StrictMode>
);