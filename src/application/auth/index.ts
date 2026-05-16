/**
 * @file index.ts
 * @description Barrel export de la capa de aplicación de autenticación.
 *
 * Punto único de importación para los casos de uso de auth:
 *   `import { LoginUseCase } from '@/application/auth'`
 *
 * @module application/auth
 */

export { LoginUseCase } from './LoginUseCase';
