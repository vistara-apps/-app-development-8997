/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 10%, 98%)',
        accent: 'hsl(190, 80%, 50%)',
        primary: 'hsl(240, 80%, 50%)',
        surface: 'hsl(240, 10%, 100%)',
        textPrimary: 'hsl(240, 10%, 10%)',
        textSecondary: 'hsl(240, 10%, 30%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        lg: '24px',
        md: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(240, 10%, 10%, 0.08)',
      },
    },
  },
  plugins: [],
}