import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { callOutline, mailOutline, personOutline } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useContactsContext } from '../context/ContactsContext';

function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const { obtenerPorId, cargando } = useContactsContext();
  const contacto = obtenerPorId(id!);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/contacts" />
          </IonButtons>
          <IonTitle>Detalle del contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cargando ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : !contacto ? (
          <p>Contacto no encontrado (id: {id})</p>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Información del contacto</IonCardSubtitle>
              <IonCardTitle>{contacto.nombre}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonItem lines="none">
                <IonIcon icon={personOutline} slot="start" color="primary" />
                <IonLabel>
                  <h3>ID</h3>
                  <p>{contacto.id}</p>
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={callOutline} slot="start" color="primary" />
                <IonLabel>
                  <h3>Teléfono</h3>
                  <p>{contacto.telefono}</p>
                </IonLabel>
              </IonItem>

              {contacto.email && (
                <IonItem lines="none">
                  <IonIcon icon={mailOutline} slot="start" color="primary" />
                  <IonLabel>
                    <h3>Email</h3>
                    <p>{contacto.email}</p>
                  </IonLabel>
                </IonItem>
              )}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ContactDetail;