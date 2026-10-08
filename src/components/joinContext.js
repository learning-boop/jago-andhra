import { createContext, useContext } from 'react';

/** Kept apart from JoinModal.jsx so hot reloads of the popup don't recreate the context. */
export const JoinContext = createContext(null);

export function useJoin() {
  const ctx = useContext(JoinContext);
  if (!ctx) throw new Error('useJoin must be used inside <JoinProvider>');
  return ctx;
}
