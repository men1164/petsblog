module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '400': '400px',
        '1/2': '150%'
      },
      minWidth: {
        'cardWidth': '275px',
        'cardWidth-sm': '250px'
      },
      minHeight: {
        'cardHeight': '400px',
        'cardHeight-sm': '100px'
      },
      backgroundColor: {
        'primary-green': '#6BA8A0'
      },
      textColor: {
        'primary-green': '#6BA8A0',
        'verified-green': '#13CC00'
      },
      width: {
        'cardWidth': '311px'
      },
      height: {
        'cardHeight': '454px'
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
