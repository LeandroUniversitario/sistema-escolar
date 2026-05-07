/**
 * @file App.tsx
 * @description Configuración central de React Router DOM v6.
 *              Define todas las rutas de la aplicación con protección por rol.
 *
 * Árbol de rutas:
 *   /                         → Redirige a /login
 *   /login                    → LoginPage (pública)
 *   /director/dashboard       → DirectorDashboard    (solo DIRECTOR)
 *   /secretaria/dashboard     → SecretariaDashboard  (solo SECRETARIA)
 *   /contadora/dashboard      → ContadoraDashboard   (solo CONTADORA)
 *   /aux-contador/dashboard   → AuxContadorDashboard (solo AUX_CONTADOR)
 *   *                         → Redirige a /login (404)
 *
 * Para agregar un nuevo rol:
 *   1. Añade el rol en UserRole (auth.types.ts).
 *   2. Añade la entrada en ROLE_ROUTES (ProtectedRoute.tsx).
 *   3. Crea el dashboard en /pages.
 *   4. Añade la <Route> aquí. Solo 4 pasos, cero refactorización.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DirectorDashboard } from './pages/DirectorDashboard';
import { SecretariaDashboard } from './pages/SecretariaDashboard';
import { ContadoraDashboard } from './pages/ContadoraDashboard';
import { AuxContadorDashboard } from './pages/AuxContadorDashboard';

/**
 * Componente raíz.
 * Orden de providers: BrowserRouter → AuthProvider → Routes
 * AuthProvider debe estar dentro de BrowserRouter para acceso futuro a hooks de router.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Raíz → login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── DIRECTOR ─────────────────────────────────────── */}
          <Route element={<ProtectedRoute requiredRole="DIRECTOR" />}>
            <Route path="/director/dashboard" element={<DirectorDashboard />} />
          </Route>

          {/* ── SECRETARIA ───────────────────────────────────── */}
          <Route element={<ProtectedRoute requiredRole="SECRETARIA" />}>
            <Route path="/secretaria/dashboard" element={<SecretariaDashboard />} />
          </Route>

          {/* ── CONTADORA ────────────────────────────────────── */}
          <Route element={<ProtectedRoute requiredRole="CONTADORA" />}>
            <Route path="/contadora/dashboard" element={<ContadoraDashboard />} />
          </Route>

          {/* ── AUX_CONTADOR ─────────────────────────────────── */}
          <Route element={<ProtectedRoute requiredRole="AUX_CONTADOR" />}>
            <Route path="/aux-contador/dashboard" element={<AuxContadorDashboard />} />
          </Route>

          {/* 404 → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
