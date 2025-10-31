// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ffffff", 
        "secondary-color": "#000000", 
        "tertiary-color": "#d5d5d5", 
      },
      container: {
        padding: {
          DEFAULT: '1.25rem', // 20px
        },
        center: true,
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          paddingInline: '1.25rem !important', // 20px - overrides default
          '@media (min-width: 768px)': {
            paddingInline: '1.25rem !important', // 20px on md screens
          },
        },
      })
    },
  ],
};
