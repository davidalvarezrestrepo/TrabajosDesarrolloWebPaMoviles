import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import {
  locationOutline,
  cameraOutline,
  phonePortraitOutline,
  hardwareChipOutline,
  pulseOutline,
  folderOutline,
  notificationsOutline,
  cloudDownloadOutline,
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

const sensores = [
  { nombre: 'Geolocalización', ruta: '/geolocation', icono: locationOutline },
  { nombre: 'Cámara', ruta: '/camera', icono: cameraOutline },
  { nombre: 'Acelerómetro', ruta: '/accelerometer', icono: pulseOutline },
  { nombre: 'Dispositivo', ruta: '/device', icono: hardwareChipOutline },
  { nombre: 'Vibración (Haptics)', ruta: '/haptics', icono: phonePortraitOutline },
  { nombre: 'Archivos (Filesystem)', ruta: '/filesystem', icono: folderOutline },
  { nombre: 'Notificaciones locales', ruta: '/local-notifications', icono: notificationsOutline },
  { nombre: 'Notificaciones push', ruta: '/push-notifications', icono: cloudDownloadOutline },
];

function Home() {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sensores del teléfono</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {sensores.map((s) => (
            <IonItem key={s.ruta} button onClick={() => navigate(s.ruta)}>
              <IonIcon icon={s.icono} slot="start" color="primary" />
              <IonLabel>{s.nombre}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Home;