import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { PACIENTES_INICIALES } from '../data/pacientesIniciales';

function Pacientes() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {PACIENTES_INICIALES.map((paciente) => (
            <IonItem key={paciente.id}>
              <IonLabel>
                <h2>{paciente.nombre} {paciente.apellido}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Pacientes;