import { IonSpinner } from '@ionic/react';

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <IonSpinner name="crescent" />
      <p>Cargando contactos...</p>
    </div>
  );
}

export default Loader;