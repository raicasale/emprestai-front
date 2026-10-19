/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
      },
      colors: {
        bg: '#161826',
        surface: '#232532',
        'surface-hover': '#2a2d3d',
        text: '#e9e9ed',
        divider: 'color-mix(in srgb, #e9e9ed 16%, transparent)',
        neutral: {
          900: '#292b31',
        },
        accent: {
          100: '#e6faf7',
          200: '#c2f1eb',
          300: '#93e3da',
          400: '#5fcfc4',
          500: '#2fb8ac', // base
          600: '#26978e',
          700: '#1d746d',
          800: '#15534e',
          900: '#0f3733',
        },
        status: {
          disponivel: '#5fcfc4',
          'disponivel-bg': 'rgba(47,184,172,0.12)',
          'disponivel-bd': 'rgba(47,184,172,0.40)',
          emprestado: '#c9a25f',
          'emprestado-bg': 'rgba(201,162,95,0.12)',
          'emprestado-bd': 'rgba(201,162,95,0.38)',
          atraso: '#e88b8b',
          'atraso-bg': 'rgba(200,90,90,0.14)',
          'atraso-bd': 'rgba(200,90,90,0.40)',
          manutencao: '#9aa0ad',
          'manutencao-bg': 'rgba(154,160,173,0.10)',
          'manutencao-bd': 'rgba(154,160,173,0.30)',
        }
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.25s ease both',
        'fadeUp-modal': 'fadeUp 0.18s ease both',
        'fadeUp-toast': 'fadeUp 0.2s ease both',
      }
    },
  },
  plugins: [],
}
