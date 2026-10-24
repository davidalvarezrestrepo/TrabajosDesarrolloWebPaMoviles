import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonList,
  IonLabel,
  IonIcon,
  IonText,
} from '@ionic/react';
import { trashOutline, star, starOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import useDexie from '../hooks/useDexie';
import type { Fruta } from '../db';

function Fruits() {
  const navigate = useNavigate();
  const { results, error, add, update, deleteItem, toggleFavorita } =
    useDexie('frutas');

  const frutas = results as Fruta[];

  const [nombre, setNombre] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    if (editandoId !== null) {
      await update(editandoId, { nombre: nombre.trim() });
      setEditandoId(null);
    } else {
      await add({ nombre: nombre.trim(), favorita: false });
    }
    setNombre('');
  };

  const empezarEdicion = (fruta: Fruta) => {
    setEditandoId(fruta.id!);
    setNombre(fruta.nombre);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombre('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Frutas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => navigate('/tasks')}>Tareas</IonButton>
            <IonButton onClick={() => navigate('/contacts')}>Contactos</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={guardar}>
          <IonItem>
            <IonInput
              label="Fruta"
              labelPlacement="stacked"
              type="text"
              placeholder="Ej: Mango"
              value={nombre}
              onIonInput={(e) => setNombre(e.detail.value ?? '')}
              required
            />
          </IonItem>

          <IonButton expand="block" type="submit" style={{ marginTop: '1rem' }}>
            {editandoId !== null ? 'Guardar cambios' : 'Agregar'}
          </IonButton>

          {editandoId !== null && (
            <IonButton
              expand="block"
              fill="outline"
              onClick={cancelarEdicion}
            >
              Cancelar
            </IonButton>
          )}
        </form>

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: '1rem' }}>{error}</p>
          </IonText>
        )}

        <p style={{ marginTop: '1.5rem' }}>
          Tienes <strong>{frutas.length}</strong> fruta(s).
        </p>

        <IonList>
          {frutas.map((fruta) => (
            <IonItem key={fruta.id}>
              <IonButton
                slot="start"
                fill="clear"
                color="warning"
                onClick={() => toggleFavorita(fruta.id!, fruta.favorita)}
              >
                <IonIcon
                  icon={fruta.favorita ? star : starOutline}
                  slot="icon-only"
                />
              </IonButton>

              <IonLabel onClick={() => empezarEdicion(fruta)}>
                {fruta.nombre}
              </IonLabel>

              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => deleteItem(fruta.id!)}
              >
                <IonIcon icon={trashOutline} slot="icon-only" />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Fruits;