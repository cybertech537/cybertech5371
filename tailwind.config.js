/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    container:{
      center: true,
      padding: '16px'
    },
    extend: {
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#ef3d32"
      },
    },
    
  },
  daisyui: {
    base: false,
    themes: [
      {
        donorbridge: {
          "primary": "#ef3d32",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451"
        },
      }
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
