import { giphyApi } from '../api/giphyClient';
import type { Gif, GiphyGif, GiphyResponse } from '../types/gif';

export const PAGE_SIZE = 24;

export interface GifPage {
  gifs: Gif[];
  total: number;
}

const toGif = (g: GiphyGif): Gif => ({
  id: g.id,
  title: g.title || 'GIF',
  url: g.images.fixed_width.url,
  width: Number(g.images.fixed_width.width),
  height: Number(g.images.fixed_width.height),
});

/** Si hay texto usa la API de búsqueda; si no, muestra las tendencias */
export async function getGifs(query: string, offset: number, signal: AbortSignal): Promise<GifPage> {
  const q = query.trim();
  const params = { limit: PAGE_SIZE, offset };

  const { data } = q
    ? await giphyApi.get<GiphyResponse>('/search', { params: { ...params, q }, signal })
    : await giphyApi.get<GiphyResponse>('/trending', { params, signal });

  return { gifs: data.data.map(toGif), total: data.pagination.total_count };
}