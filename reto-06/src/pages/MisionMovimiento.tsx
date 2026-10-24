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
  IonText,
} from '@ionic/react';
import { locationOutline, refreshOutline, checkmarkCircle } from 'ionicons/icons';
import { MISIONES, DISTANCIA_META } from '../data/misiones';
import { useMisionMovimiento } from '../hooks/useMisionMovimiento';

const mision = MISIONES[1];
const TAMANO = 240;
const MITAD = TAMANO / 2;

function MisionMovimiento() {
  const {
    origen,
    desplazamiento,
    distancia,
    avance,
    enCurso,
    error,
    completada,
    capturarOrigen,
    reiniciar,
  } = useMisionMovimiento();

  // Escala del gráfico: muestra la meta y un poco más si ya te alejaste.
  const escala = Math.max(DISTANCIA_META, distancia) * 1.2;
  const pxPorMetro = MITAD / escala;
  const punto = desplazamiento
    ? { cx: MITAD + desplazamiento.x * pxPorMetro, cy: MITAD - desplazamiento.y * pxPorMetro }
    : { cx: MITAD, cy: MITAD };

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

        {!origen && !completada && (
          <IonButton expand="block" onClick={capturarOrigen}>
            <IonIcon slot="start" icon={locationOutline} />
            Capturar posición original
          </IonButton>
        )}

        {origen && (
          <p style={{ fontSize: '0.9rem' }}>
            <strong>Posición original:</strong> {origen.lat.toFixed(5)}, {origen.lng.toFixed(5)}
          </p>
        )}

        {origen && !completada && (
          <p style={{ fontWeight: 600 }}>
            Muévete para completar los {DISTANCIA_META} metros
            {enCurso ? '' : ' (esperando GPS…)'}
          </p>
        )}

        {origen && (
          <>
            <svg
              viewBox={`0 0 ${TAMANO} ${TAMANO}`}
              width="100%"
              style={{ maxWidth: 260, display: 'block', margin: '12px auto' }}
            >
              <line x1={0} y1={MITAD} x2={TAMANO} y2={MITAD} stroke="var(--ion-color-medium)" />
              <line x1={MITAD} y1={0} x2={MITAD} y2={TAMANO} stroke="var(--ion-color-medium)" />
              <circle
                cx={MITAD}
                cy={MITAD}
                r={DISTANCIA_META * pxPorMetro}
                fill="none"
                stroke="var(--ion-color-medium)"
                strokeDasharray="4 4"
              />
              <text x={TAMANO - 4} y={MITAD - 6} textAnchor="end" fontSize="12" fill="var(--ion-text-color)">
                X (este)
              </text>
              <text x={MITAD + 6} y={12} fontSize="12" fill="var(--ion-text-color)">
                Y (norte)
              </text>
              <circle cx={MITAD} cy={MITAD} r={4} fill="var(--ion-color-medium)" />
              {desplazamiento && <circle cx={punto.cx} cy={punto.cy} r={8} fill="#10b981" />}
            </svg>
            <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
              X: {desplazamiento ? desplazamiento.x.toFixed(1) : '0.0'} m · Y:{' '}
              {desplazamiento ? desplazamiento.y.toFixed(1) : '0.0'} m · Distancia:{' '}
              {distancia.toFixed(1)} m
            </p>
          </>
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

export default MisionMovimiento;