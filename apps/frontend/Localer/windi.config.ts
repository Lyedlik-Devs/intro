import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  attributify: true,
  theme: {
    textShadow: {
      DEFAULT: '0px 0px 6px rgba(151, 39, 4, 0.4)',
      crimson: '0px 0px 6px rgba(209, 44, 95, 0.4)',
      orange: '0px 0px 6px rgba(243, 88, 39, 0.4)',
      blue: '0px 0px 6px rgba(8, 66, 160, 0.4)'
    },
    boxShadow: {
      inner: 'inset 0px 2px 12px -4px rgb(243, 88, 39)'
    },
    colors: {
      crimson: {
        50: '#FFF3F6',
        100: '#FFDAE5',
        200: '#FCC8D8',
        500: '#D12C5F',
        600: '#A8244E'
      },
      orange: {
        50: '#FEE5E3',
        100: '#FCCAC0',
        200: '#F89679',
        500: '#F35827'
      },
      brown: {
        500: '#912808',
        900: '#2A1700'
      },
      blue: '#0842A0',
      grey: {
        700: '#3A3A3A',
        800: '#2A2A2A',
        900: '#1A1A1A'
      }
    }
  }
})
