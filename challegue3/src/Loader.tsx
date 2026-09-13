import { IonSpinner } from '@ionic/react';

function Loader() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <IonSpinner name="crescent" />
      <p>Cargando tareas...</p>
    </div>
  );
}

export default Loader;