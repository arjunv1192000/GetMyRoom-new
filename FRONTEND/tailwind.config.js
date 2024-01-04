/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',

      'md': '768px',
   
      'lg': '1024px',
     
      'xl': '1280px',
      
    },
    keyframes: {
      typing: {
        "0%": {
          width: "0%",
          visibility: "hidden",
          height:"60px"
        },
        "100%": {
          width: "50%",
          height:"60px"
        }  
      },
      blink: {
        "50%": {
          borderColor: "transparent"
        },
        "90%": {
          borderColor: "transparent"
        }  
      }
    },
    animation: {
      typing: "typing 3s steps(10) infinite alternate, blink .5s infinite"
    }
  },
  plugins: [],
}

