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

function App() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" element={<Home />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/accelerometer" element={<Accelerometer />} />
        <Route path="/device" element={<Device />} />
        <Route path="/haptics" element={<Haptics />} />
        <Route path="/filesystem" element={<Filesystem />} />
        <Route path="/local-notifications" element={<LocalNotifications />} />
        <Route path="/push-notifications" element={<PushNotifications />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default App;