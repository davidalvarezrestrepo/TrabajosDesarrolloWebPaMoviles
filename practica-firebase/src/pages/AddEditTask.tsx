import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonButton,
  IonText,
} from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTasksContext } from '../context/TasksContext';

function AddEditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obtenerPorId, agregar, editar } = useTasksContext();

  const modoEdicion = Boolean(id);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (modoEdicion && id) {
      const tarea = obtenerPorId(id);
      if (tarea) {
        setTitulo(tarea.titulo);
        setDescripcion(tarea.descripcion ?? '');
      }
    }
  }, [id, modoEdicion, obtenerPorId]);

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (titulo.trim() === '') {
      setError('El título no puede estar vacío.');
      return;
    }

    if (modoEdicion && id) {
      editar(id, { titulo: titulo.trim(), descripcion: descripcion.trim() });
      navigate(`/tasks/${id}`, { replace: true });
    } else {
      agregar(titulo.trim(), descripcion.trim());
      navigate('/tasks', { replace: true });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{modoEdicion ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={guardar}>
          <IonItem>
            <IonInput
              label="Título"
              labelPlacement="stacked"
              type="text"
              placeholder="Ej: Estudiar para el parcial"
              value={titulo}
              onIonInput={(e) => setTitulo(e.detail.value ?? '')}
              required
            />
          </IonItem>

          <IonItem>
            <IonTextarea
              label="Descripción"
              labelPlacement="stacked"
              placeholder="Detalles opcionales"
              value={descripcion}
              onIonInput={(e) => setDescripcion(e.detail.value ?? '')}
              autoGrow
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p style={{ marginTop: '1rem' }}>{error}</p>
            </IonText>
          )}

          <IonButton expand="block" type="submit" style={{ marginTop: '1rem' }}>
            {modoEdicion ? 'Guardar cambios' : 'Crear tarea'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default AddEditTask;