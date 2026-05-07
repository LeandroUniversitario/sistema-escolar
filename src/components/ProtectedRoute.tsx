/**
 * @file ProtectedRoute.tsx
 * @description Componente guardia para rutas privadas con validación de rol.
 *
 * Comportamientos:
 *  1. No autenticado → redirige a /login.
 *  2. Autenticado pero sin el rol requerido → redirige a su propio dashboard.
 *  3. Autenticado con rol correcto → renderiza los hijos (<Outlet />).
 *
 * Por qué `ROLE_ROUTES` centraliza la redirección:
 *  - Un solo lugar para cambiar la URL de un dashboard.
 *  - Agregar un rol nuevo no requiere modificar ProtectedRoute.
 *  - El compilador TS detecta si falta una entrada para un UserRole.
 *
 * @module ProtectedRoute
 */

import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import type { UserRole, RoleRouteMap } from '../types/auth.types';

// ─── Mapa centralizado de rutas por rol ──────────────────────────────────────

/**
 * Mapa canónico: cada UserRole → ruta de su dashboard.
 *
 * Tipado como `RoleRouteMap` (= `Record<UserRole, string>`) para que el
 * compilador exija una entrada por cada rol. Si se agrega un rol en
 * `UserRole` y no se actualiza aquí, TypeScript lanzará error de compilación.
 */
export const ROLE_ROUTES: RoleRouteMap = {
  DIRECTOR: '/director/dashboard',
  SECRETARIA: '/secretaria/dashboard',
  CONTADORA: '/contadora/dashboard',
  AUX_CONTADOR: '/aux-contador/dashboard',
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProtectedRouteProps {
  /** Rol requerido para acceder a la ruta. Opcional si solo se valida auth. */
  requiredRole?: UserRole;
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Componente guardia de rutas protegidas.
 *
 * Uso en App.tsx:
 * ```tsx
 * <Route element={<ProtectedRoute requiredRole="DIRECTOR" />}>
 *   <Route path="/director/dashboard" element={<DirectorDashboard />} />
 * </Route>
 * ```
 *
 * Para escalar a nuevos roles: no se modifica este componente.
 * Solo se agrega la ruta en App.tsx y se actualiza ROLE_ROUTES.
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  // 1. No autenticado → login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Rol incorrecto → dashboard propio (nunca queda sin destino)
  if (requiredRole && user.rol !== requiredRole) {
    const ownRoute = ROLE_ROUTES[user.rol];
    return <Navigate to={ownRoute} replace />;
  }

  // 3. Todo correcto → renderiza la ruta hija
  return <Outlet />;
};
