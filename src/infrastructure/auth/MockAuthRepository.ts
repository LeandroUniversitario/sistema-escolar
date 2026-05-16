/**
 * @file MockAuthRepository.ts
 * @description Adaptador de autenticación basado en datos mock en memoria.
 *
 * Este adaptador IMPLEMENTA el puerto `IAuthRepository` definido en
 * la capa de dominio. Es la única clase que conoce los datos mock.
 *
 * En Arquitectura Hexagonal:
 *   - Puerto (contrato):  `IAuthRepository`     → definido en `domain/auth/ports.ts`
 *   - Adaptador (impl):   `MockAuthRepository`  → este archivo
 *
 * El caso de uso (`LoginUseCase`) recibe `IAuthRepository` por inyección,
 * por lo que sustituir este adaptador por `HttpAuthRepository` o
 * `SupabaseAuthRepository` NO requiere cambiar ni una línea de negocio.
 *
 * @module infrastructure/auth
 */

import type { IAuthRepository, LoginCredentials, AuthResult } from '../../domain/auth';
import { InvalidCredentialsError } from '../../domain/auth';
import { MOCK_USERS } from './mock-data';

// ─── Configuración ───────────────────────────────────────────────────────────

/** Latencia simulada en ms (emula latencia de red). */
const SIMULATED_DELAY_MS = 800;

// ─── Adaptador ───────────────────────────────────────────────────────────────

/**
 * Implementación mock del repositorio de autenticación.
 *
 * Responsabilidades:
 *   - Buscar un usuario por email + password en `MOCK_USERS`.
 *   - Simular latencia de red con un delay configurable.
 *   - Retornar un `AuthResult` (patrón Either) sin lanzar excepciones.
 *   - Excluir la contraseña antes de retornar el usuario.
 *
 * @implements {IAuthRepository}
 *
 * @example
 *   const repo = new MockAuthRepository();
 *   const result = await repo.login({ email: '...', password: '...' });
 */
export class MockAuthRepository implements IAuthRepository {
  /**
   * Intenta autenticar al usuario contra la base de datos mock.
   *
   * @param credentials - Email y contraseña ingresados.
   * @returns `AuthSuccess` con el usuario (sin password) o `AuthFailure` con error.
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    // Simula latencia de red
    await this.delay(SIMULATED_DELAY_MS);

    const found = MOCK_USERS.find(
      (user) =>
        user.email.toLowerCase() === credentials.email.toLowerCase().trim() &&
        user.password === credentials.password,
    );

    if (found) {
      // Excluimos la contraseña antes de exponer el usuario (destructuring)
      const { password: _omitted, ...authUser } = found;
      return { success: true, user: authUser };
    }

    return {
      success: false,
      error: new InvalidCredentialsError(),
    };
  }

  // ─── Helpers privados ────────────────────────────────────────────────────

  /**
   * Promesa que resuelve tras `ms` milisegundos.
   * Encapsula `setTimeout` para mantener `login()` limpio.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
