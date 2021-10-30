module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '400': '400px',
        '1/2': '150%'
      },
      backgroundColor: {
        'primary-green': '#6BA8A0'
      },
      textColor: {
        'primary-green': '#6BA8A0',
        'verified-green': '#13CC00'
      }
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      transitionDuration: ['hover', 'focus'],
    },
  },
  plugins: [],
}
