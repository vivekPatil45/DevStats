// tailwind.config.cjs
import daisyUI from 'daisyui'
// import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [
    daisyUI
  ],
}
