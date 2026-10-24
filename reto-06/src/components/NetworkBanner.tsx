import { IonText } from '@ionic/react';

interface Props {
  isOnline: boolean;
}

function NetworkBanner({ isOnline }: Props) {
  if (isOnline) return null;

  return (
    <IonText color="danger">
      <p
        style={{
          marginTop: 0,
          marginBottom: '1rem',
          padding: '0.75rem',
          border: '1px solid',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        Sin conexión. Las acciones de guardar están deshabilitadas.
      </p>
    </IonText>
  );
}

export default NetworkBanner;