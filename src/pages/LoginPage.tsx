/**
 * @file LoginPage.tsx
 * @description Página de autenticación del Sistema Administrativo.
 *              Diseño split-screen: panel izquierdo de branding institucional
 *              y panel derecho con el formulario de login.
 *
 * Librerías utilizadas:
 *  - react-hook-form + zod   → validación declarativa con mensajes en español
 *  - lucide-react            → íconos semánticos
 *  - Tailwind CSS v3         → paleta corporativa azul marino
 *
 * @module LoginPage
 */

import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Shield,
  CheckCircle2,
  Users,
  BookOpen,
  BarChart3,
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { ROLE_ROUTES } from '../components/ProtectedRoute';

// ─── Schema de validación ─────────────────────────────────────────────────────

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

type LoginFormData = z.infer<typeof loginSchema>;

// ─── Credenciales de demo (para la UI informativa) ───────────────────────────

const DEMO_CREDENTIALS = [
  {
    rol: 'Director',
    email: 'director@sanluisgonzaga.edu.pe',
    password: 'director123',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    dot: 'bg-blue-500',
  },
  {
    rol: 'Secretaria',
    email: 'secretaria@sanluisgonzaga.edu.pe',
    password: 'secretaria123',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  {
    rol: 'Contadora',
    email: 'contadora@sanluisgonzaga.edu.pe',
    password: 'contadora123',
    color: 'bg-violet-50 border-violet-200 text-violet-800',
    dot: 'bg-violet-500',
  },
  {
    rol: 'Aux. Contador',
    email: 'aux.contador@sanluisgonzaga.edu.pe',
    password: 'aux123',
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    dot: 'bg-amber-500',
  },
] as const;

// ─── Componente principal ─────────────────────────────────────────────────────

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { state, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Si ya está autenticado, redirige a su dashboard
  if (state.isAuthenticated && state.user) {
    const destination = ROLE_ROUTES[state.user.rol];
    navigate(destination, { replace: true });
    return null;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const isLoading = isSubmitting || state.isLoading;

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const result = await login({ email: data.email, password: data.password });

    if (result.success) {
      setLoginSuccess(true);
      setTimeout(() => {
        navigate(ROLE_ROUTES[result.user.rol], { replace: true });
      }, 600);
    } else {
      setServerError(result.error.message);
    }
  };

  const fillDemo = (email: string, password: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
    setServerError(null);
  };

  return (
    <div className="login-root">
      {/* ════════════════════════════════════════════════════════
          PANEL IZQUIERDO — Branding institucional
          ════════════════════════════════════════════════════════ */}
      <aside className="login-left">
        {/* Orbes decorativos */}
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />

        {/* Logo + nombre */}
        <div className="login-brand">
          <div className="login-logo-ring">
            <Building2 className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <span className="login-brand-sub">Institución Educativa</span>
          <h1 className="login-brand-title">San Luis Gonzaga</h1>
          <p className="login-brand-location">Piura, Perú · Est. 1953</p>
          <div className="mt-2 h-px w-12 bg-white/20 rounded-full" />
          <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
            Sistema Administrativo Digital para la gestión integral del colegio.
          </p>
        </div>

        {/* Features */}
        <div className="login-features">
          <p className="login-features-label">Módulos del Sistema</p>
          {[
            { icon: <Users className="w-3.5 h-3.5" />, label: 'Gestión de personal y roles' },
            { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Administración académica' },
            { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Reportes y contabilidad' },
            { icon: <Shield className="w-3.5 h-3.5" />, label: 'Acceso seguro por perfil' },
          ].map(({ icon, label }) => (
            <div key={label} className="feature-pill">
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Badge seguridad */}
        <div className="login-secure-badge">
          <Shield className="w-3.5 h-3.5" />
          <span>Acceso restringido al personal autorizado</span>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════
          PANEL DERECHO — Formulario de login
          ════════════════════════════════════════════════════════ */}
      <main className="login-right">
        <div className="login-form-wrap animate-slide-up">

          {/* Encabezado del formulario */}
          <div className="login-form-header">
            {/* Ícono visible solo en mobile */}
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

          {/* ─── Error de servidor ────────────────────────────── */}
          {serverError && (
            <div className="server-error-box mb-4 animate-shake">
              <AlertCircle className="w-4 h-4 text-error-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error-600 font-medium">{serverError}</p>
            </div>
          )}

          {/* ─── Éxito ───────────────────────────────────────── */}
          {loginSuccess && (
            <div className="flex items-center gap-2.5 p-3 mb-4 rounded-xl bg-success-500/10 border border-success-500/20 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
              <p className="text-sm text-success-600 font-medium">
                Acceso verificado. Redirigiendo…
              </p>
            </div>
          )}

          {/* ─── Formulario ──────────────────────────────────── */}
          <form
            id="login-form"
            onSubmit={handleSubmit(onSubmit)}
            className="login-form"
            noValidate
          >
            {/* Campo: correo */}
            <div className="field-group">
              <label htmlFor="login-email" className="field-label">
                Usuario o correo electrónico
              </label>
              <div className="relative">
                <Mail
                  className={`field-icon-left w-4 h-4 ${
                    errors.email ? 'text-error-500' : ''
                  }`}
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@sanluisgonzaga.edu.pe"
                  disabled={isLoading || loginSuccess}
                  {...register('email')}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p id="login-email-error" className="field-error-msg" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo: contraseña */}
            <div className="field-group">
              <label htmlFor="login-password" className="field-label">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className={`field-icon-left w-4 h-4 ${
                    errors.password ? 'text-error-500' : ''
                  }`}
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  disabled={isLoading || loginSuccess}
                  {...register('password')}
                  className={`input-field pr-10 ${errors.password ? 'input-error' : ''}`}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  id="toggle-password"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="field-icon-right"
                  tabIndex={-1}
                  disabled={isLoading || loginSuccess}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="login-password-error" className="field-error-msg" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón de submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading || loginSuccess}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin-slow" aria-hidden="true" />
                  <span>Verificando acceso…</span>
                </>
              ) : loginSuccess ? (
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
          </form>

          {/* ─── Demo credentials ─────────────────────────────── */}
          <div className="demo-section">
            <p className="demo-label">Credenciales de demostración</p>
            <div className="demo-grid">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.rol}
                  type="button"
                  id={`demo-${cred.rol.toLowerCase().replace(/\s+|\./g, '-')}`}
                  onClick={() => fillDemo(cred.email, cred.password)}
                  disabled={isLoading || loginSuccess}
                  className={`demo-card text-left cursor-pointer hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border ${cred.color}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${cred.dot}`} />
                    <span className="font-semibold text-xs">{cred.rol}</span>
                  </div>
                  <p className="text-[10px] opacity-70 truncate leading-tight">
                    {cred.email}
                  </p>
                  <p className="text-[10px] opacity-60 font-mono mt-0.5">
                    {cred.password}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          © {new Date().getFullYear()} Colegio San Luis Gonzaga · Piura, Perú
        </footer>
      </main>
    </div>
  );
};
