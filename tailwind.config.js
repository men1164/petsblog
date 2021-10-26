module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '400': '400px'
      },
      backgroundColor: {
        'primary-green': '#6BA8A0'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
