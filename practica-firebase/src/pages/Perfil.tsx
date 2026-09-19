import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';

interface Sesion {
  usuario: string;
  nombre: string;
}

interface Props {
  sesion: Sesion;
  onCerrarSesion: () => void;
}

function Perfil({ sesion, onCerrarSesion }: Props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h3>Nombre</h3>
              <p>{sesion.nombre}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h3>Usuario</h3>
              <p>{sesion.usuario}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          color="danger"
          onClick={onCerrarSesion}
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Perfil;