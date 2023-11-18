import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-nunito)',
      },

      gridTemplateColumns: {
        location: '27.5rem 1fr',
      },

      maxWidth: {
        app: '70rem',
      },

      colors: {
        title: '#4D6F80',
        'text-base': '#5C8599',

        gray: {
          50: '#F5F8FA',
          100: '#EBF2F5',
          300: '#D3E2E5',
          600: '#8FA7B2',
        },

        blue: {
          50: '#B3DAE2',
          100: '#96FEFF',
          300: '#17D6EB',
          400: '#15C3D6',
          500: '#29B6D1',
          600: '#12AFCB',
          700: '#15B6D6',
          800: '#15C3D6',
        },
        green: {
          50: '#EDFFF6',
          100: '#A1E9C5',
          300: '#3CDC8C',
          500: '#37C77F',
          600: '#39CC83',
          700: '#3EE08F',
        },
        cyan: {
          200: '#15D6D6',
          400: '#00C7C7',
        },
        pink: {
          100: '#FFBCD4',
          900: '#FF669D',
        },
        brown: '#8D734B',
        yellow: '#FFD666',
      },
    },
  },
  plugins: [],
}
export default config
