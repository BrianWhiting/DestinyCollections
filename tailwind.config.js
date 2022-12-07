/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'item-basic': '#c3bcb4',
        'item-uncommon': '#366f42',
        'item-rare': '#5076a3',
        'item-legendary': '#522f65',
        'item-exotic': '#cdaf33',
      },
    },
  },
  plugins: [],
}
