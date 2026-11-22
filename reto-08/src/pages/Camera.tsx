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
import { useCamera } from '../hooks/useCamera';

function Camera() {
  const { photo, error, takePhoto, pickFromGallery } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}>
          Tomar foto
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={pickFromGallery}>
          Elegir de la galería
        </IonButton>

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: '1rem' }}>{error}</p>
          </IonText>
        )}

        {photo && (
          <img
            src={photo}
            alt="Foto tomada"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              borderRadius: '12px',
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
}

export default Camera;