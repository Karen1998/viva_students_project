/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  corePlugins: {
    // Disabled — the project uses its own reset.css
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
