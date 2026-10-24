import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonText,
} from '@ionic/react';
import { playOutline, refreshOutline, checkmarkCircle } from 'ionicons/icons';
import { Navigate } from 'react-router-dom';
import { MISIONES, SEGUNDOS_QUIETO } from '../data/misiones';
import { useMisionQuietud } from '../hooks/useMisionQuietud';
import { useMisionesContext } from '../hooks/useMisionesContext';

const mision = MISIONES[2];

function MisionQuietud() {
  const { isUnlocked } = useMisionesContext();
  const { enCurso, segundos, error, completada, empezar, reiniciar } = useMisionQuietud();

  // Solo se entra si la Misión 2 está completa.
  if (!isUnlocked(3)) return <Navigate to="/home" replace />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{mision.titulo}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mision.descripcion}</p>
        <p>
          <strong>Puntos:</strong> {mision.puntos}
        </p>

        {!completada && !enCurso && (
          <IonButton expand="block" onClick={empezar}>
            <IonIcon slot="start" icon={playOutline} />
            Empezar reto
          </IonButton>
        )}

        {enCurso && (
          <p style={{ textAlign: 'center', fontWeight: 600 }}>
            Permanece quieto: {Math.floor(segundos)} de {SEGUNDOS_QUIETO} s
          </p>
        )}

        <IonProgressBar
          value={segundos / SEGUNDOS_QUIETO}
          style={{ marginTop: 16, height: 10, borderRadius: 5 }}
        />

        {completada && (
          <p style={{ textAlign: 'center', color: 'var(--ion-color-success)', fontWeight: 700 }}>
            <IonIcon icon={checkmarkCircle} /> Has completado esta misión
          </p>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" fill="outline" color="medium" onClick={reiniciar} style={{ marginTop: 16 }}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reiniciar misión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default MisionQuietud;