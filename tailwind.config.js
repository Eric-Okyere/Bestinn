/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'spin 10s linear infinite',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

