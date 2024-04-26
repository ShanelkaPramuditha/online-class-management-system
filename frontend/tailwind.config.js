/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         'silver-mist': '#F3F4F6',
         'light-silver': '#F5F4F4',
         'cold-gray': '#F3F4F6',
         'light-gray': '#D9D9D9',
         'dark-red': '#FF0000',
         'silver-gray': '#ABB0B8',
         'dark-gray': '#36454F'
      },
      extend: {
         fontFamily: {
            OpenSans: ['Open Sans', 'sans-serif'],
            GemunuLibre: ['Gemunu Libre', 'sans-serif'],
            Montserrat: ['Montserrat', 'sans-serif'],
            Rowdies: ['Rowdies', 'sans-serif']
         }
      }
   },
   plugins: [daisyui]
   // daisyui: {
   //    themes: ['light']
   //    // darkTheme: 'dark'
   // }
};
