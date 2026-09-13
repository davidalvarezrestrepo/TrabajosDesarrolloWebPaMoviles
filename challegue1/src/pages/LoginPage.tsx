import { useState } from 'react';
import { useHistory } from 'react-router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { login, validarCredenciales } from '../auth';

interface Props {
  onLoginExitoso: () => void;
}

function LoginPage({ onLoginExitoso }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  function manejarLogin(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!validarCredenciales(email.trim(), password)) {
      setError('Credenciales incorrectas. Intenta con user@mail.com / 123');
      return;
    }

    login();
    onLoginExitoso();
    history.replace('/lista');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={manejarLogin}>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="stacked"
              type="email"
              placeholder="user@mail.com"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
              required
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Contraseña"
              labelPlacement="stacked"
              type="password"
              placeholder="123"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
              required
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p style={{ padding: '0 1rem' }}>{error}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            type="submit"
            style={{ marginTop: '1.5rem' }}
          >
            Entrar
          </IonButton>

          <IonText color="medium">
            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem' }}>
              Usuario demo: <strong>user@mail.com</strong>
              <br />
              Contraseña: <strong>123</strong>
            </p>
          </IonText>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;