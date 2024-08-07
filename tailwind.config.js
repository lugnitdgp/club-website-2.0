/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Screens/**/*.{js,ts,jsx,tsx,mdx}',
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
        primaryDark: '#ef614d',
        onPrimaryDark: '#690002',
        primaryContainerDark: '#930004',
        onPrimaryContainerDark: '#ffdad5',
        backgroundDark: '#201A19',
        onBackgroundDark: '#ede0de',
        surfaceDark: '#201A19',
        onSurfaceDark: '#ede0de',
        pinkSecondary: '#fdf1ef',
        tertiary: '#FCDFA6',
        onTertiary: '#251A00',
        yellowPrimary: '#fcdfa6',
        yellowPrimaryContainerDark: '#5c4200',
        secondaryDark: '#e7bdb7',
        onSecondaryDark: '#442926',
        tertiaryDark: '#dfc38c',
        onTertiaryDark: '#3e2e04',
      },
      fontSize: {
        heading: '6.25rem',
      },
      spacing: {
        '20': '5rem',  
        '16': '4rem',  
      },
    },
  },
  plugins: [],
};
