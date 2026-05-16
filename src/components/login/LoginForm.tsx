import { useState, type FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { EmailField, PasswordField, SubmitButton } from './FormFields';
import type { LoginFormData } from '../../hooks/useLoginForm';

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  isLoading: boolean;
  isSuccess: boolean;
  isDisabled: boolean;
  serverError: string | null;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({
  form,
  isLoading,
  isSuccess,
  isDisabled,
  serverError,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <>
      {serverError && (
        <div className="server-error-box mb-4 animate-shake">
          <AlertCircle className="w-4 h-4 text-error-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-error-600 font-medium">{serverError}</p>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-center gap-2.5 p-3 mb-4 rounded-xl bg-success-500/10 border border-success-500/20 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
          <p className="text-sm text-success-600 font-medium">
            Acceso verificado. Redirigiendo…
          </p>
        </div>
      )}

      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        noValidate
      >
        <EmailField register={register} error={errors.email} isDisabled={isDisabled} />
        <PasswordField
          register={register}
          error={errors.password}
          isDisabled={isDisabled}
          showPassword={showPassword}
          onToggle={() => setShowPassword((v) => !v)}
        />
        <SubmitButton isLoading={isLoading} isSuccess={isSuccess} />
      </form>
    </>
  );
};
