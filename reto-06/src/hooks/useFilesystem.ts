import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Almacenamiento privado de la app: no requiere permisos de almacenamiento.
const CARPETA = Directory.Data;

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // isJson: guarda objetos como JSON de texto.
  // binario: guarda contenido en base64 como archivo binario (por ejemplo, una imagen).
  const writeFile = async (path: string, data: any, isJson = true, binario = false) => {
    setError(null);
    setLoading(true);
    try {
      if (binario) {
        await Filesystem.writeFile({ path, data, directory: CARPETA, recursive: true });
      } else {
        const content = isJson ? JSON.stringify(data) : data;
        await Filesystem.writeFile({
          path,
          data: content,
          directory: CARPETA,
          encoding: Encoding.UTF8,
          recursive: true,
        });
      }
      return true;
    } catch (err) {
      const mensaje = (err as Error).message || 'Error desconocido al escribir el archivo.';
      console.error('writeFile falló:', mensaje, err);
      setError(mensaje);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readFile = async (path: string, isJson = true) => {
    setError(null);
    setLoading(true);
    try {
      const result = await Filesystem.readFile({
        path,
        directory: CARPETA,
        encoding: Encoding.UTF8,
      });
      return isJson ? JSON.parse(result.data as string) : result.data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (path: string) => {
    setError(null);
    setLoading(true);
    try {
      await Filesystem.deleteFile({ path, directory: CARPETA });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, writeFile, readFile, deleteFile };
};