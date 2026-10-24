import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MisionFoto from './pages/MisionFoto';
import MisionMovimiento from './pages/MisionMovimiento';
import MisionQuietud from './pages/MisionQuietud';
import Resultados from './pages/Resultados';

function App() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mision-foto" element={<MisionFoto />} />
        <Route path="/mision-movimiento" element={<MisionMovimiento />} />
        <Route path="/mision-quietud" element={<MisionQuietud />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default App;