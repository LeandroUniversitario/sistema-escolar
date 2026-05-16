/**
 * @file index.ts
 * @description Barrel export de la capa de dominio de autenticación.
 *
 * Centraliza todas las exportaciones del dominio de auth para que
 * las capas superiores (application, infrastructure) importen desde
 * un único punto: `import { ... } from '@/domain/auth'`.
 *
 * @module domain/auth
 */

// ─── Entidades ───────────────────────────────────────────────────────────────
export type { AuthUser, UserRole, RoleRouteMap } from './entities';

// ─── Value Objects ───────────────────────────────────────────────────────────
export type { LoginCredentials } from './value-objects';

// ─── Errores de Dominio ──────────────────────────────────────────────────────
export {
  AuthenticationError,
  InvalidCredentialsError,
  UserNotFoundError,
} from './errors';

// ─── Resultado (Either) ──────────────────────────────────────────────────────
export type { AuthResult, AuthSuccess, AuthFailure } from './result';

// ─── Puertos (Interfaces) ────────────────────────────────────────────────────
export type { IAuthRepository } from './ports';
