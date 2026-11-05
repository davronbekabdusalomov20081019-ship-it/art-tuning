/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        art: {
          bg: '#0A0C10',
          card: '#12151D',
          cardHover: '#181D27',
          surface: '#151922',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(212, 175, 55, 0.35)',
          gold: '#D4AF37',
          goldLight: '#E8C86A',
          goldDark: '#A6841E',
          bronze: '#C5A880',
          silver: '#E1E4EA',
          muted: '#8E95A5',
          darkMuted: '#4F5665'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        accent: ['"Syne"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.15)',
        'glow-subtle': '0 10px 40px -10px rgba(0, 0, 0, 0.8)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'metallic-gold': 'linear-gradient(135deg, #F3E7C4 0%, #D4AF37 50%, #AA820A 100%)',
        'subtle-grid': 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
