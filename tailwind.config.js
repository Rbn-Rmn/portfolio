/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: 'class',          // ← important: enables dark: prefix (we use .dark on <html>)

  theme: {
    extend: {
      colors: {
        // Core semantic colors – easy to reuse across light/dark
        primary: {
          DEFAULT: '#06b6d4',     // cyan-500-ish
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        accent: {
          DEFAULT: '#7c3aed',     // violet-600
          light: '#a78bfa',
          dark: '#5b21b6',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        // Glassmorphism-friendly neutrals
        glass: {
          light: 'rgba(255, 255, 255, 0.65)',
          dark: 'rgba(30, 41, 59, 0.65)',   // slate-800/65
        },
        card: {
          light: 'rgba(255, 255, 255, 0.80)',
          dark: 'rgba(15, 23, 42, 0.80)',   // slate-950/80
        },
      },

      backdropBlur: {
        xs: '2px',
        glass: '12px',           // nice middle value for glass effect
      },

      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.15)',
        'glass-light': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.35)',
      },

      animation: {
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
      },

      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },

  plugins: [],
};