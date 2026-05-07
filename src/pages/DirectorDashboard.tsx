/**
 * @file DirectorDashboard.tsx
 * @description Dashboard placeholder para el rol DIRECTOR.
 *              Módulos y permisos específicos se definirán tras el
 *              levantamiento de requisitos con el cliente.
 */

import type { FC } from 'react';
import {
  Building2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  TrendingUp,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const DirectorDashboard: FC = () => {
  const { state, logout } = useAuth();
  const { user } = state;

  return (
    <div className="dashboard-wrapper">
      {/* TopBar */}
      <header className="dashboard-topbar px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                San Luis Gonzaga
              </p>
              <p className="text-white font-bold text-sm leading-tight">
                Sistema Administrativo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="director-notifications"
              type="button"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200"
              aria-label="Notificaciones"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all duration-200">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {user?.nombre.charAt(0) ?? 'D'}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-xs leading-none">{user?.nombre}</p>
                <p className="text-blue-200/70 text-[10px] font-medium mt-0.5 uppercase tracking-wide">
                  {user?.rol}
                </p>
              </div>
            </div>
            <button
              id="director-logout"
              type="button"
              onClick={logout}
              className="btn-secondary text-xs py-2 px-3"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-neutral-800 font-bold text-2xl tracking-tight">
            Bienvenido, {user?.nombre} 👋
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Panel de control — Dirección General
          </p>
        </div>

        {/* Módulos próximos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          {[
            { icon: <Users className="w-5 h-5" />, title: 'Personal', desc: 'Gestión de docentes y administrativos', color: 'text-brand-600 bg-brand-50 border-brand-100' },
            { icon: <BookOpen className="w-5 h-5" />, title: 'Académico', desc: 'Matriculas, grados y secciones', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { icon: <BarChart3 className="w-5 h-5" />, title: 'Reportes', desc: 'Indicadores y estadísticas', color: 'text-violet-600 bg-violet-50 border-violet-100' },
            { icon: <TrendingUp className="w-5 h-5" />, title: 'Finanzas', desc: 'Resumen financiero institucional', color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { icon: <Settings className="w-5 h-5" />, title: 'Configuración', desc: 'Parámetros del sistema', color: 'text-slate-600 bg-slate-50 border-slate-100' },
          ].map((mod) => (
            <div
              key={mod.title}
              className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${mod.color}`}>
                {mod.icon}
              </div>
              <h3 className="font-semibold text-neutral-800 text-sm group-hover:text-brand-700 transition-colors">
                {mod.title}
              </h3>
              <p className="text-neutral-500 text-xs mt-0.5 leading-relaxed">{mod.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-neutral-400 font-medium group-hover:text-brand-500 transition-colors">
                <span>Próximamente</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 p-4 bg-brand-50 border border-brand-100 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <p className="text-brand-800 font-semibold text-sm">Módulos en desarrollo</p>
              <p className="text-brand-600/80 text-xs mt-0.5 leading-relaxed">
                Los módulos específicos para el rol de <strong>Director</strong> se habilitarán
                tras el levantamiento de requisitos con el cliente. La arquitectura está preparada
                para activarlos sin refactorización.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
