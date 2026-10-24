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
  IonSpinner,
  IonText,
} from '@ionic/react';
import { cameraOutline, saveOutline, refreshOutline, checkmarkCircle } from 'ionicons/icons';
import { MISIONES } from '../data/misiones';
import { useMisionFoto } from '../hooks/useMisionFoto';

const mision = MISIONES[0];

function MisionFoto() {
  const { photo, tomarFoto, guardarImagen, reiniciar, completada, guardando, error, avance } =
    useMisionFoto();

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

        {!completada && (
          <IonButton expand="block" onClick={tomarFoto}>
            <IonIcon slot="start" icon={cameraOutline} />
            {photo ? 'Tomar otra foto' : 'Tomar foto'}
          </IonButton>
        )}

        {photo && (
          <img
            src={photo}
            alt="Vista previa"
            style={{ width: '100%', borderRadius: 12, marginTop: 12 }}
          />
        )}

        {photo && !completada && (
          <IonButton expand="block" onClick={guardarImagen} disabled={guardando} style={{ marginTop: 12 }}>
            {guardando ? (
              <IonSpinner name="dots" />
            ) : (
              <>
                <IonIcon slot="start" icon={saveOutline} />
                Guardar imagen
              </>
            )}
          </IonButton>
        )}

        <IonProgressBar value={avance} style={{ marginTop: 16, height: 10, borderRadius: 5 }} />

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

export default MisionFoto;