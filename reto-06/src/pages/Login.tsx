import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonText,
} from '@ionic/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const navigate  = useNavigate();
  const { login } = useAuthContext();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await login(email, password);
      navigate('/tasks', { replace: true });
    } catch (err: any) {
      setError(traducirError(err.code));
    } finally {
      setEnviando(false);
    }
  };

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
              label="Correo"
              labelPlacement="stacked"
              type="email"
              placeholder="tu@correo.com"
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
              placeholder="mínimo 6 caracteres"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
              required
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p style={{ marginTop: '1rem' }}>{error}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            type="submit"
            disabled={enviando}
            style={{ marginTop: '1rem' }}
          >
            {enviando ? 'Entrando...' : 'Entrar'}
          </IonButton>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </IonContent>
    </IonPage>
  );
}

function traducirError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no tiene un formato válido.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos, espera un momento.';
    default:
      return 'No se pudo iniciar sesión. Intenta de nuevo.';
  }
}

export default Login;