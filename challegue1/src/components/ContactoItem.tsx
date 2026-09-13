import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import type { Contacto } from '../CargarContactos';

interface Props {
  contacto: Contacto;
  onEliminar: (id: string) => void;
}

function ContactoItem({ contacto, onEliminar }: Props) {
  const inicial = contacto.nombre.charAt(0).toUpperCase();

  return (
    <IonItem routerLink={`/detalle/${contacto.id}`} detail>
      <IonAvatar slot="start">
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#3880ff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        >
          {inicial}
        </div>
      </IonAvatar>

      <IonLabel>
        <h2>{contacto.nombre}</h2>
        <p>{contacto.telefono}</p>
      </IonLabel>

      <IonButton
        slot="end"
        fill="clear"
        color="danger"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onEliminar(contacto.id);
        }}
      >
        <IonIcon icon={trashOutline} slot="icon-only" />
      </IonButton>
    </IonItem>
  );
}

export default ContactoItem;