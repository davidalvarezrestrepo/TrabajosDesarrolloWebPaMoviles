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

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const navigate  = useNavigate();
  const { register } = useAuthContext();

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await register(email, password);
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
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={manejarRegistro}>
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
            {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
          </IonButton>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </IonContent>
    </IonPage>
  );
}

function traducirError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no tiene un formato válido.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    default:
      return 'No se pudo crear la cuenta. Intenta de nuevo.';
  }
}

export default Register;