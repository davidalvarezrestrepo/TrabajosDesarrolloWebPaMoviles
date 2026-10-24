import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
} from '@ionic/react';
import { useHaptics } from '../hooks/useHaptics';

function Haptics() {
  const { impact, notify, vibrate } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Vibración (Haptics)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ marginTop: 0 }}>Toca para sentir cada tipo de vibración.</p>

        <IonButton expand="block" onClick={() => impact('light')}>Impacto suave</IonButton>
        <IonButton expand="block" onClick={() => impact('medium')}>Impacto medio</IonButton>
        <IonButton expand="block" onClick={() => impact('heavy')}>Impacto fuerte</IonButton>

        <IonButton expand="block" fill="outline" color="success" onClick={() => notify('success')}>
          Notificación éxito
        </IonButton>
        <IonButton expand="block" fill="outline" color="danger" onClick={() => notify('error')}>
          Notificación error
        </IonButton>

        <IonButton expand="block" color="tertiary" onClick={() => vibrate(500)}>
          Vibrar 0.5 s
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Haptics;