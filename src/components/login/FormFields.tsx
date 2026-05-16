import type { FC } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import type { LoginFormData } from '../../hooks/useLoginForm';

interface FieldProps {
  register: UseFormRegister<LoginFormData>;
  error: FieldError | undefined;
  isDisabled: boolean;
}

export const EmailField: FC<FieldProps> = ({ register, error, isDisabled }) => (
  <div className="field-group">
    <label htmlFor="login-email" className="field-label">
      Usuario o correo electrónico
    </label>
    <div className="relative">
      <Mail className={`field-icon-left w-4 h-4 ${error ? 'text-error-500' : ''}`} />
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        placeholder="correo@sanluisgonzaga.edu.pe"
        disabled={isDisabled}
        {...register('email')}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-describedby={error ? 'login-email-error' : undefined}
        aria-invalid={!!error}
      />
    </div>
    {error && (
      <p id="login-email-error" className="field-error-msg" role="alert">
        <AlertCircle className="w-3.5 h-3.5" />
        {error.message}
      </p>
    )}
  </div>
);

interface PasswordFieldProps extends FieldProps {
  showPassword: boolean;
  onToggle: () => void;
}

export const PasswordField: FC<PasswordFieldProps> = ({
  register,
  error,
  isDisabled,
  showPassword,
  onToggle,
}) => (
  <div className="field-group">
    <label htmlFor="login-password" className="field-label">
      Contraseña
    </label>
    <div className="relative">
      <Lock className={`field-icon-left w-4 h-4 ${error ? 'text-error-500' : ''}`} />
      <input
        id="login-password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="Ingresa tu contraseña"
        disabled={isDisabled}
        {...register('password')}
        className={`input-field pr-10 ${error ? 'input-error' : ''}`}
        aria-describedby={error ? 'login-password-error' : undefined}
        aria-invalid={!!error}
      />
      <button
        type="button"
        id="toggle-password"
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        onClick={onToggle}
        className="field-icon-right"
        tabIndex={-1}
        disabled={isDisabled}
      >
        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
    {error && (
      <p id="login-password-error" className="field-error-msg" role="alert">
        <AlertCircle className="w-3.5 h-3.5" />
        {error.message}
      </p>
    )}
  </div>
);

export const SubmitButton: FC<{ isLoading: boolean; isSuccess: boolean }> = ({
  isLoading,
  isSuccess,
}) => (
  <button
    id="login-submit"
    type="submit"
    disabled={isLoading || isSuccess}
    className="btn-primary"
  >
    {isLoading ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin-slow" aria-hidden="true" />
        <span>Verificando acceso…</span>
      </>
    ) : isSuccess ? (
      <>
        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
        <span>Acceso concedido</span>
      </>
    ) : (
      <>
        <LogIn className="w-4 h-4" aria-hidden="true" />
        <span>Ingresar al Sistema</span>
      </>
    )}
  </button>
);
