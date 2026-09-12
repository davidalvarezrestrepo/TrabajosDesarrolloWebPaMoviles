import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import './App.css'
import hero from './assets/hero.png'

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <img
          src={hero}
          alt="Imagen principal de la aplicación"
          className="hero-image"
        />

        {children}
      </IonContent>
    </IonPage>
  )
}

export default App


/*import './App.css'
import hero from './assets/hero.png'

function App() {
  return (
    <>
      <img 
  src={hero} 
  alt="Imagen principal de la aplicación" 
  className="hero-image"
/>

      <div className="ticks"></div>

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  )
}

export default App
*/