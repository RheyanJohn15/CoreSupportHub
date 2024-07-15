/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'dark': '#111111',
      'white': '#f0f0f0',
      'main-dark': '#FF440A',
      'main': '#ff6b3d',
      'main-light': '#ff8e6b',
      'grey': '#1f2430',
      'yellow': '#ffbf00',
      'trans': 'transparent',
      'orange':'#EE5A24',
      'darkOrange':'#EA2027',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
    },
    screens: {
      'sm': '600px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.15rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }, 
    
  },
  
  plugins: [],
};
