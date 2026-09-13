import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import ContactoItem from '../components/ContactoItem';
import type { Contacto } from '../CargarContactos';

interface Props {
  contactos: Contacto[];
  onEliminar: (id: string) => void;
}

function ListaContactosPage({ contactos, onEliminar }: Props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Contactos</IonTitle>
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