import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

interface Props {
  onAgregar: (nombre: string, telefono: string, email?: string) => void;
}

function CrearContactoPage({ onAgregar }: Props) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  function manejarEnvio(event: React.FormEvent) {
    event.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    onAgregar(nombre.trim(), telefono.trim(), email.trim() || undefined);

    setNombre('');
    setTelefono('');
    setEmail('');

    history.push('/lista');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/lista" />
          </IonButtons>
          <IonTitle>Crear Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={manejarEnvio}>
          <IonItem>
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onIonInput={(e) => setNombre(e.detail.value ?? '')}
              required
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Teléfono"
              labelPlacement="stacked"
              type="tel"
              placeholder="Ej: 3001234567"
              value={telefono}
              onIonInput={(e) => setTelefono(e.detail.value ?? '')}
              required
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Email (opcional)"
              labelPlacement="stacked"
              type="email"
              placeholder="ejemplo@mail.com"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>

          <IonButton expand="block" type="submit" style={{ marginTop: '1.5rem' }}>
            Guardar contacto
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default CrearContactoPage;