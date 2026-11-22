import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import type { Track } from '../types/tracking';

const FOLDER = 'recorridos';
const filePath = (day: string) => `${FOLDER}/${day}.json`;

/** Fecha local en formato AAAA-MM-DD (un archivo JSON por día) */
export function dayKey(time: number): string {
  const d = new Date(time);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function getTracksByDay(day: string): Promise<Track[]> {
  try {
    const { data } = await Filesystem.readFile({
      path: filePath(day),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(data as string) as Track[];
  } catch {
    return []; // el archivo de ese día todavía no existe
  }
}

export async function saveTrack(track: Track): Promise<void> {
  const day = dayKey(track.startedAt);
  const tracks = await getTracksByDay(day);
  await Filesystem.writeFile({
    path: filePath(day),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    data: JSON.stringify([...tracks, track]),
    recursive: true,
  });
}

/** Días con recorridos guardados, del más reciente al más antiguo */
export async function listDays(): Promise<string[]> {
  try {
    const { files } = await Filesystem.readdir({ path: FOLDER, directory: Directory.Data });
    return files.map((f) => f.name.replace('.json', '')).sort().reverse();
  } catch {
    return [];
  }
}