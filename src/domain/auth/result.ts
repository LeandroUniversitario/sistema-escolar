/**
 * @file result.ts
 * @description Patrón Result/Either para el dominio de autenticación.
 *
 * Evita el uso de excepciones para flujo de control predecible.
 * Un `AuthResult` es un tipo discriminado que siempre es:
 *   - `{ success: true, user: AuthUser }` → operación exitosa.
 *   - `{ success: false, error: AuthenticationError }` → fallo controlado.
 *
 * Nota: Se mantiene `success` como discriminante por compatibilidad con el
 * código existente, facilitando la migración progresiva.
 *
 * @module domain/auth
 */

import type { AuthUser } from './entities';
import type { AuthenticationError } from './errors';

// ─── Resultado exitoso ───────────────────────────────────────────────────────

/**
 * Variante exitosa del resultado de autenticación.
 */
export interface AuthSuccess {
  readonly success: true;
  readonly user: AuthUser;
}

// ─── Resultado fallido ───────────────────────────────────────────────────────

/**
 * Variante fallida del resultado de autenticación.
 * Transporta el error de dominio (no un string genérico).
 */
export interface AuthFailure {
  readonly success: false;
  readonly error: AuthenticationError;
}

// ─── Unión discriminada ──────────────────────────────────────────────────────

/**
 * Tipo discriminado que representa el resultado de una operación de auth.
 *
 * @example
 *   const result: AuthResult = await authRepo.login(credentials);
 *   if (result.success) {
 *     console.log(result.user.nombre);
 *   } else {
 *     console.error(result.error.message);
 *   }
 */
export type AuthResult = AuthSuccess | AuthFailure;
