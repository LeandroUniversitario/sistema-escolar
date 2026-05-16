/**
 * @file value-objects.ts
 * @description Value Objects del dominio de autenticación.
 *
 * Un Value Object no tiene identidad propia; se define por sus atributos.
 * `LoginCredentials` representa las credenciales que un usuario envía
 * para autenticarse, sin lógica de UI ni validación de formulario.
 *
 * @module domain/auth
 */

// ─── Value Object: Credenciales de Login ─────────────────────────────────────

/**
 * Credenciales de autenticación proporcionadas por el usuario.
 *
 * Este VO es agnóstico de la capa de presentación:
 *   - No conoce React Hook Form ni Zod.
 *   - La validación de formato (email válido, longitud mínima)
 *     se maneja en la capa de presentación (UI).
 *   - La validación de negocio (¿existen credenciales? ¿son correctas?)
 *     se maneja en la capa de aplicación (Caso de uso).
 *
 * @property email    - Correo institucional o nombre de usuario.
 * @property password - Contraseña en texto plano (solo viaja al adaptador local/mock).
 */
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}
