/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070b0a',
        deep: '#0b1311',
        mint: '#5ed29c',
        cyan: '#4fd1d9'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Tahoma', 'sans-serif']
      },
      maxWidth: { content: '1440px' }
    }
  },
  plugins: []
};
