/**
 * @file authService.ts
 * @description Servicio de autenticación simulado (mock).
 *
 * Arquitectura intencional:
 *  - `MOCK_USERS` es el único punto de verdad de usuarios.
 *  - Agregar un actor = añadir un objeto al array. CERO cambios a `loginUser`.
 *  - La contraseña en producción se reemplazaría por un hash + llamada a API.
 *
 * @module authService
 */

import type { AuthUser, AuthResult, LoginCredentials, UserRole } from '../types/auth.types';

// ─── Tipo interno del mock ────────────────────────────────────────────────────

/** Registro interno que extiende AuthUser con la contraseña (solo mock). */
interface MockUserRecord extends AuthUser {
  readonly password: string;
}

// ─── Array de usuarios mock ───────────────────────────────────────────────────

/**
 * Base de datos simulada de usuarios del sistema.
 *
 * IMPORTANTE: Para agregar un nuevo actor, añadir UN objeto aquí.
 * No modificar `loginUser` ni ninguna otra función.
 *
 * @constant MOCK_USERS
 */
const MOCK_USERS: ReadonlyArray<MockUserRecord> = [
  {
    id: 'usr-001',
    nombre: 'Director General',
    email: 'director@sanluisgonzaga.edu.pe',
    password: 'director123',
    rol: 'DIRECTOR' satisfies UserRole,
  },
  {
    id: 'usr-002',
    nombre: 'Secretaria Principal',
    email: 'secretaria@sanluisgonzaga.edu.pe',
    password: 'secretaria123',
    rol: 'SECRETARIA' satisfies UserRole,
  },
  {
    id: 'usr-003',
    nombre: 'Contadora General',
    email: 'contadora@sanluisgonzaga.edu.pe',
    password: 'contadora123',
    rol: 'CONTADORA' satisfies UserRole,
  },
  {
    id: 'usr-004',
    nombre: 'Auxiliar Contador',
    email: 'aux.contador@sanluisgonzaga.edu.pe',
    password: 'aux123',
    rol: 'AUX_CONTADOR' satisfies UserRole,
  },
] as const;

// ─── Función de login ─────────────────────────────────────────────────────────

/**
 * Simula una llamada asíncrona al backend de autenticación.
 * Resuelve en ~800ms con éxito o error según las credenciales.
 *
 * @param credentials - Email y contraseña ingresados en el formulario.
 * @returns Promesa que resuelve con `AuthResult` (éxito o error).
 *
 * @example
 *   const result = await loginUser({ email: 'director@...', password: '...' });
 *   if (result.success) console.log(result.user.rol);
 */
export const loginUser = (credentials: LoginCredentials): Promise<AuthResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === credentials.email.toLowerCase().trim() &&
          u.password === credentials.password,
      );

      if (found) {
        // Excluimos la contraseña antes de exponer el usuario
        const { password: _omitted, ...authUser } = found;
        resolve({ success: true, user: authUser });
      } else {
        resolve({
          success: false,
          message: 'Credenciales incorrectas. Verifica tu usuario y contraseña.',
        });
      }
    }, 800);
  });
};
