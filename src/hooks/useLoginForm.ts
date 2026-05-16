import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './useAuth';
import { ROLE_ROUTES } from '../components/ProtectedRoute';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo o usuario es requerido.')
    .email('Ingresa un correo electrónico válido.'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida.')
    .min(4, 'La contraseña debe tener al menos 4 caracteres.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { state, login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const isLoading = form.formState.isSubmitting || state.isLoading;
  const isDisabled = isLoading || isSuccess;

  const handleLogin = useCallback(async (data: LoginFormData) => {
    setServerError(null);

    const result = await login({ email: data.email, password: data.password });

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => navigate(ROLE_ROUTES[result.user.rol], { replace: true }), 600);
      return;
    }

    setServerError(result.error.message);
  }, [login, navigate]);

  const fillDemo = useCallback((email: string, password: string) => {
    form.setValue('email', email, { shouldValidate: true });
    form.setValue('password', password, { shouldValidate: true });
    setServerError(null);
  }, [form]);

  return {
    form,
    serverError,
    isSuccess,
    isLoading,
    isDisabled,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    handleLogin,
    fillDemo,
  };
};
