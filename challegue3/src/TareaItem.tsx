import {
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
} from '@ionic/react';
import type { Tarea } from './CargarTareas';

interface Props {
  tarea: Tarea;
  onCompletar: (id: string) => void;
  onEliminar: (id: string) => void;
}

function TareaItem({ tarea, onCompletar, onEliminar }: Props) {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={tarea.completada}
        onIonChange={() => onCompletar(tarea.id)}
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
      </IonLabel>

      <IonButton
        slot="end"
        fill="outline"
        color="danger"
        onClick={() => onEliminar(tarea.id)}
      >
        Eliminar
      </IonButton>
    </IonItem>
  );
}

export default TareaItem;