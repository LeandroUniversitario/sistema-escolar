import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

import { useLoginForm } from '../hooks/useLoginForm';
import { ROLE_ROUTES } from '../components/ProtectedRoute';
import { BrandingPanel, LoginForm, DemoCredentials } from '../components/login';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    form,
    serverError,
    isSuccess,
    isLoading,
    isDisabled,
    isAuthenticated,
    user,
    handleLogin,
    fillDemo,
  } = useLoginForm();

  // Redirigir si ya está autenticado
  if (isAuthenticated && user) {
    navigate(ROLE_ROUTES[user.rol], { replace: true });
    return null;
  }

  return (
    <div className="login-root">
      <BrandingPanel />

      <main className="login-right">
        <div className="login-form-wrap animate-slide-up">
          <FormHeader />

          <LoginForm
            form={form}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isDisabled={isDisabled}
            serverError={serverError}
            onSubmit={handleLogin}
          />

          <DemoCredentials isDisabled={isDisabled} onSelect={fillDemo} />
        </div>

        <footer className="login-footer">
          © {new Date().getFullYear()} Colegio San Luis Gonzaga · Piura, Perú
        </footer>
      </main>
    </div>
  );
};

/** Encabezado del formulario con ícono mobile */
const FormHeader: FC = () => (
  <div className="login-form-header">
    <div className="flex lg:hidden items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center">
        <Building2 className="w-4 h-4 text-white" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
        San Luis Gonzaga
      </span>
    </div>
    <h2 className="login-form-title">Iniciar sesión</h2>
    <p className="login-form-subtitle">
      Sistema Administrativo — Colegio San Luis Gonzaga
    </p>
  </div>
);
