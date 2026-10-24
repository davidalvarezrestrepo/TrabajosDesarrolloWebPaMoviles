import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const useHaptics = () => {
  // Solo comprueba si hay soporte nativo. No vibra al abrir.
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsAvailable(Capacitor.isNativePlatform());
  }, []);

  const impact = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!isAvailable) return;
    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };
    await Haptics.impact({ style: map[style] });
  };

  const notify = async (type: 'success' | 'warning' | 'error' = 'success') => {
    if (!isAvailable) return;
    const map = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error,
    };
    await Haptics.notification({ type: map[type] });
  };

  const vibrate = async (duration = 300) => {
    if (!isAvailable) return;
    await Haptics.vibrate({ duration });
  };

  return { isAvailable, impact, notify, vibrate };
};