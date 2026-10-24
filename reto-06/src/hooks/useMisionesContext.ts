import { useContext } from 'react';
import { MisionesContext } from '../context/MisionesContext';

export function useMisionesContext() {
  const ctx = useContext(MisionesContext);
  if (!ctx) {
    throw new Error('useMisionesContext debe usarse dentro de MisionesProvider');
  }
  return ctx;
}