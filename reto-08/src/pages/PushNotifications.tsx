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
import { usePushNotifications } from '../hooks/usePushNotifications';

function PushNotifications() {
  const { token, notification, accion, permission, error, requestPermission } =
    usePushNotifications();

  const copiarToken = async () => {
    if (token) await navigator.clipboard.writeText(token);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones push</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ marginTop: 0 }}>Permiso: <strong>{permission ?? '—'}</strong></p>

        <IonButton expand="block" onClick={requestPermission}>
          Activar push
        </IonButton>

        <h3>Token del dispositivo</h3>
        <p style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>{token ?? 'Aún no hay token'}</p>
        {token && (
          <IonButton expand="block" fill="outline" onClick={copiarToken}>
            Copiar token
          </IonButton>
        )}

        <h3>Última notificación recibida</h3>
        {notification ? (
          <p>{notification.title} - {notification.body}</p>
        ) : (
          <p>Ninguna todavía</p>
        )}

        <h3>Última notificación tocada</h3>
        {accion ? (
          <p>{accion.notification.title}</p>
        ) : (
          <p>Ninguna todavía</p>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default PushNotifications;