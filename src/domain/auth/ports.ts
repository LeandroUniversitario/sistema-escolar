/**
 * @file ports.ts
 * @description Puertos (interfaces) del dominio de autenticación.
 *
 * En Arquitectura Hexagonal, un "Puerto" define el contrato que la capa
 * de dominio/aplicación NECESITA, sin saber QUIÉN lo implementa.
 *
 * Implementadores posibles (Adaptadores):
 *   - `MockAuthRepository`  → datos en memoria (desarrollo/testing).
 *   - `HttpAuthRepository`  → llamadas a API REST (producción futura).
 *   - `SupabaseAuthRepository` → Supabase Auth (producción futura).
 *
 * Principio de Inversión de Dependencias (DIP):
 *   La capa de aplicación depende de ESTA interfaz, no de la implementación.
 *   La infraestructura implementa esta interfaz.
 *
 * @module domain/auth
 */

import type { LoginCredentials } from './value-objects';
import type { AuthResult } from './result';

// ─── Puerto: Repositorio de Autenticación ────────────────────────────────────

/**
 * Contrato para cualquier implementación de autenticación.
 *
 * El caso de uso `LoginUseCase` recibirá este puerto por inyección
 * de dependencias, haciendo la lógica de negocio completamente
 * desacoplada de la fuente de datos.
 *
 * @example
 *   // En el caso de uso:
 *   class LoginUseCase {
 *     constructor(private readonly authRepo: IAuthRepository) {}
 *     async execute(credentials: LoginCredentials): Promise<AuthResult> {
 *       return this.authRepo.login(credentials);
 *     }
 *   }
 */
export interface IAuthRepository {
  /**
   * Intenta autenticar a un usuario con las credenciales provistas.
   *
   * @param credentials - Email y contraseña del usuario.
   * @returns Promesa con `AuthResult` (éxito con usuario o fallo con error).
   */
  login(credentials: LoginCredentials): Promise<AuthResult>;
}
