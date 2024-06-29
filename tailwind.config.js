/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prime: '#6000D3', 
        prime2:"#5d1a8f",
        secondary:"#333333"
      },
    },
    
  },
  plugins: [],
}