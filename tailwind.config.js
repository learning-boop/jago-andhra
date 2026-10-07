/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#062B63', 800: '#051F4A', 900: '#031533', 50: '#EEF3FA', 100: '#D9E3F2' },
        brand: {
          red: '#E7191F',
          orange: '#FF5A00',
          green: '#008C3A',
          cream: '#FFF9ED',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(6, 43, 99, 0.18)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '0.7' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseRing: 'pulseRing 2s cubic-bezier(0.2, 0.6, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};
