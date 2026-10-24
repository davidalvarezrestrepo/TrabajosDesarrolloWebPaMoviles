import { useRef, useState } from 'react';
import { useCamera } from './useCamera';
import { useFilesystem } from './useFilesystem';
import { useMisionesContext } from './useMisionesContext';

const ARCHIVO_EVIDENCIA = 'evidencia_mision1.jpg';

export const useMisionFoto = () => {
  const { isCompleted, completeMission, resetMission } = useMisionesContext();
  const { photo, base64, error: errorCamara, takePhoto, limpiar } = useCamera();
  const { writeFile } = useFilesystem();

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inicioRef = useRef(Date.now());
  const completada = isCompleted(1);

  const guardarImagen = async () => {
    if (!base64 || completada) return;
    setGuardando(true);
    setError(null);
    const ok = await writeFile(ARCHIVO_EVIDENCIA, base64, false, true);
    setGuardando(false);

    if (!ok) {
      setError('No se pudo guardar la imagen.');
      return;
    }
    const segundos = (Date.now() - inicioRef.current) / 1000;
    await completeMission(1, segundos);
  };

  const reiniciar = async () => {
    limpiar();
    setError(null);
    inicioRef.current = Date.now();
    await resetMission(1);
  };

  return {
    photo,
    tomarFoto: takePhoto,
    guardarImagen,
    reiniciar,
    completada,
    guardando,
    error: error ?? errorCamara,
    avance: completada ? 1 : 0,
  };
};