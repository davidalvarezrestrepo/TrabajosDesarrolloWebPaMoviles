import { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
}

interface Props {
  contactos: Contacto[];
  onEliminar: (id: string) => void;
  onAgregar: (nombre: string, telefono: string) => void;
}

function ListaContactos({ contactos, onEliminar, onAgregar }: Props) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  function manejarEnvio(event: React.FormEvent) {
    event.preventDefault();

    onAgregar(nombre, telefono);

    setNombre('');
    setTelefono('');
  }

  return (
    <>
      <form onSubmit={manejarEnvio}>
        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            type="text"
            placeholder="Ingrese el nombre"
            value={nombre}
            onIonInput={(event) => setNombre(event.detail.value ?? '')}
            required
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="stacked"
            type="tel"
            placeholder="Ingrese el teléfono"
            value={telefono}
            onIonInput={(event) => setTelefono(event.detail.value ?? '')}
            required
          />
        </IonItem>

        <IonButton expand="block" type="submit" className="btn-agregar">
        Agregar contacto
        </IonButton>
      </form>

      <IonList>
        {contactos.map((contacto) => (
          <IonItem key={contacto.id}>
            <IonLabel>
              <h2>{contacto.nombre}</h2>
              <p>{contacto.telefono}</p>
            </IonLabel>

            <IonButton
              slot="end"
              fill="outline"
              color="danger"
              onClick={() => onEliminar(contacto.id)}
            >
              Eliminar
            </IonButton>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}

export default ListaContactos;