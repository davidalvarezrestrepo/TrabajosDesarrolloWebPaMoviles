import type { Gif } from '../types/gif';
import './GifGrid.css';

interface GifGridProps {
  gifs: Gif[];
}

export default function GifGrid({ gifs }: GifGridProps) {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <figure key={gif.id} className="gif-card">
          {/* width y height reservan el espacio y evitan saltos mientras carga */}
          <img src={gif.url} alt={gif.title} width={gif.width} height={gif.height} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}