import { useState } from 'react';
import { IonApp, setupIonicReact, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';

import ListaContactosPage from './pages/ListaContactosPage';
import CrearContactoPage from './pages/CrearContactoPage';
import DetalleContactoPage from './pages/DetalleContactoPage';
import LoginPage from './pages/LoginPage';
import useCargarContactos from './CargarContactos';
import Loader from './Loader';
import { isLogged, logout } from './auth';

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

  // Estado de sesión — se inicializa leyendo localStorage
  const [autenticado, setAutenticado] = useState<boolean>(isLogged());

  function manejarLogout() {
    logout();
    setAutenticado(false);
  }

  // Callback que las páginas pueden llamar para refrescar el estado
  // (por si el login pasa dentro de una página hija)
  function refrescarAuth() {
    setAutenticado(isLogged());
  }

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
          <Route path="/login" exact>
            <LoginPage onLoginExitoso={refrescarAuth} />
          </Route>

          <Route path="/lista" exact>
            {autenticado ? (
              <ListaContactosPage
                contactos={contactos}
                onEliminar={eliminarContacto}
                onLogout={manejarLogout}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/crear" exact>
            {autenticado ? (
              <CrearContactoPage onAgregar={agregarContacto} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/detalle/:id" exact>
            {autenticado ? (
              <DetalleContactoPage buscarContacto={buscarContacto} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/">
            <Redirect to={autenticado ? '/lista' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;