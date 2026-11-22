import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonInput,
  IonText,
} from '@ionic/react';
import { useFilesystem } from '../hooks/useFilesystem';

const ARCHIVO = 'mi-nota.json';

function Filesystem() {
  const { writeFile, readFile, deleteFile, error } = useFilesystem();
  const [texto, setTexto] = useState('');
  const [leido, setLeido] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');

  const guardar = async () => {
    const ok = await writeFile(ARCHIVO, { nota: texto });
    setMensaje(ok ? 'Archivo guardado.' : 'No se pudo guardar.');
    setLeido(null);
  };

  const leer = async () => {
    const data = await readFile(ARCHIVO);
    setLeido(data ? data.nota : 'No hay archivo o está vacío.');
    setMensaje('');
  };

  const borrar = async () => {
    const ok = await deleteFile(ARCHIVO);
    setMensaje(ok ? 'Archivo eliminado.' : 'No se pudo eliminar.');
    setLeido(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Archivos (Filesystem)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Nota a guardar"
            labelPlacement="stacked"
            placeholder="Escribe algo..."
            value={texto}
            onIonInput={(e) => setTexto(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton expand="block" onClick={guardar} style={{ marginTop: '1rem' }}>
          Guardar archivo
        </IonButton>
        <IonButton expand="block" fill="outline" onClick={leer}>
          Leer archivo
        </IonButton>
        <IonButton expand="block" color="danger" onClick={borrar}>
          Eliminar archivo
        </IonButton>

        {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}

        {leido && (
          <p style={{ marginTop: '1rem' }}>
            <strong>Contenido leído:</strong> {leido}
          </p>
        )}

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: '1rem' }}>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Filesystem;