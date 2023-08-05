/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c00007',
        onPrimary: '#ffffff',
        primaryContainer: '#ffdad5',
        onPrimaryContainer: '#410001',
        background: '#fffbff',
        onBackground: '#201a19',
        surface: '#fffbff',
        onSurface: '#201a19',
        primaryDark: '#ffb4a9',
        onPrimaryDark: '#690002',
        primaryContainerDark: '#930004',
        onPrimaryContainerDark: '#ffdad5',
        backgroundDark: '#201a19',
        onBackgroundDark: '#ede0de',
        surfaceDark: '#201a19',
        onSurfaceDark: '#ede0de',
        pinkSecondary:'#fdf1ef',
      },
      fontSize: {
        heading: '6.25rem',
      },
    },
  },
  plugins: [],
};
