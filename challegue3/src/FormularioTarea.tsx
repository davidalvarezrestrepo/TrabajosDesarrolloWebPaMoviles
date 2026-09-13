import { useState } from 'react';
import { IonButton, IonInput, IonItem } from '@ionic/react';

interface Props {
  onAgregar: (titulo: string) => void;
}

function FormularioTarea({ onAgregar }: Props) {
  const [titulo, setTitulo] = useState('');

  function manejarEnvio(event: React.FormEvent) {
    event.preventDefault();
    if (titulo.trim() === '') return;
    onAgregar(titulo.trim());
    setTitulo('');
  }

  return (
    <form onSubmit={manejarEnvio}>
      <IonItem>
        <IonInput
          label="Nueva tarea"
          labelPlacement="stacked"
          type="text"
          placeholder="Ej: Terminar el informe"
          value={titulo}
          onIonInput={(event) => setTitulo(event.detail.value ?? '')}
          required
        />
      </IonItem>

      <IonButton expand="block" type="submit" style={{ marginTop: '1rem' }}>
        Agregar tarea
      </IonButton>
    </form>
  );
}

export default FormularioTarea;