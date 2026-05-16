/**
 * @file index.ts
 * @description Barrel export de la capa de infraestructura de autenticación.
 *
 * Centraliza las exportaciones para que la capa de aplicación
 * (o la de presentación, temporalmente) importe desde un solo punto:
 * `import { MockAuthRepository } from '@/infrastructure/auth'`.
 *
 * @module infrastructure/auth
 */

export { MockAuthRepository } from './MockAuthRepository';
