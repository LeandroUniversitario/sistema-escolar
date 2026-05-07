/**
 * @file auth.types.ts
 * @description Tipos y contratos del dominio de autenticación.
 *
 * Diseñados para:
 *  - Tipado estricto en toda la app (sin `any`).
 *  - Escalabilidad: agregar un nuevo rol = una sola línea en `UserRole`.
 *  - Extensibilidad: los módulos futuros importan y extienden sin conflictos.
 *
 * @module auth.types
 */

// ─── Roles del Sistema ───────────────────────────────────────────────────────

/**
 * Unión discriminada de todos los roles administrativos del sistema.
 *
 * Para agregar un nuevo actor tras el levantamiento de requisitos:
 *   1. Añade el rol aquí: `| 'NUEVO_ROL'`
 *   2. Agrega la entrada en `ROLE_ROUTES` (App.tsx / ProtectedRoute.tsx).
 *   3. Crea el mock de usuario en authService.ts.
 *   Sin tocar la lógica de autenticación, contexto ni reducers.
 *
 * @example
 *   const rol: UserRole = 'DIRECTOR';
 */
export type UserRole =
  | 'DIRECTOR'
  | 'SECRETARIA'
  | 'CONTADORA'
  | 'AUX_CONTADOR';

// ─── Entidades de Dominio ─────────────────────────────────────────────────────

/**
 * Representa al usuario autenticado en sesión.
 *
 * @property id      - Identificador único del usuario (UUID o número).
 * @property nombre  - Nombre completo para mostrar en la UI.
 * @property email   - Correo institucional, usado como credencial de login.
 * @property rol     - Rol asignado que determina el acceso a módulos.
 */
export interface AuthUser {
  readonly id: string;
  readonly nombre: string;
  readonly email: string;
  readonly rol: UserRole;
}

/**
 * Credenciales ingresadas por el usuario en el formulario de login.
 * Usadas por React Hook Form y validadas con Zod antes de llamar a authService.
 *
 * @property email    - Correo institucional o nombre de usuario.
 * @property password - Contraseña en texto plano (solo viaja al mock local).
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

// ─── Estado del Contexto ──────────────────────────────────────────────────────

/**
 * Estado completo de autenticación gestionado por AuthContext + useReducer.
 *
 * @property user            - Usuario autenticado. `null` si no hay sesión.
 * @property isAuthenticated - `true` cuando `user !== null`.
 * @property isLoading       - `true` durante la llamada asíncrona al authService.
 */
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Acciones del Reducer ─────────────────────────────────────────────────────

/**
 * Acciones discriminadas para el reducer de AuthContext.
 * Patrón Flux: cada acción tiene `type` + payload opcional.
 */
export type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: AuthUser }
  | { type: 'AUTH_FAILURE' }
  | { type: 'AUTH_LOGOUT' };

// ─── Resultado del servicio de auth ──────────────────────────────────────────

/**
 * Respuesta del authService al intentar iniciar sesión.
 * Patrón Result: éxito con datos o error con mensaje.
 */
export type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; message: string };

// ─── Mapa de rutas por rol ────────────────────────────────────────────────────

/**
 * Mapa que asocia cada UserRole con su ruta de dashboard.
 * Centraliza la lógica de redirección post-login.
 * Tipado con `Record<UserRole, string>` garantiza que agregar un rol
 * obligue (por el compilador) a agregar su ruta correspondiente.
 */
export type RoleRouteMap = Record<UserRole, string>;

// ─── Contexto ─────────────────────────────────────────────────────────────────

/**
 * Contrato público del AuthContext expuesto a los componentes consumidores.
 *
 * @property state   - Estado de autenticación actual.
 * @property login   - Inicia sesión con las credenciales provistas.
 * @property logout  - Cierra la sesión y limpia el estado.
 */
export interface AuthContextValue {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => void;
}
