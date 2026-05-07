/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa San Luis Gonzaga — Azul Marino Institucional
        brand: {
          50:  '#eef3fb',
          100: '#d5e2f5',
          200: '#aac5eb',
          300: '#7ea8e1',
          400: '#538bd7',
          500: '#2563be',   // azul primario
          600: '#1a4f9e',   // azul oscuro corporativo
          700: '#163e80',   // azul marino
          800: '#112e60',   // azul marino profundo
          900: '#0c1f43',   // casi negro azulado
          950: '#060e20',
        },
        neutral: {
          50:  '#f8f9fb',
          100: '#f0f2f7',
          200: '#e2e6ef',
          300: '#c8cfdf',
          400: '#9aa5bb',
          500: '#6b7a94',
          600: '#4e5d75',
          700: '#374560',
          800: '#243050',
          900: '#141e35',
          950: '#0a1020',
        },
        success: {
          500: '#16a34a',
          600: '#15803d',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 4px 24px 0 rgba(14, 30, 64, 0.10)',
        'card-lg': '0 8px 48px 0 rgba(14, 30, 64, 0.16)',
        'input':   '0 0 0 3px rgba(37, 99, 190, 0.18)',
        'input-error': '0 0 0 3px rgba(239, 68, 68, 0.18)',
      },
      backgroundImage: {
        'auth-gradient': 'linear-gradient(135deg, #0c1f43 0%, #163e80 50%, #1a4f9e 100%)',
        'card-glass': 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,242,247,0.95) 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-slow':  'spin 1s linear infinite',
        'shake':      'shake 0.4s ease-in-out',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '70%':  { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
