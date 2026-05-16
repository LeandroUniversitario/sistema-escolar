/**
 * @file AuthContext.tsx
 * @description Contexto global de autenticación (Capa de Presentación).
 *
 * Patrón: React Context API + useReducer (Flux-like).
 *
 * Arquitectura Hexagonal — Composition Root:
 *   Este archivo actúa como "raíz de composición", donde se ensamblan
 *   las dependencias concretas. Es el ÚNICO lugar que conoce tanto
 *   la capa de aplicación (LoginUseCase) como la de infraestructura
 *   (MockAuthRepository). El resto de la UI es ignorante de ambas.
 *
 * Para cambiar de Mock a HTTP en producción:
 *   1. Crea `HttpAuthRepository` en `infrastructure/auth/`.
 *   2. Reemplaza `MockAuthRepository` por `HttpAuthRepository` aquí.
 *   3. Cero cambios en LoginUseCase, LoginPage, o cualquier otro componente.
 *
 * @module AuthContext
 */

import {
  createContext,
  useReducer,
  useCallback,
  type ReactNode,
  type FC,
} from 'react';

// ─── Importaciones de la Arquitectura Hexagonal ──────────────────────────────

// Dominio: tipos puros (entidades, value objects, result)
import type { AuthUser, LoginCredentials, AuthResult } from '../domain/auth';

// Aplicación: caso de uso (lógica de negocio)
import { LoginUseCase } from '../application/auth';

// Infraestructura: adaptador concreto (implementación del puerto)
import { MockAuthRepository } from '../infrastructure/auth';

// ─── Composition Root ────────────────────────────────────────────────────────
// Ensamblaje de dependencias a nivel de módulo (singleton).
// El repositorio se inyecta al caso de uso por constructor (DIP).

const authRepository = new MockAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

// ─── Tipos de Presentación ───────────────────────────────────────────────────
// Estos tipos son específicos de React (estado del reducer, acciones).
// No pertenecen al dominio porque dependen del ciclo de vida de la UI.

/**
 * Estado completo de autenticación gestionado por useReducer.
 */
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Acciones discriminadas para el reducer de autenticación.
 */
export type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: AuthUser }
  | { type: 'AUTH_FAILURE' }
  | { type: 'AUTH_LOGOUT' };

/**
 * Contrato público del AuthContext expuesto a los componentes consumidores.
 */
export interface AuthContextValue {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => void;
}

// ─── Estado inicial ───────────────────────────────────────────────────────────

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

/**
 * Reducer puro de autenticación.
 * Cada acción produce un nuevo estado sin mutar el anterior.
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, isLoading: true };

    case 'AUTH_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'AUTH_FAILURE':
      return { ...state, isLoading: false };

    case 'AUTH_LOGOUT':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

// ─── Creación del Contexto ────────────────────────────────────────────────────

/**
 * Contexto de autenticación.
 * Inicializado como `undefined` para detectar uso fuera del Provider.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de autenticación.
 * Envuelve la aplicación en App.tsx para exponer `state`, `login` y `logout`.
 *
 * Flujo de `login`:
 *   UI (LoginPage) → AuthContext.login() → LoginUseCase.execute()
 *     → IAuthRepository.login() → MockAuthRepository (adaptador)
 *
 * @param children - Árbol de componentes que pueden consumir el contexto.
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  /**
   * Intenta autenticar al usuario con las credenciales provistas.
   * Delega al caso de uso `LoginUseCase` (capa de aplicación),
   * que a su vez delega al repositorio a través del puerto.
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResult> => {
      dispatch({ type: 'AUTH_LOADING' });

      const result = await loginUseCase.execute(credentials);

      if (result.success) {
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
      }

      return result;
    },
    [],
  );

  /**
   * Cierra la sesión del usuario actual y resetea el estado global.
   */
  const logout = useCallback(() => {
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  const contextValue: AuthContextValue = { state, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
