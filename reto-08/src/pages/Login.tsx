import { useState, type FormEvent } from 'react';
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage,
  IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar,
} from '@ionic/react';
import { signIn, signUp } from '../services/authService';
import { traducirError } from '../utils/errores';

type Modo = 'login' | 'registro';

interface Mensaje {
  texto: string;
  color: 'danger' | 'success';
}

export default function Login() {
  const [modo, setModo] = useState<Modo>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<Mensaje | null>(null);

  // Al iniciar sesión, App.tsx redirige solo a /tareas
  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    try {
      if (modo === 'login') {
        await signIn(email, password);
      } else {
        const conSesion = await signUp(email, password);
        if (!conSesion) {
          setMensaje({ texto: 'Cuenta creada. Confirma tu correo y luego inicia sesión.', color: 'success' });
        }
      }
    } catch (err) {
      setMensaje({ texto: traducirError(err), color: 'danger' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Reto 8 · Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment value={modo} onIonChange={(e) => setModo(e.detail.value as Modo)}>
          <IonSegmentButton value="login">
            <IonLabel>Iniciar sesión</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="registro">
            <IonLabel>Registrarse</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <form onSubmit={(e) => void enviar(e)}>
          <IonList>
            <IonItem>
              <IonInput
                label="Correo"
                labelPlacement="stacked"
                type="email"
                required
                value={email}
                onIonInput={(e) => setEmail(String(e.detail.value ?? ''))}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Contraseña"
                labelPlacement="stacked"
                type="password"
                required
                minlength={6}
                value={password}
                onIonInput={(e) => setPassword(String(e.detail.value ?? ''))}
              />
            </IonItem>
          </IonList>

          {mensaje && (
            <IonText color={mensaje.color}>
              <p>{mensaje.texto}</p>
            </IonText>
          )}

          <IonButton type="submit" expand="block" disabled={cargando}>
            {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}