/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    truncate: {
      lines: {
        3: '3',
        5: '5',
        8: '8',
      }
    },

  },
  plugins: [
    // require('@tailwindcss/forms')
    require('tailwindcss-truncate-multiline')(),
  ],
}
