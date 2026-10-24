import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useContactsContext } from '../context/ContactsContext';
import useNetwork from '../hooks/useNetwork';
import NetworkBanner from '../components/NetworkBanner';

function AddContact() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { agregar } = useContactsContext();
  const { isOnline } = useNetwork();

  const manejarEnvio = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    await agregar(nombre.trim(), telefono.trim(), email.trim() || undefined);
    navigate('/contacts', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/contacts" />
          </IonButtons>
          <IonTitle>Crear Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NetworkBanner isOnline={isOnline} />
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

          <IonButton expand="block" type="submit" style={{ marginTop: '1.5rem' }} disabled={!isOnline}>
            Guardar contacto
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default AddContact;