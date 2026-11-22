import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      setPhoto(image.webPath ?? null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const pickFromGallery = async () => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
      setPhoto(image.webPath ?? null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { photo, error, takePhoto, pickFromGallery };
};