import { useState, type FormEvent } from 'react';
import {
  IonAvatar, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput,
  IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSpinner, IonText, IonTitle,
  IonToolbar, useIonAlert,
} from '@ionic/react';
import {
  addOutline, cameraOutline, createOutline, logOutOutline, personCircleOutline, trashOutline,
} from 'ionicons/icons';

import { useAuth } from '../hooks/useAuth';
import { useTareas } from '../hooks/useTareas';
import { signOut } from '../services/authService';
import { tomarYSubirAvatar } from '../services/avatarService';
import type { Tarea } from '../types/tarea';
import { traducirError } from '../utils/errores';
import './Tareas.css';

export default function Tareas() {
  const { user } = useAuth();
  const { tareas, error, crear, alternar, renombrar, eliminar } = useTareas(user?.id);
  const [nueva, setNueva] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);
  const [presentAlert] = useIonAlert();

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const pendientes = tareas.filter((t) => !t.completada).length;

  const agregar = async (e: FormEvent) => {
    e.preventDefault();
    const titulo = nueva.trim();
    if (!titulo) return;
    setNueva('');
    await crear(titulo);
  };

  const cambiarFoto = async () => {
    if (!user) return;
    setSubiendo(true);
    setErrorFoto(null);
    try {
      await tomarYSubirAvatar(user.id);
    } catch (err) {
      const mensaje = traducirError(err);
      // Cerrar la cámara sin tomar foto no es un error
      if (!mensaje.toLowerCase().includes('cancel')) setErrorFoto(mensaje);
    } finally {
      setSubiendo(false);
    }
  };

  const editar = (tarea: Tarea) =>
    void presentAlert({
      header: 'Editar tarea',
      inputs: [{ name: 'titulo', value: tarea.titulo, placeholder: 'Título' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (valores: { titulo: string }) => {
            const titulo = valores.titulo.trim();
            if (titulo) void renombrar(tarea, titulo);
          },
        },
      ],
    });

  const confirmarEliminar = (tarea: Tarea) =>
    void presentAlert({
      header: '¿Eliminar tarea?',
      message: tarea.titulo,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => void eliminar(tarea) },
      ],
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => void signOut()} aria-label="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="perfil">
          <IonAvatar>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Foto de perfil" />
            ) : (
              <IonIcon icon={personCircleOutline} className="perfil-vacio" />
            )}
          </IonAvatar>
          <IonText color="medium">{user?.email}</IonText>
          <IonButton size="small" fill="outline" disabled={subiendo} onClick={() => void cambiarFoto()}>
            {subiendo ? (
              <IonSpinner name="dots" />
            ) : (
              <>
                <IonIcon slot="start" icon={cameraOutline} />
                Tomar foto de perfil
              </>
            )}
          </IonButton>
          {errorFoto && (
            <IonText color="danger">
              <small>{errorFoto}</small>
            </IonText>
          )}
        </div>

        <form onSubmit={(e) => void agregar(e)}>
          <IonItem>
            <IonInput
              aria-label="Nueva tarea"
              placeholder="Escribe una nueva tarea…"
              value={nueva}
              onIonInput={(e) => setNueva(String(e.detail.value ?? ''))}
            />
            <IonButton slot="end" type="submit" disabled={!nueva.trim()} aria-label="Agregar">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonItem>
        </form>

        {error && (
          <IonText color="danger">
            <p className="ion-padding-horizontal">{error}</p>
          </IonText>
        )}

        <IonList>
          <IonListHeader>
            <IonLabel>
              {tareas.length === 0
                ? 'No tienes tareas todavía'
                : `Pendientes: ${pendientes} de ${tareas.length}`}
            </IonLabel>
          </IonListHeader>

          {tareas.map((tarea) => (
            <IonItem key={tarea.id}>
              <IonCheckbox
                justify="start"
                labelPlacement="end"
                checked={tarea.completada}
                onIonChange={() => void alternar(tarea)}
              >
                <span className={tarea.completada ? 'tarea-hecha' : undefined}>{tarea.titulo}</span>
              </IonCheckbox>
              <IonButton slot="end" fill="clear" onClick={() => editar(tarea)} aria-label="Editar">
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={() => confirmarEliminar(tarea)}
                aria-label="Eliminar"
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}