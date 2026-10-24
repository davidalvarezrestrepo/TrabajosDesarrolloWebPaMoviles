// Convierte segundos a formato mm:ss. Si no hay tiempo, muestra un guion.
export const formatearTiempo = (segundos?: number) => {
  if (segundos === undefined) return '--:--';
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
};