import { useEffect, useState } from 'react';
import {
  PushNotifications,
  type ActionPerformed,
  type PushNotificationSchema,
  type Token,
} from '@capacitor/push-notifications';
import type { PluginListenerHandle } from '@capacitor/core';

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<PushNotificationSchema | null>(null);
  const [accion, setAccion] = useState<ActionPerformed | null>(null);
  const [permission, setPermission] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      setError(null);
      const result = await PushNotifications.requestPermissions();
      setPermission(result.receive);
      if (result.receive === 'granted') {
        await PushNotifications.register();
      }
      return result.receive === 'granted';
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  useEffect(() => {
    const listeners: Promise<PluginListenerHandle>[] = [
      PushNotifications.addListener('registration', (t: Token) => setToken(t.value)),
      PushNotifications.addListener('registrationError', (err) => setError(err.error)),
      PushNotifications.addListener('pushNotificationReceived', (n) => setNotification(n)),
      PushNotifications.addListener('pushNotificationActionPerformed', (a) => setAccion(a)),
    ];

    // Al salir de la página se quitan solo los listeners de este hook.
    return () => {
      listeners.forEach(async (l) => (await l).remove());
    };
  }, []);

  return { token, notification, accion, permission, error, requestPermission };
};