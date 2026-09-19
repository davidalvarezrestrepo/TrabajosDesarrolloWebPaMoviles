import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonToast,
  IonItem,
  IonList,
} from '@ionic/react';

interface Props {
  onIniciarSesion: (usuario: string, password: string) => void;
  errorLogin: boolean;
  onCerrarToast: () => void;
}

function Login({ onIniciarSesion, errorLogin, onCerrarToast }: Props) {
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function manejarIngreso() {
    onIniciarSesion(usuario, password);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediClinic</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Usuario"
              labelPlacement="floating"
              value={usuario}
              onIonInput={(e) => setUsuario(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem>
            <IonInput
              type="password"
              label="Contraseña"
              labelPlacement="floating"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={manejarIngreso}>
          Ingresar
        </IonButton>

        <IonToast
          isOpen={errorLogin}
          message="Usuario o contraseña incorrectos"
          duration={2500}
          color="danger"
          onDidDismiss={onCerrarToast}
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;