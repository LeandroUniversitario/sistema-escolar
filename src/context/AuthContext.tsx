/**
 * @file AuthContext.tsx
 * @description Contexto global de autenticación.
 *
 * Patrón: React Context API + useReducer (Flux-like).
 *
 * Por qué useReducer y no useState:
 *  - El estado de auth tiene múltiples sub-valores relacionados.
 *  - Las transiciones son predecibles y auditables por acción.
 *  - Facilita añadir middleware de logging o persistencia en el futuro.
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

import type {
  AuthState,
  AuthAction,
  AuthContextValue,
  LoginCredentials,
  AuthResult,
} from '../types/auth.types';
import { loginUser } from '../services/authService';

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
 * @param children - Árbol de componentes que pueden consumir el contexto.
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  /**
   * Intenta autenticar al usuario con las credenciales provistas.
   * Gestiona el ciclo completo: loading → éxito/error → actualización de estado.
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResult> => {
      dispatch({ type: 'AUTH_LOADING' });

      const result = await loginUser(credentials);

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
