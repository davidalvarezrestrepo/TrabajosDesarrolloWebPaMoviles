import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonText,
} from '@ionic/react';
import { useLocalNotifications } from '../hooks/useLocalNotifications';

function LocalNotifications() {
  const { permission, error, requestPermission, sendNotification, scheduleNotification } =
    useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones locales</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ marginTop: 0 }}>Permiso: <strong>{permission ?? '—'}</strong></p>

        <IonButton expand="block" onClick={requestPermission}>
          Pedir permiso
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => sendNotification('Hola', 'Notificación inmediata')}
        >
          Enviar ahora
        </IonButton>

        <IonButton
          expand="block"
          color="tertiary"
          onClick={() => scheduleNotification('Recordatorio', 'En 5 segundos', 5)}
        >
          Programar en 5 s
        </IonButton>

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: '1rem' }}>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default LocalNotifications;