import { IonList } from '@ionic/react';
import type { Tarea } from './CargarTareas';
import TareaItem from './TareaItem';
import FormularioTarea from './FormularioTarea';

interface Props {
  tareas: Tarea[];
  onAgregar: (titulo: string) => void;
  onCompletar: (id: string) => void;
  onEliminar: (id: string) => void;
}

function ListaTareas({ tareas, onAgregar, onCompletar, onEliminar }: Props) {
  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <>
      <FormularioTarea onAgregar={onAgregar} />

      <p style={{ marginTop: '1.5rem' }}>
        <strong>{pendientes}</strong> tarea(s) pendiente(s) de{' '}
        <strong>{tareas.length}</strong>
      </p>

      <IonList>
        {tareas.map((tarea) => (
          <TareaItem
            key={tarea.id}
            tarea={tarea}
            onCompletar={onCompletar}
            onEliminar={onEliminar}
          />
        ))}
      </IonList>
    </>
  );
}

export default ListaTareas;