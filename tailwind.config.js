const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"JetBrains Mono"', ...defaultTheme.fontFamily.sans],
      serif: ['"JetBrains Mono"', ...defaultTheme.fontFamily.serif],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
