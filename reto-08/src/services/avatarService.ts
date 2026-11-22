import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { supabase } from '../lib/supabase';

const BUCKET = 'avatars';

/** Toma una foto, la sube a avatars/{userId}/... y la guarda en el perfil del usuario */
export async function tomarYSubirAvatar(userId: string): Promise<void> {
  const foto = await Camera.getPhoto({
    quality: 70,
    width: 400,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
  });
  if (!foto.webPath) throw new Error('No se obtuvo la foto.');

  const archivo = await (await fetch(foto.webPath)).blob();
  // La primera carpeta debe ser el id del usuario (lo exige la política de Storage)
  const ruta = `${userId}/${Date.now()}.${foto.format}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(ruta, archivo, { contentType: `image/${foto.format}` });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta);
  const { error: errorPerfil } = await supabase.auth.updateUser({
    data: { avatar_url: data.publicUrl },
  });
  if (errorPerfil) throw errorPerfil;
}