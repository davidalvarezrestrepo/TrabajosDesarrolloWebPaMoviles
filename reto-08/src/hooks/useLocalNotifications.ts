import { useState, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === 'granted';
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const sendNotification = async (title = 'Notificación', body = 'Mensaje') => {
    try {
      await LocalNotifications.schedule({
        notifications: [{ id: Date.now() % 100000, title, body }],
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const scheduleNotification = async (
    title = 'Recordatorio',
    body = 'Tienes algo pendiente',
    seconds = 5
  ) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now() % 100000,
            title,
            body,
            schedule: { at: new Date(Date.now() + seconds * 1000) },
          },
        ],
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { permission, error, requestPermission, sendNotification, scheduleNotification };
};