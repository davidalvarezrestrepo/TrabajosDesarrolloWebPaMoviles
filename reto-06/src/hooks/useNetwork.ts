import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

type ConnectionType = 'wifi' | 'cellular' | 'none' | 'unknown';

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown');

  useEffect(() => {
    const checkInitialStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    };

    checkInitialStatus();

    const listener = Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  return { isOnline, connectionType };
};

export default useNetwork;