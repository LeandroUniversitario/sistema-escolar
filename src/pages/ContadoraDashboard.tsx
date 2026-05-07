/**
 * @file ContadoraDashboard.tsx
 * @description Dashboard placeholder para el rol CONTADORA.
 */

import type { FC } from 'react';
import {
  Building2,
  DollarSign,
  FileSpreadsheet,
  TrendingUp,
  Receipt,
  LogOut,
  Bell,
  ChevronRight,
  PieChart,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const ContadoraDashboard: FC = () => {
  const { state, logout } = useAuth();
  const { user } = state;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-topbar px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">San Luis Gonzaga</p>
              <p className="text-white font-bold text-sm leading-tight">Sistema Administrativo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button id="contadora-notifications" type="button" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200" aria-label="Notificaciones">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 px-3 py-2 bg-white/10 border border-white/15 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-violet-500/60 flex items-center justify-center">
                <span className="text-white font-bold text-xs">{user?.nombre.charAt(0) ?? 'C'}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-xs leading-none">{user?.nombre}</p>
                <p className="text-violet-200/70 text-[10px] font-medium mt-0.5 uppercase tracking-wide">{user?.rol}</p>
              </div>
            </div>
            <button id="contadora-logout" type="button" onClick={logout} className="btn-secondary text-xs py-2 px-3" aria-label="Cerrar sesión">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-neutral-800 font-bold text-2xl tracking-tight">
            Bienvenida, {user?.nombre} 👋
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Panel de control — Contabilidad</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          {[
            { icon: <DollarSign className="w-5 h-5" />, title: 'Ingresos', desc: 'Pensiones, matrículas y otros ingresos', color: 'text-violet-600 bg-violet-50 border-violet-100' },
            { icon: <Receipt className="w-5 h-5" />, title: 'Egresos', desc: 'Gastos operativos y planillas', color: 'text-rose-600 bg-rose-50 border-rose-100' },
            { icon: <FileSpreadsheet className="w-5 h-5" />, title: 'Libros Contables', desc: 'Libro diario, mayor y balances', color: 'text-brand-600 bg-brand-50 border-brand-100' },
            { icon: <TrendingUp className="w-5 h-5" />, title: 'Flujo de Caja', desc: 'Proyecciones y movimientos', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { icon: <PieChart className="w-5 h-5" />, title: 'Estados Financieros', desc: 'Balance general y resultados', color: 'text-amber-600 bg-amber-50 border-amber-100' },
          ].map((mod) => (
            <div key={mod.title} className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${mod.color}`}>{mod.icon}</div>
              <h3 className="font-semibold text-neutral-800 text-sm group-hover:text-brand-700 transition-colors">{mod.title}</h3>
              <p className="text-neutral-500 text-xs mt-0.5 leading-relaxed">{mod.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-neutral-400 font-medium group-hover:text-brand-500 transition-colors">
                <span>Próximamente</span><ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-violet-50 border border-violet-100 rounded-2xl animate-fade-in">
          <p className="text-violet-800 font-semibold text-sm">Módulos en desarrollo</p>
          <p className="text-violet-700/80 text-xs mt-1 leading-relaxed">
            Los módulos para el rol de <strong>Contadora</strong> se habilitarán tras el levantamiento de requisitos.
          </p>
        </div>
      </div>
    </div>
  );
};
