import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, peopleOutline, personOutline } from 'ionicons/icons';
import VisitaDetalle from './pages/VisitaDetalle';
import Visitas from './pages/Visitas';
import Pacientes from './pages/Pacientes';
import Perfil from './pages/Perfil';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import Login from './pages/Login';
import useLogin from './hooks/useLogin';

setupIonicReact();

const App: React.FC = () => {
  const { sesion, errorLogin, iniciarSesion, cerrarSesion, cerrarToast } = useLogin();

  return (
    <IonApp>
      <IonReactRouter>
        {sesion ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/visitas" element={<Visitas />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/perfil" element={<Perfil sesion={sesion} onCerrarSesion={cerrarSesion} />} />
              <Route path="/visita/:id" element={<VisitaDetalle />} />
              <Route path="/" element={<Navigate to="/visitas" replace />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="visitas" href="/visitas">
                <IonIcon aria-hidden="true" icon={calendarOutline} />
                <IonLabel>Visitas</IonLabel>
              </IonTabButton>
              <IonTabButton tab="pacientes" href="/pacientes">
                <IonIcon aria-hidden="true" icon={peopleOutline} />
                <IonLabel>Pacientes</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" href="/perfil">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <Login
            onIniciarSesion={iniciarSesion}
            errorLogin={errorLogin}
            onCerrarToast={cerrarToast}
          />
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;