/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Deep navy - primary brand colour (text on light, surfaces on dark)
        navy: {
          50: '#f3f6fb',
          100: '#e4ebf5',
          200: '#c6d4e8',
          300: '#9bb3d3',
          400: '#6a8cba',
          500: '#476ea3',
          600: '#355688',
          700: '#2c466f',
          800: '#233858',
          900: '#0b1f3a',
          950: '#071427',
        },
        // Ice blue - cold-chain accent
        ice: {
          50: '#f2f9fd',
          100: '#e3f2fb',
          200: '#c0e3f6',
          300: '#8ccdee',
          400: '#54b3e3',
          500: '#2c98d1',
          600: '#1d7ab1',
          700: '#196190',
          800: '#195277',
          900: '#1a4563',
        },
        // Single warm accent for CTAs and highlights
        accent: {
          400: '#f6b445',
          500: '#ef9f1a',
          600: '#d5850e',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 31, 58, 0.06), 0 8px 24px -12px rgba(11, 31, 58, 0.18)',
      },
      maxWidth: {
        container: '72rem',
      },
    },
  },
  plugins: [],
}
