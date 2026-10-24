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
  IonSpinner,
  IonButton,
} from '@ionic/react';
import { useDevice } from '../hooks/useDevice';

function Device() {
  const { battery, info, deviceId, loading, refresh } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h3>Batería</h3>
                  <p>{battery?.batteryLevel != null ? Math.round(battery.batteryLevel * 100) : '—'}%</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Cargando</h3>
                  <p>{battery?.isCharging ? 'Sí' : 'No'}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Modelo</h3>
                  <p>{info?.model}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Plataforma</h3>
                  <p>{info?.platform}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Sistema operativo</h3>
                  <p>{info?.operatingSystem} {info?.osVersion}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Fabricante</h3>
                  <p>{info?.manufacturer}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>ID del dispositivo</h3>
                  <p style={{ wordBreak: 'break-all' }}>{deviceId}</p>
                </IonLabel>
              </IonItem>
            </IonList>

            <IonButton expand="block" onClick={refresh} style={{ marginTop: '1rem' }}>
              Actualizar
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Device;