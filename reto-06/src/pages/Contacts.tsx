import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add, logOutOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import ContactItem from '../components/ContactItem';
import { useContactsContext } from '../context/ContactsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import useNetwork from '../hooks/useNetwork';
import NetworkBanner from '../components/NetworkBanner';

function Contacts() {
  const navigate = useNavigate();
  const { contactos, cargando, eliminar } = useContactsContext();
  const { logout } = useAuthContext();
    const { isOnline } = useNetwork();

  const cerrarSesion = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Contactos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={cerrarSesion} title="Cerrar sesión">
              <IonIcon icon={logOutOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NetworkBanner isOnline={isOnline} />
        <IonButton
          expand="block"
          fill="outline"
          onClick={() => navigate('/tasks')}
        >
          Ir a mis tareas
        </IonButton>
        <IonButton
          expand="block"
          fill="outline"
          onClick={() => navigate('/fruits')}
          style={{ marginTop: '1rem' }}
        >
          Ir a mis frutas
        </IonButton>

        {cargando ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            <p style={{ marginTop: '1.5rem' }}>
              Tienes <strong>{contactos.length}</strong> contacto(s) registrado(s).
            </p>

            <IonList>
              {contactos.map((contacto) => (
                 <ContactItem
                  key={contacto.id}
                  contacto={contacto}
                  onEliminar={eliminar}
                  isOnline={isOnline}
                />
              ))}
            </IonList>
          </>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => navigate('/contacts/new')} disabled={!isOnline}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default Contacts;