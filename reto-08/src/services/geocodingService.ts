// Servicio que llama una API externa con fetch (Nominatim / OpenStreetMap, sin API key)
const BASE_URL = 'https://nominatim.openstreetmap.org/reverse';

interface NominatimResponse {
  display_name?: string;
}

export async function getAddress(lat: number, lng: number): Promise<string> {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lng),
    'accept-language': 'es',
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) throw new Error(`Error ${response.status} al consultar la dirección`);

  const data = (await response.json()) as NominatimResponse;
  return data.display_name ?? 'Dirección no encontrada';
}