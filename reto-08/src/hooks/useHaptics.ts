import { useState, useEffect } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const useHaptics = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setIsAvailable(true);
    } catch (err) {
      setIsAvailable(false);
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    checkAvailability();
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

  return { isAvailable, error, impact, notify, vibrate };
};