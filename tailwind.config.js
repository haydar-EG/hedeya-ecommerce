/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF0F5',
          100: '#FFE4E1',
          200: '#FFC0CB',
          300: '#FFB6C1',
          400: '#FF69B4',
          500: '#FF1493',
          600: '#DB7093',
          700: '#C71585',
          800: '#AD1457',
          900: '#880E4F',
        },
        coral: {
          50: '#FFF4F2',
          100: '#FFE6E0',
          200: '#FFCCC2',
          300: '#FFB3A3',
          400: '#FF9985',
          500: '#FF9E80',
          600: '#FF8A65',
          700: '#FF7043',
          800: '#FF5722',
          900: '#E64A19',
        },
        baby: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#7EC4CF',
          600: '#0EA5E9',
          700: '#0284C7',
          800: '#0369A1',
          900: '#0C4A6E',
        },
        gold: {
          100: '#FFF8E1',
          200: '#FFECB3',
          300: '#FFE082',
          400: '#FFD54F',
          500: '#FFCA28',
          600: '#FFC107',
          700: '#FFB300',
          800: '#FFA000',
          900: '#FF8F00',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#333333',
        }
      },
      fontFamily: {
        'primary': ['Nunito', '"Open Sans"', 'sans-serif'],
        'heading': ['Nunito', 'sans-serif'],
        'body': ['"Open Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        }
      }
    },
  },
  plugins: [],
}