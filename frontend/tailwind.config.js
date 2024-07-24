module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        brandHeaderBackground: 'var(--brand-header-background)',
        primaryWhite: 'var(--primary-white)',
        whiteHover: 'var(--white-hover)',
      },
      backgroundImage: {
        'sidemenu-bg': "url('/src/assets/images/sidemenu-bg.jpg')",
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
