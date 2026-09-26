import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import AddEditTask from './pages/AddEditTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<AddEditTask />} />
        <Route path="/tasks/:id/edit" element={<AddEditTask />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default App;