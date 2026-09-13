import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './App.css';

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gestor de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {children}
      </IonContent>
    </IonPage>
  );
}

export default App;