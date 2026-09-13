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
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import ContactoItem from '../components/ContactoItem';
import type { Contacto } from '../CargarContactos';

interface Props {
  contactos: Contacto[];
  onEliminar: (id: string) => void;
  onLogout: () => void;
}

function ListaContactosPage({ contactos, onEliminar, onLogout }: Props) {
  const history = useHistory();

  function manejarLogout() {
    onLogout();
    history.replace('/login');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Contactos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={manejarLogout} title="Cerrar sesión">
              <IonIcon icon={logOutOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          Tienes <strong>{contactos.length}</strong> contacto(s) registrado(s).
        </p>

        <IonList>
          {contactos.map((contacto) => (
            <ContactoItem
              key={contacto.id}
              contacto={contacto}
              onEliminar={onEliminar}
            />
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/crear">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default ListaContactosPage;