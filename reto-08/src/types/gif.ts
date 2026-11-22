/** GIF ya simplificado para la app */
export interface Gif {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

/** Forma de la respuesta de GIPHY (solo los campos que usamos) */
interface GiphyImage {
  url: string;
  width: string;
  height: string;
}

export interface GiphyGif {
  id: string;
  title: string;
  images: { fixed_width: GiphyImage };
}

export interface GiphyResponse {
  data: GiphyGif[];
  pagination: { total_count: number; count: number; offset: number };
}