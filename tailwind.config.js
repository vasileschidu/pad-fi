/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      backgroundSize: {
          'size-200': '200% 200%',
      },
      backgroundPosition: {
          'pos-0': '0% 0%',
          'pos-100': '100% 100%',
      },
      // Some useful comment
      fontFamily: {
        space: [ "Space Grotesk" , "cursive"],
      },
     
  },
  },
  plugins: [],
};


