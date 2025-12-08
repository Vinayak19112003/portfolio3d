/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: '#050505',  // Deep background
        charcoal: '#0A0A0A',  // Card background
        glass: 'rgba(255, 255, 255, 0.03)',
        mist: '#E5E5E5',      // Primary Text
        subtle: '#888888',    // Secondary Text
        lux: '#6366f1',       // Indigo Accent
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}