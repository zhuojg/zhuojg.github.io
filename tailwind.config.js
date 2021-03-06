module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Cascadia Code"'],
      },
      scale: {
        '250': '2.5',
        '300': '3',
        '350': '3.5',
        '400': '4'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
