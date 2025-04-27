/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-surface': '#1e1e1e',
        'dark-border': '#333333',
        'dark-text': '#e0e0e0',
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
      },
      animation: {
        typing: 'typing 2s steps(20) infinite',
        ellipsis: 'ellipsis 1.5s steps(4) infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        ellipsis: {
          '0%': { content: '.' },
          '25%': { content: '..' },
          '50%': { content: '...' },
          '75%': { content: '....' },
        },
      },
    },
  },
  plugins: [],
};