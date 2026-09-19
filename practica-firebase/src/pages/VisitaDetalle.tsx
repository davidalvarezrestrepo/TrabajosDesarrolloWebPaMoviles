import { useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import useVisitas from '../hooks/useVisitas';
import { nombreCompletoDePaciente } from '../data/pacienteHelper';
import { EstadoVisita } from '../data/visitasIniciales';

function etiquetaDeEstado(estado: EstadoVisita): string {
  if (estado === 'pendiente') return 'Pendiente';
  if (estado === 'en_camino') return 'En camino';
  return 'Finalizada';
}

function textoBoton(estado: EstadoVisita): string {
  if (estado === 'pendiente') return 'Marcar como en camino';
  if (estado === 'en_camino') return 'Marcar como finalizada';
  return 'Visita finalizada';
}

function VisitaDetalle() {
  const { id } = useParams<{ id: string }>();
  const { visitas, cambiarEstado } = useVisitas();

  const visita = visitas.find((v) => v.id === id);

  if (!visita) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/visitas" />
            </IonButtons>
            <IonTitle>Visita no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>La visita solicitada no existe.</p>
        </IonContent>
      </IonPage>
    );
  }

  const esFinalizada = visita.estado === 'finalizada';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/visitas" />
          </IonButtons>
          <IonTitle>Detalle de la visita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h3>Paciente</h3>
              <p>{nombreCompletoDePaciente(visita.pacienteId)}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h3>Fecha y hora</h3>
              <p>{visita.fecha} a las {visita.hora}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h3>Estado actual</h3>
              <p>{etiquetaDeEstado(visita.estado)}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          disabled={esFinalizada}
          onClick={() => cambiarEstado(visita.id)}
        >
          {textoBoton(visita.estado)}
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default VisitaDetalle;