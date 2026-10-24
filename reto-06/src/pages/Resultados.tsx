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
  useIonToast,
} from '@ionic/react';
import { sendOutline, refreshOutline, trophyOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useMisionesContext } from '../hooks/useMisionesContext';
import { MISIONES, RANKING_FALSO } from '../data/misiones';
import { formatearTiempo } from '../utils/tiempo';

function Resultados() {
  const navigate = useNavigate();
  const [mostrarToast] = useIonToast();
  const {
    points,
    missions,
    completedCount,
    total,
    percent,
    loading,
    error,
    sendPoints,
    resetAll,
  } = useMisionesContext();

  const estadoGeneral = completedCount === total ? 'Completado' : 'En progreso';

  // Ranking: los cuatro usuarios quemados y tú, ordenados por puntos.
  const ranking = [
    ...RANKING_FALSO.map((u) => ({ ...u, esTu: false })),
    { nombre: 'Tú', puntos: points, esTu: true },
  ].sort((a, b) => b.puntos - a.puntos);

  const enviarPuntos = async () => {
    const ok = await sendPoints();
    mostrarToast({
      message: ok ? 'Puntos enviados a Firebase' : 'No se pudieron enviar los puntos',
      duration: 2000,
      color: ok ? 'success' : 'danger',
      position: 'bottom',
    });
  };

  const reiniciar = async () => {
    if (!window.confirm('¿Reiniciar todas las misiones y puntos?')) return;
    await resetAll();
    mostrarToast({ message: 'Misiones reiniciadas', duration: 1500, position: 'bottom' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div
          style={{
            textAlign: 'center',
            padding: '1rem',
            borderRadius: 16,
            background: 'var(--ion-color-primary)',
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          <IonIcon icon={trophyOutline} style={{ fontSize: '2rem' }} />
          <h2 style={{ margin: '0.25rem 0', fontSize: '2rem', fontWeight: 800 }}>{points} pts</h2>
          <p style={{ margin: 0 }}>
            {completedCount} de {total} misiones completadas · {percent}%
          </p>
          <p style={{ margin: '0.25rem 0 0', fontWeight: 700 }}>Estado: {estadoGeneral}</p>
        </div>

        <IonProgressBar value={completedCount / total} style={{ height: 10, borderRadius: 5 }} />

        <h3 style={{ marginTop: '1.25rem' }}>Misiones</h3>
        {MISIONES.map((m) => {
          const estado = missions.find((x) => x.id === m.id);
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--ion-color-light-shade)',
              }}
            >
              <span>{m.titulo}</span>
              <span style={{ fontWeight: 600 }}>
                {estado?.completed ? `Completada · ${formatearTiempo(estado.seconds)}` : 'Pendiente'}
              </span>
            </div>
          );
        })}

        <h3 style={{ marginTop: '1.25rem' }}>Ranking</h3>
        {ranking.map((u, i) => (
          <div
            key={u.nombre}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.6rem 0.9rem',
              marginBottom: 6,
              borderRadius: 10,
              background: u.esTu ? 'var(--ion-color-primary)' : 'var(--ion-color-light)',
              color: u.esTu ? '#fff' : 'var(--ion-text-color)',
              fontWeight: u.esTu ? 800 : 500,
            }}
          >
            <span>
              {i + 1}. {u.nombre}
              {u.esTu ? ' (Tú)' : ''}
            </span>
            <span>{u.puntos} pts</span>
          </div>
        ))}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={enviarPuntos} disabled={loading} style={{ marginTop: 16 }}>
          <IonIcon slot="start" icon={sendOutline} />
          Enviar puntos
        </IonButton>

        <IonButton expand="block" fill="outline" color="danger" onClick={reiniciar}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reiniciar
        </IonButton>

        <IonButton expand="block" fill="clear" onClick={() => navigate('/home')}>
          Volver al inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Resultados;