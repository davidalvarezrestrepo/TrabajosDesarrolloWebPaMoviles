import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const writeFile = async (path: string, data: any, isJson = true) => {
    setError(null);
    setLoading(true);
    try {
      const content = isJson ? JSON.stringify(data) : data;
      await Filesystem.writeFile({
        path,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return true;
    } catch (err) {
      setError((err as Error).message);
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
        directory: Directory.Documents,
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
      await Filesystem.deleteFile({ path, directory: Directory.Documents });
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