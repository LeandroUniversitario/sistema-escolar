/**
 * @file LoginUseCase.ts
 * @description Caso de uso para autenticación de usuarios.
 *
 * En Arquitectura Hexagonal, los casos de uso residen en la capa de
 * Aplicación y orquestan la lógica de negocio utilizando los puertos
 * definidos en la capa de Dominio.
 *
 * Principios aplicados:
 *   - SRP: Solo se encarga de coordinar el flujo de login.
 *   - DIP: Depende de `IAuthRepository` (abstracción), no de
 *          `MockAuthRepository` (implementación concreta).
 *   - OCP: Agregar validaciones o pasos (logging, auditoría, rate-limit)
 *          no requiere modificar el repositorio ni la UI.
 *
 * @module application/auth
 */

import type {
  IAuthRepository,
  LoginCredentials,
  AuthResult,
} from '../../domain/auth';

// ─── Caso de Uso ─────────────────────────────────────────────────────────────

/**
 * Caso de uso: Iniciar sesión.
 *
 * Responsabilidades:
 *   1. Recibir las credenciales validadas desde la capa de presentación.
 *   2. Delegar la autenticación al repositorio (a través del puerto).
 *   3. Retornar el resultado (`AuthResult`) sin efectos secundarios de UI.
 *
 * Inyección de dependencias:
 *   El repositorio se inyecta por constructor, lo que permite:
 *   - Usar `MockAuthRepository` en desarrollo.
 *   - Usar `HttpAuthRepository` en producción.
 *   - Inyectar un stub/mock en tests unitarios.
 *
 * @example
 *   // Composición (en la capa de presentación o en un factory):
 *   const authRepo = new MockAuthRepository();
 *   const loginUseCase = new LoginUseCase(authRepo);
 *
 *   // Ejecución:
 *   const result = await loginUseCase.execute({ email: '...', password: '...' });
 *   if (result.success) {
 *     console.log(result.user.nombre);
 *   } else {
 *     console.error(result.error.message);
 *   }
 */
export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  /**
   * Ejecuta el flujo de autenticación.
   *
   * Este método es el "punto de entrada" de la lógica de negocio.
   * Aquí se podrían agregar pasos adicionales en el futuro:
   *   - Validaciones de negocio (ej. cuenta bloqueada, intentos máximos).
   *   - Logging de auditoría.
   *   - Notificaciones de seguridad.
   *
   * @param credentials - Credenciales del usuario (email + password).
   * @returns Promesa con `AuthResult` (éxito con usuario o fallo con error).
   */
  async execute(credentials: LoginCredentials): Promise<AuthResult> {
    // ── Paso 1: Validaciones de negocio (extensible) ─────────────────────
    // Aquí se podrían agregar reglas como:
    //   - if (await this.isAccountLocked(credentials.email)) { ... }
    //   - if (this.exceedsMaxAttempts(credentials.email)) { ... }

    // ── Paso 2: Delegar al repositorio ───────────────────────────────────
    const result = await this.authRepository.login(credentials);

    // ── Paso 3: Post-procesamiento (extensible) ──────────────────────────
    // Aquí se podrían agregar acciones post-login como:
    //   - if (result.success) { await this.auditLog.record(result.user); }
    //   - if (!result.success) { this.rateLimiter.increment(credentials.email); }

    return result;
  }
}
