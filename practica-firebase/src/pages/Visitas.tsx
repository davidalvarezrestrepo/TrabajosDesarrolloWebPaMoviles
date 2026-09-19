import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import useVisitas from '../hooks/useVisitas';
import { fechaHoy } from '../data/fecha';
import { nombreCompletoDePaciente } from '../data/pacienteHelper';
import { EstadoVisita } from '../data/visitasIniciales';

// Colores del badge según el estado
function colorDeEstado(estado: EstadoVisita): string {
  if (estado === 'pendiente') return 'medium';
  if (estado === 'en_camino') return 'warning';
  return 'success';
}

// Etiqueta legible del estado
function etiquetaDeEstado(estado: EstadoVisita): string {
  if (estado === 'pendiente') return 'Pendiente';
  if (estado === 'en_camino') return 'En camino';
  return 'Finalizada';
}

function Visitas() {
  const { visitas } = useVisitas();

  const hoy = fechaHoy();
  const visitasDeHoy = visitas.filter((v) => v.fecha === hoy);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {visitasDeHoy.length === 0 ? (
          <p>No hay visitas programadas para hoy.</p>
        ) : (
          <IonList>
            {visitasDeHoy.map((visita) => (
              <IonItem
                key={visita.id}
                button
                routerLink={`/visita/${visita.id}`}
                routerDirection="forward"
              >
                <IonLabel>
                  <h2>{nombreCompletoDePaciente(visita.pacienteId)}</h2>
                  <p>Hora: {visita.hora}</p>
                </IonLabel>
                <IonBadge color={colorDeEstado(visita.estado)} slot="end">
                  {etiquetaDeEstado(visita.estado)}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Visitas;