/**
 * @file mock-data.ts
 * @description Datos mock aislados para el adaptador de autenticación.
 *
 * Separar los datos de la lógica del repositorio sigue el principio
 * de Responsabilidad Única (SRP): este archivo es la "base de datos"
 * simulada, mientras que `MockAuthRepository` maneja la lógica de búsqueda.
 *
 * @module infrastructure/auth
 */

import type { AuthUser, UserRole } from '../../domain/auth';

// ─── Tipo interno del mock ───────────────────────────────────────────────────

/**
 * Registro interno que extiende `AuthUser` con la contraseña.
 * Solo existe dentro de la capa de infraestructura (nunca se exporta
 * la contraseña fuera de este módulo).
 */
export interface MockUserRecord extends AuthUser {
  readonly password: string;
}

// ─── Array de usuarios mock ──────────────────────────────────────────────────

/**
 * Base de datos simulada de usuarios del sistema.
 *
 * Para agregar un nuevo actor:
 *   1. Añade el rol en `UserRole` (dominio).
 *   2. Añade UN objeto aquí. CERO cambios en `MockAuthRepository`.
 *
 * @constant MOCK_USERS
 */
export const MOCK_USERS: ReadonlyArray<MockUserRecord> = [
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
