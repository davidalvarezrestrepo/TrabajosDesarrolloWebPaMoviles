import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonBadge,
  IonAlert,
} from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTasksContext } from '../context/TasksContext';

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obtenerPorId, completar, eliminar } = useTasksContext();
  const [pedirConfirmacion, setPedirConfirmacion] = useState(false);

  const tarea = obtenerPorId(id!);

  if (!tarea) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tasks" />
            </IonButtons>
            <IonTitle>Tarea no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No existe una tarea con ese identificador.</p>
          <IonButton expand="block" onClick={() => navigate('/tasks')}>
            Volver a la lista
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const confirmarEliminar = () => {
    eliminar(tarea.id);
    navigate('/tasks', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ marginTop: 0 }}>{tarea.titulo}</h2>

        <IonBadge color={tarea.completada ? 'success' : 'medium'}>
          {tarea.completada ? 'Completada' : 'Pendiente'}
        </IonBadge>

        <h3 style={{ marginTop: '1.5rem' }}>Descripción</h3>
        <p>{tarea.descripcion?.trim() ? tarea.descripcion : 'Sin descripción.'}</p>

        <IonButton
          expand="block"
          onClick={() => completar(tarea.id)}
          style={{ marginTop: '1.5rem' }}
        >
          {tarea.completada ? 'Marcar pendiente' : 'Marcar completada'}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => navigate(`/tasks/${tarea.id}/edit`)}
        >
          Editar
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={() => setPedirConfirmacion(true)}
        >
          Eliminar
        </IonButton>

        <IonAlert
          isOpen={pedirConfirmacion}
          onDidDismiss={() => setPedirConfirmacion(false)}
          header="Eliminar tarea"
          message="¿Seguro que quieres eliminar esta tarea?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', role: 'destructive', handler: confirmarEliminar },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default TaskDetail;