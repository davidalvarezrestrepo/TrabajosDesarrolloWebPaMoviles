import { LocalNotifications } from '@capacitor/local-notifications';

let nextId = 1;

export async function requestNotificationPermission(): Promise<void> {
  try {
    await LocalNotifications.requestPermissions();
  } catch {
    // Sin soporte (por ejemplo, algunos navegadores)
  }
}

export async function notify(title: string, body: string): Promise<void> {
  try {
    await LocalNotifications.schedule({ notifications: [{ id: nextId++, title, body }] });
  } catch {
    console.warn('No se pudo mostrar la notificación:', title);
  }
}