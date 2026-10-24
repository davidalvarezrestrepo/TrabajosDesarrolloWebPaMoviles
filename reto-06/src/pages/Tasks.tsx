import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonSpinner,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTasksContext } from '../context/TasksContext';

function Tasks() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { tareas, cargando, completar } = useTasksContext();

  const pendientes = tareas.filter((t) => !t.completada).length;

  const cerrarSesion = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={cerrarSesion}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {user && <p style={{ margin: 0 }}>Hola, {user.email}</p>}

        <IonButton
          expand="block"
          onClick={() => navigate('/tasks/new')}
          style={{ marginTop: '1rem' }}
        >
          Nueva tarea
        </IonButton>

        {cargando ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            <p style={{ marginTop: '1.5rem' }}>
              <strong>{pendientes}</strong> pendiente(s) de{' '}
              <strong>{tareas.length}</strong>
            </p>

            <IonList>
              {tareas.map((tarea) => (
                <IonItem
                  key={tarea.id}
                  button
                  onClick={() => navigate(`/tasks/${tarea.id}`)}
                >
                  <IonCheckbox
                    slot="start"
                    checked={tarea.completada}
                    onClick={(e) => e.stopPropagation()}
                    onIonChange={() => completar(tarea.id)}
                  />
                  <IonLabel>
                    <h2
                      style={{
                        textDecoration: tarea.completada ? 'line-through' : 'none',
                        color: tarea.completada ? 'gray' : 'inherit',
                      }}
                    >
                      {tarea.titulo}
                    </h2>
                    {tarea.descripcion && <p>{tarea.descripcion}</p>}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Tasks;