import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import { useAccelerometer } from '../hooks/useAccelerometer';

function Accelerometer() {
  const { acceleration, magnitude, isShaking, isMoving } = useAccelerometer({
    threshold: 25,
  });

  const TAM_CIRCULO = 220;
  const TAM_PELOTA = 32;
  const RADIO_MAX = (TAM_CIRCULO - TAM_PELOTA) / 2;

  const normalizar = (valor: number) => Math.max(-1, Math.min(1, valor / 9.8));
  const offsetX = -normalizar(acceleration.x) * RADIO_MAX;
  const offsetY = normalizar(acceleration.y) * RADIO_MAX;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Acelerómetro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ marginTop: 0 }}>movimiento del celular</p>

        <IonList>
          <IonItem>
            <IonLabel>
              <h3>X</h3>
              <p>{acceleration.x.toFixed(2)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Y</h3>
              <p>{acceleration.y.toFixed(2)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Z</h3>
              <p>{acceleration.z.toFixed(2)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Magnitud</h3>
              <p>{magnitude.toFixed(2)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Movimiento</h3>
              <p>{isMoving ? 'Sí' : 'No'}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <div
            style={{
              width: TAM_CIRCULO,
              height: TAM_CIRCULO,
              borderRadius: '50%',
              border: '3px solid var(--ion-color-primary)',
              background:
                'radial-gradient(circle, rgba(56,128,255,0.08) 0%, rgba(56,128,255,0.02) 70%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--ion-color-medium)',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: TAM_PELOTA,
                height: TAM_PELOTA,
                borderRadius: '50%',
                background: 'var(--ion-color-danger)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
                transition: 'transform 0.08s linear',
              }}
            />
          </div>
        </div>

        {isShaking && (
          <IonText color="danger">
            <h2 style={{ marginTop: '1rem', textAlign: 'center' }}>¡SHAKE DETECTADO!</h2>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Accelerometer;