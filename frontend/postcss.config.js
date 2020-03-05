const tailwindcss = require('tailwindcss');
 module.exports = {
     plugins: [
        require('tailwindcss')('./tailwindcss-config.js'),
         tailwindcss('./tailwind.js'),
         require('autoprefixer'),
     ],
 };