import type { FC } from 'react';
import {
  Building2,
  Users,
  BookOpen,
  BarChart3,
  Shield,
} from 'lucide-react';

const FEATURES = [
  { icon: <Users className="w-3.5 h-3.5" />, label: 'Gestión de personal y roles' },
  { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Administración académica' },
  { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Reportes y contabilidad' },
  { icon: <Shield className="w-3.5 h-3.5" />, label: 'Acceso seguro por perfil' },
] as const;

export const BrandingPanel: FC = () => (
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
      {FEATURES.map(({ icon, label }) => (
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
);
