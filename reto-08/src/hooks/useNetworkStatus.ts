import { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    void Network.getStatus().then((status) => {
      setOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    const listener = Network.addListener('networkStatusChange', (status) => {
      setOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);

  return { online, connectionType };
}