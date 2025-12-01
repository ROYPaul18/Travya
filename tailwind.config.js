module.exports = {
  theme: {
    extend: {
      colors: {
        'terracotta': {
          DEFAULT: '#E07A5F', // --primary
          'light': '#F29C83',
          'dark': '#C46248',
        },
        'sauge': {
          DEFAULT: '#81B29A', // --secondary
          'light': '#A5C9B4',
        },
        'cream': {
          DEFAULT: '#FDFBF7', // --bg-page
        },
        'charcoal': {
          DEFAULT: '#3D405B', // --text-dark
        },
      },
      fontFamily: {
        // Supposons que tu aies importé Lora et Nunito via _app.tsx ou next/font
        serif: ['Lora', 'serif'],
        sans: ['Nunito', 'sans-serif'],
      }
    },
  },
}