/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vlennd-deep': '#0d0618',
        'vlennd-carbon': '#130a22',
        'vlennd-silver': '#D1D5DB', // Polished Silver
        'vlennd-ivory': '#F5F5F3',
        'vlennd-smoke': '#9A9A9A',
        'vlennd-chrome': '#E5E7EB',
      },
      fontFamily: {
        heading: ['Jost', 'sans-serif'],
        sans: ['Jost', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'silver-gradient': 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)',
        'chrome-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 100%)',
      }
    },
  },
  plugins: [],
}
