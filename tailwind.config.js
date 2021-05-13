module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      mono: ['"Cascadia Code"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
