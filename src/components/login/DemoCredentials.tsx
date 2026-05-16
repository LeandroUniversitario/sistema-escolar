import type { FC } from 'react';

interface DemoCredential {
  rol: string;
  email: string;
  password: string;
  color: string;
  dot: string;
}

const DEMO_CREDENTIALS: readonly DemoCredential[] = [
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
];

interface DemoCredentialsProps {
  isDisabled: boolean;
  onSelect: (email: string, password: string) => void;
}

export const DemoCredentials: FC<DemoCredentialsProps> = ({ isDisabled, onSelect }) => (
  <div className="demo-section">
    <p className="demo-label">Credenciales de demostración</p>
    <div className="demo-grid">
      {DEMO_CREDENTIALS.map((cred) => (
        <button
          key={cred.rol}
          type="button"
          id={`demo-${cred.rol.toLowerCase().replace(/\s+|\./g, '-')}`}
          onClick={() => onSelect(cred.email, cred.password)}
          disabled={isDisabled}
          className={`demo-card text-left cursor-pointer hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border ${cred.color}`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${cred.dot}`} />
            <span className="font-semibold text-xs">{cred.rol}</span>
          </div>
          <p className="text-[10px] opacity-70 truncate leading-tight">{cred.email}</p>
          <p className="text-[10px] opacity-60 font-mono mt-0.5">{cred.password}</p>
        </button>
      ))}
    </div>
  </div>
);
