const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"JetBrains Mono"', ...defaultTheme.fontFamily.sans],
      serif: ['"JetBrains Mono"', ...defaultTheme.fontFamily.serif],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
