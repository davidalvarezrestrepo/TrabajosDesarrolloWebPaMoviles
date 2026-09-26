import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

import { IonApp, setupIonicReact } from '@ionic/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';

setupIonicReact();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IonApp>
      <AuthProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </AuthProvider>
    </IonApp>
  </StrictMode>
);