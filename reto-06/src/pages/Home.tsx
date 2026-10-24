import type { CSSProperties } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonChip,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonSpinner,
  IonText,
  useIonToast,
} from '@ionic/react';
import { trophyOutline, lockClosedOutline, checkmarkCircle, chevronForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMisionesContext } from '../hooks/useMisionesContext';
import { MISIONES } from '../data/misiones';

// Barra de progreso blanca para que se vea sobre el color de cada panel.
const ESTILO_BARRA = {
  '--background': 'rgba(255, 255, 255, 0.35)',
  '--progress-background': '#ffffff',
  marginTop: '0.75rem',
  height: '8px',
  borderRadius: '4px',
} as CSSProperties;

function Home() {
  const navigate = useNavigate();
  const [mostrarToast] = useIonToast();
  const { logout } = useAuthContext();
  const { points, progress, loading, total, completedCount, percent, isCompleted, isUnlocked } =
    useMisionesContext();

  const cerrarSesion = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const abrir = (id: number, ruta: string) => {
    if (!isUnlocked(id)) {
      mostrarToast({
        message: 'Completa primero la misión 2',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      return;
    }
    navigate(ruta);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonChip slot="start" color="light">
            <IonIcon icon={trophyOutline} />
            <IonLabel>{points} pts</IonLabel>
          </IonChip>
          <IonButtons slot="end">
            <IonButton onClick={cerrarSesion}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '1.4rem', fontWeight: 800 }}>
          MISIONES POR COMPLETAR
        </h1>

        <IonProgressBar value={completedCount / total} style={{ height: '10px', borderRadius: '5px' }} />
        <p style={{ margin: '0.5rem 0 1.25rem' }}>
          <strong>{completedCount}</strong> de <strong>{total}</strong> misiones completadas · {percent}%
        </p>

        {loading && <IonSpinner name="crescent" />}

        {MISIONES.map((m) => {
          const completada = isCompleted(m.id);
          const bloqueada = !isUnlocked(m.id);
          const valor = completada ? 1 : progress[m.id] ?? 0;
          const estado = completada ? 'Completada' : bloqueada ? 'Bloqueada' : 'Pendiente';

          return (
            <div
              key={m.id}
              onClick={() => abrir(m.id, m.ruta)}
              style={{
                background: m.color,
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1rem',
                opacity: bloqueada ? 0.55 : 1,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <IonIcon icon={m.icono} style={{ fontSize: '2rem', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{m.titulo}</h2>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.9rem' }}>+{m.puntos} puntos</p>
                </div>
                <IonIcon
                  icon={bloqueada ? lockClosedOutline : completada ? checkmarkCircle : chevronForwardOutline}
                  style={{ fontSize: '1.6rem', flexShrink: 0 }}
                />
              </div>

              <IonProgressBar value={valor} style={ESTILO_BARRA} />
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', fontWeight: 600 }}>{estado}</p>
            </div>
          );
        })}

        <IonButton expand="block" fill="outline" onClick={() => navigate('/resultados')}>
          Ver resultados
        </IonButton>

        {!loading && percent === 100 && (
          <IonText color="success">
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>¡Completaste todas las misiones!</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Home;