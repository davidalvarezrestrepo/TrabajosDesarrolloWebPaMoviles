import { useCallback, useMemo, useState } from 'react';
import type { LatLngTuple } from 'leaflet';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter,
} from '@ionic/react';

import MapView from '../components/MapView';
import type { Track } from '../types/tracking';
import { dayKey, getTracksByDay, listDays } from '../services/trackingStorage';
import { formatDistance } from '../utils/geo';

const formatHour = (time: number) =>
  new Date(time).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });

const durationMin = (t: Track) => Math.max(1, Math.round((t.endedAt - t.startedAt) / 60000));

export default function Historial() {
  const [days, setDays] = useState<string[]>([]);
  const [day, setDay] = useState(dayKey(Date.now()));
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selected, setSelected] = useState<Track | null>(null);

  const loadDay = useCallback(async (value: string) => {
    setDay(value);
    setSelected(null);
    setTracks(await getTracksByDay(value));
  }, []);

  // Se ejecuta cada vez que se entra a la página (Ionic la mantiene montada)
  useIonViewWillEnter(() => {
    void (async () => {
      const list = await listDays();
      setDays(list);
      if (list.length > 0) await loadDay(list.includes(day) ? day : list[0]);
    })();
  }, [day, loadDay]);

  const path = useMemo(
    () => selected?.points.map((p): LatLngTuple => [p.lat, p.lng]) ?? [],
    [selected],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mapa" />
          </IonButtons>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {days.length === 0 ? (
          <p className="ion-padding">Aún no hay recorridos guardados.</p>
        ) : (
          <>
            <IonList>
              <IonItem>
                <IonSelect
                  label="Día"
                  interface="popover"
                  value={day}
                  onIonChange={(e) => void loadDay(String(e.detail.value))}
                >
                  {days.map((d) => (
                    <IonSelectOption key={d} value={d}>{d}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {tracks.map((t, i) => (
                <IonItem
                  key={t.id}
                  button
                  detail={false}
                  color={selected?.id === t.id ? 'light' : undefined}
                  onClick={() => setSelected(t)}
                >
                  <IonLabel>
                    <h2>Recorrido {i + 1} · {formatHour(t.startedAt)}</h2>
                    <p>{durationMin(t)} min · {t.points.length} puntos</p>
                  </IonLabel>
                  <IonNote slot="end">{formatDistance(t.distanceMeters)}</IonNote>
                </IonItem>
              ))}
            </IonList>

            {selected && <MapView key={selected.id} center={path[0]} path={path} />}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}