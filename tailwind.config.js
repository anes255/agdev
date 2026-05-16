/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0f4ff', 100: '#dbe4ff', 200: '#bac8ff', 300: '#91a7ff', 400: '#748ffc', 500: '#5c7cfa', 600: '#4c6ef5', 700: '#4263eb', 800: '#3b5bdb', 900: '#364fc7' },
        accent: { 50: '#fff0f6', 100: '#ffdeeb', 200: '#fcc2d7', 300: '#faa2c1', 400: '#f783ac', 500: '#f06595', 600: '#e64980', 700: '#d6336c', 800: '#c2255c', 900: '#a61e4d' },
        dark: { 50: '#f8f9fa', 100: '#f1f3f5', 200: '#e9ecef', 300: '#dee2e6', 400: '#ced4da', 500: '#adb5bd', 600: '#868e96', 700: '#495057', 800: '#343a40', 900: '#212529', 950: '#0a0a0f' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: { '0%': { boxShadow: '0 0 5px #5c7cfa, 0 0 10px #5c7cfa' }, '100%': { boxShadow: '0 0 20px #5c7cfa, 0 0 40px #4c6ef5' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } }
      }
    },
  },
  plugins: [],
}
