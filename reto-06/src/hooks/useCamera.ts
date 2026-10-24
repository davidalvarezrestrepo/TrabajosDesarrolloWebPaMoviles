import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);   // vista previa (data URL)
  const [base64, setBase64] = useState<string | null>(null); // contenido para guardar
  const [error, setError] = useState<string | null>(null);

  const capturar = async (source: CameraSource) => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source,
      });
      if (!image.base64String) throw new Error('No se pudo leer la imagen.');
      setBase64(image.base64String);
      setPhoto(`data:image/${image.format};base64,${image.base64String}`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const takePhoto = () => capturar(CameraSource.Camera);

  const limpiar = () => {
    setPhoto(null);
    setBase64(null);
    setError(null);
  };

  return { photo, base64, error, takePhoto, limpiar };
};