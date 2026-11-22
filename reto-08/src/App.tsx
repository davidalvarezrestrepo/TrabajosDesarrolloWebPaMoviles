import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Tareas from './pages/Tareas';
import Mapa from './pages/Mapa';
import Historial from './pages/Historial';
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
  const { session, loading } = useAuth();

  // Espera a saber si hay una sesión guardada antes de decidir la ruta
  if (loading) return null;

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Reto 08-2 (Supabase): rutas protegidas según la sesión */}
        <Route path="/login" element={session ? <Navigate to="/tareas" replace /> : <Login />} />
        <Route path="/tareas" element={session ? <Tareas /> : <Navigate to="/login" replace />} />

        {/* Reto 08 (mapas) */}
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/historial" element={<Historial />} />

        {/* Reto 07 (sensores) */}
        <Route path="/home" element={<Home />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/accelerometer" element={<Accelerometer />} />
        <Route path="/device" element={<Device />} />
        <Route path="/haptics" element={<Haptics />} />
        <Route path="/filesystem" element={<Filesystem />} />
        <Route path="/local-notifications" element={<LocalNotifications />} />
        <Route path="/push-notifications" element={<PushNotifications />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default App;