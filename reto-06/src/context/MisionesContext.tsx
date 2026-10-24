import { createContext, ReactNode } from 'react';
import { useMisiones } from '../hooks/useMisiones';

type MisionesContextType = ReturnType<typeof useMisiones>;

export const MisionesContext = createContext<MisionesContextType | undefined>(undefined);

interface MisionesProviderProps {
  children: ReactNode;
}

export function MisionesProvider({ children }: MisionesProviderProps) {
  const misiones = useMisiones();

  return <MisionesContext.Provider value={misiones}>{children}</MisionesContext.Provider>;
}