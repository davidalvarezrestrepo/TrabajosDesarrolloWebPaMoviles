import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router';

import ListaContactosPage from './pages/ListaContactosPage';
import CrearContactoPage from './pages/CrearContactoPage';
import DetalleContactoPage from './pages/DetalleContactoPage';
import useCargarContactos from './CargarContactos';
import Loader from './Loader';

import './App.css';

setupIonicReact();

function App() {
  const {
    contactos,
    cargando,
    agregarContacto,
    eliminarContacto,
    buscarContacto,
  } = useCargarContactos();

  if (cargando) {
    return (
      <IonApp>
        <Loader />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/lista" exact>
            <ListaContactosPage
              contactos={contactos}
              onEliminar={eliminarContacto}
            />
          </Route>

          <Route path="/crear" exact>
            <CrearContactoPage onAgregar={agregarContacto} />
          </Route>

          <Route path="/detalle/:id" exact>
            <DetalleContactoPage buscarContacto={buscarContacto} />
          </Route>

          <Route exact path="/">
            <Redirect to="/lista" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;