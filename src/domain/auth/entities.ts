/**
 * @file entities.ts
 * @description Entidades del dominio de autenticación.
 *
 * Regla de la Arquitectura Hexagonal:
 *   Esta capa es TypeScript puro. NO importa React, librerías de terceros,
 *   ni módulos de infraestructura. Solo define el "qué" del negocio.
 *
 * @module domain/auth
 */

// ─── Roles del Sistema ───────────────────────────────────────────────────────

/**
 * Unión discriminada de todos los roles administrativos del sistema.
 *
 * Para agregar un nuevo actor:
 *   1. Añade el literal aquí: `| 'NUEVO_ROL'`
 *   2. Agrega la entrada en `ROLE_ROUTES` (presentación).
 *   3. Crea el mock en `mock-data.ts` (infraestructura).
 *
 * @example
 *   const rol: UserRole = 'DIRECTOR';
 */
export type UserRole =
  | 'DIRECTOR'
  | 'SECRETARIA'
  | 'CONTADORA'
  | 'AUX_CONTADOR';

// ─── Entidad: Usuario Autenticado ────────────────────────────────────────────

/**
 * Representa al usuario autenticado en el sistema.
 *
 * Es una entidad de dominio inmutable (todas las propiedades `readonly`).
 * No contiene contraseña ni datos de infraestructura.
 *
 * @property id      - Identificador único (UUID o numérico).
 * @property nombre  - Nombre completo para la UI.
 * @property email   - Correo institucional, usado como credencial de login.
 * @property rol     - Rol que determina permisos y módulos accesibles.
 */
export interface AuthUser {
  readonly id: string;
  readonly nombre: string;
  readonly email: string;
  readonly rol: UserRole;
}

// ─── Mapa de rutas por rol ───────────────────────────────────────────────────

/**
 * Tipado que garantiza que todo `UserRole` tenga una ruta asignada.
 * Centraliza la asociación rol → ruta de dashboard.
 */
export type RoleRouteMap = Record<UserRole, string>;
