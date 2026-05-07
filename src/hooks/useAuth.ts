/**
 * @file useAuth.ts
 * @description Hook personalizado para consumir el AuthContext.
 *
 * Beneficios de encapsular el contexto en un hook:
 *  - Los componentes no acceden directamente a `AuthContext` (bajo acoplamiento).
 *  - Lanza error si se usa fuera del `AuthProvider` (fail-fast).
 *  - Único punto de importación: `import { useAuth } from '../hooks/useAuth'`.
 *
 * @module useAuth
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextValue } from '../types/auth.types';

/**
 * Hook para acceder al estado y acciones de autenticación.
 *
 * @returns El valor completo del `AuthContext`: `state`, `login`, `logout`.
 * @throws Error si se invoca fuera del `AuthProvider`.
 *
 * @example
 *   const { state, login, logout } = useAuth();
 *   if (state.isAuthenticated) console.log(state.user?.rol);
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      '[useAuth] Debe usarse dentro de <AuthProvider>. ' +
      'Asegúrate de envolver tu árbol de componentes con <AuthProvider> en App.tsx.',
    );
  }

  return context;
};
