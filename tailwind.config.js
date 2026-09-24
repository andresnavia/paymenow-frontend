/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B1E3D',
          900: '#102A52',
          800: '#153868',
        },
        brand: {
          50: '#EEF3FC',
          100: '#DCE7F9',
          200: '#B6CDF2',
          300: '#8FB2EA',
          400: '#4E8CFF',
          500: '#1750D6',
          600: '#0F3B99',
          700: '#0C2E78',
          800: '#092257',
          900: '#061737',
        },
        ink: '#31415E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(11, 30, 61, 0.06), 0 1px 3px 0 rgba(11, 30, 61, 0.08)',
      },
    },
  },
  plugins: [],
}
