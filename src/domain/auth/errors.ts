/**
 * @file errors.ts
 * @description Errores de dominio para el módulo de autenticación.
 *
 * Cada error de dominio es una clase que extiende `Error` con:
 *   - Un `name` semántico (para discriminar en `catch` o pattern matching).
 *   - Un `message` orientado al negocio (no al usuario final; la UI traducirá).
 *
 * @module domain/auth
 */

// ─── Error base de autenticación ─────────────────────────────────────────────

/**
 * Error base para todos los errores del dominio de autenticación.
 * Permite agrupar y discriminar errores de auth con `instanceof`.
 */
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
    // Restaura el prototipo correcto en entornos que compilan a ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ─── Credenciales inválidas ──────────────────────────────────────────────────

/**
 * Se lanza cuando el email o la contraseña no coinciden con ningún usuario.
 *
 * @example
 *   throw new InvalidCredentialsError();
 *   // message: 'Credenciales incorrectas. Verifica tu usuario y contraseña.'
 */
export class InvalidCredentialsError extends AuthenticationError {
  constructor(
    message: string = 'Credenciales incorrectas. Verifica tu usuario y contraseña.',
  ) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

// ─── Usuario no encontrado ──────────────────────────────────────────────────

/**
 * Se lanza cuando no existe un usuario con el email proporcionado.
 * Útil para distinguir entre "usuario inexistente" y "contraseña incorrecta"
 * a nivel de dominio (la UI puede optar por no revelar esta distinción).
 */
export class UserNotFoundError extends AuthenticationError {
  constructor(
    message: string = 'No se encontró un usuario con el correo proporcionado.',
  ) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
