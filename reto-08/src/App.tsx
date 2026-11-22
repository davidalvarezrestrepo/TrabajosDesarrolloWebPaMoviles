import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Geolocation from './pages/Geolocation';
import Camera from './pages/Camera';
import Accelerometer from './pages/Accelerometer';
import Device from './pages/Device';
import Haptics from './pages/Haptics';
import Filesystem from './pages/Filesystem';
import LocalNotifications from './pages/LocalNotifications';
import PushNotifications from './pages/PushNotifications';
import Mapa from './pages/Mapa';
import Historial from './pages/Historial';

function App() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Reto 08 */}
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/historial" element={<Historial />} />

        {/* Reto 07 (se conservan) */}
        <Route path="/home" element={<Home />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/accelerometer" element={<Accelerometer />} />
        <Route path="/device" element={<Device />} />
        <Route path="/haptics" element={<Haptics />} />
        <Route path="/filesystem" element={<Filesystem />} />
        <Route path="/local-notifications" element={<LocalNotifications />} />
        <Route path="/push-notifications" element={<PushNotifications />} />

        <Route path="/" element={<Navigate to="/mapa" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default App;