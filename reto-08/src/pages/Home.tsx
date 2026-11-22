import { useState } from 'react';
import {
  IonButton, IonContent, IonHeader, IonPage, IonSearchbar, IonSpinner, IonText, IonTitle, IonToolbar,
} from '@ionic/react';
import GifGrid from '../components/GifGrid';
import { useGifs } from '../hooks/useGifs';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const { gifs, loading, error, hasMore, loadMore, retry } = useGifs(query);

  const termino = query.trim();
  const titulo = termino ? `Resultados para "${termino}"` : 'Tendencias del momento';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Buscador de GIFs</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          {/* debounce: espera 600 ms sin escribir antes de buscar (cuida el límite de la API) */}
          <IonSearchbar
            placeholder="Busca un GIF: gatos, fútbol, feliz..."
            debounce={600}
            value={query}
            onIonInput={(e) => setQuery(String(e.detail.value ?? ''))}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 className="seccion">{titulo}</h2>

        {error && (
          <div className="estado">
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
            <IonButton size="small" onClick={() => void retry()}>
              Reintentar
            </IonButton>
          </div>
        )}

        {!loading && !error && gifs.length === 0 && (
          <p className="estado">No se encontraron GIFs para esa búsqueda.</p>
        )}

        <GifGrid gifs={gifs} />

        {loading && (
          <div className="estado">
            <IonSpinner name="crescent" />
          </div>
        )}

        {hasMore && !loading && !error && (
          <IonButton expand="block" fill="outline" onClick={() => void loadMore()}>
            Cargar más
          </IonButton>
        )}

        <p className="creditos">Powered by GIPHY</p>
      </IonContent>
    </IonPage>
  );
}