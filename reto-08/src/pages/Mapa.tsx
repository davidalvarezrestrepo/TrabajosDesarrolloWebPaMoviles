import { useEffect, useMemo, useRef, useState } from 'react';
import type { LatLngTuple } from 'leaflet';
import {
  IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage,
  IonSpinner, IonText, IonTitle, IonToolbar, useIonToast,
} from '@ionic/react';
import { playCircleOutline, stopCircleOutline, timeOutline } from 'ionicons/icons';

import MapView from '../components/MapView';
import { useTracking } from '../hooks/useTracking';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { getAddress } from '../services/geocodingService';
import { notify, requestNotificationPermission } from '../services/notificationService';
import { formatDistance, totalDistance } from '../utils/geo';

export default function Mapa() {
  const { position, points, tracking, error, start, stop } = useTracking();
  const { online, connectionType } = useNetworkStatus();
  const [address, setAddress] = useState('');
  const [presentToast] = useIonToast();
  const wasOnline = useRef(true);

  const path = useMemo(() => points.map((p): LatLngTuple => [p.lat, p.lng]), [points]);

  useEffect(() => {
    void requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (!online || tracking || !position) return;
    let active = true;
    getAddress(position.lat, position.lng)
      .then((text) => active && setAddress(text))
      .catch(() => active && setAddress('No se pudo obtener la dirección.'));
    return () => {
      active = false;
    };
  }, [online, tracking, position]);

  // Notificación inteligente: se perdió la conexión
  useEffect(() => {
    if (wasOnline.current && !online) {
      void notify('Sin conexión', 'El mapa puede no cargar, pero el recorrido se sigue registrando.');
    }
    wasOnline.current = online;
  }, [online]);

  const handleToggle = async () => {
    if (!tracking) {
      await start();
      return;
    }
    const saved = await stop();
    await presentToast({
      message: saved
        ? `Recorrido guardado: ${formatDistance(saved.distanceMeters)}`
        : 'Recorrido muy corto, no se guardó.',
      duration: 2500,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Reto-8 · Mapa</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/historial" aria-label="Historial">
              <IonIcon slot="icon-only" icon={timeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding">
          <IonBadge color={online ? 'success' : 'danger'}>
            {online ? `Conectado (${connectionType})` : 'Sin conexión'}
          </IonBadge>
          <p>{online ? address || 'Buscando dirección…' : 'Conéctate a internet para ver la dirección.'}</p>
          {tracking && (
            <p>Grabando: {points.length} puntos · {formatDistance(totalDistance(points))}</p>
          )}
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </div>

        {position ? (
          <MapView center={[position.lat, position.lng]} path={path} follow />
        ) : (
          <div className="map map-loading">
            <IonSpinner /> Buscando tu ubicación…
          </div>
        )}

        <div className="ion-padding">
          <IonButton
            expand="block"
            color={tracking ? 'danger' : 'success'}
            disabled={!position}
            onClick={() => void handleToggle()}
          >
            <IonIcon slot="start" icon={tracking ? stopCircleOutline : playCircleOutline} />
            {tracking ? 'Detener tracking' : 'Iniciar tracking'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}