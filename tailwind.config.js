import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        stone: '#F8F7FF'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              50: '#ddf2ff',
              100: '#aed6ff',
              200: '#7dbbff',
              300: '#4aa0ff',
              400: '#1a85ff',
              500: '#006ce6',
              600: '#0054b4',
              700: '#003c82',
              800: '#002451',
              900: '#000d21',
              DEFAULT: '#0054b4'
            },
            secondary: {
              100: '#6cbe4d',
              200: '#57b533',
              300: '#42ab1a',
              400: '#2da200',
              500: '#299200',
              600: '#248200',
              700: '#1f7100',
              800: '#1a6100',
              900: '#175100',
              DEFAULT: '#248200'
            },
            steel: {
              600: '#168aa6',
              DEFAULT: '#086277'
            },
            orange: {
              50: '#ffefe6',
              300: '#ffb997'
            }
          }
        }
      }
    })
  ]
}
