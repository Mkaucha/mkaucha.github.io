const { DEFAULT_ECDH_CURVE } = require("tls")

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'primary': '#ebebeb',
      'black': '#000',
      'white': '#fff'
     }),
     fontFamily: {
      'alata': ['Alata', ' sans-serif'],
      'mont': ['Montserrat', ' sans-serif'],
     },
     letterSpacing: {
       widest: '.25em',
     },
    container: {
      center: true
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen lg': {
            maxWidth: '1100px',
          },
          '@screen xl': {
            maxWidth: '1100px',
          },
          '@screen 2xl': {
            maxWidth: '1100px',
          },
        }
      })
    }
  ],
}
