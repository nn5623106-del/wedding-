/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FFFDF7',
          soft: '#FBF7EE',
          deep: '#F5EFE2'
        },
        champagne: {
          DEFAULT: '#F3E5C3',
          light: '#F8EEDA',
          deep: '#E8D2A0'
        },
        gold: {
          50: '#FBF3DF',
          100: '#F3E1AE',
          200: '#E9CE85',
          300: '#DEB96A',
          400: '#CBA135',
          500: '#B8860B',
          600: '#9C6E0C',
          700: '#7A5509',
          DEFAULT: '#C9A227',
          soft: '#D9BE7E',
          glow: '#F0D68C'
        },
        ink: {
          DEFAULT: '#2C2416',
          soft: '#4A3F2C'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Cormorant Garamond"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif']
      },
      boxShadow: {
        luxury: '0 25px 60px -15px rgba(184, 134, 11, 0.35)',
        'luxury-lg': '0 35px 90px -20px rgba(44, 36, 22, 0.45)',
        'gold-glow': '0 0 35px rgba(240, 214, 140, 0.55)',
        card: '0 10px 40px rgba(184, 134, 11, 0.18), 0 2px 8px rgba(44,36,22,0.08)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E1AE 0%, #C9A227 50%, #F0D68C 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FFFDF7 0%, #F5EFE2 50%, #F3E5C3 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(240,214,140,0.35) 0%, rgba(240,214,140,0) 70%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-25px) translateX(10px)' }
        },
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.85 }
        },
        rayRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        sparkle: 'sparkle 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        gradientShift: 'gradientShift 15s ease infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        rayRotate: 'rayRotate 60s linear infinite'
      }
    }
  },
  plugins: []
}
