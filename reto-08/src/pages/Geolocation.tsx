import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';

function Geolocation() {
  const { position, error, watchId, getCurrentLocation, startTracking, stopTracking } =
    useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>
          Obtener ubicación actual
        </IonButton>

        {watchId ? (
          <IonButton expand="block" color="danger" onClick={stopTracking}>
            Detener seguimiento
          </IonButton>
        ) : (
          <IonButton expand="block" fill="outline" onClick={startTracking}>
            Iniciar seguimiento en vivo
          </IonButton>
        )}

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: '1rem' }}>{error}</p>
          </IonText>
        )}

        {position && (
          <IonList style={{ marginTop: '1rem' }}>
            <IonItem>
              <IonLabel>
                <h3>Latitud</h3>
                <p>{position.latitude}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Longitud</h3>
                <p>{position.longitude}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Precisión</h3>
                <p>{position.accuracy?.toFixed(1)} m</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Altitud</h3>
                <p>{position.altitude != null ? `${position.altitude.toFixed(1)} m` : '—'}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>Velocidad</h3>
                <p>{position.speed != null ? `${position.speed.toFixed(1)} m/s` : '—'}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Geolocation;