module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fitness_seamless 2': "url('/images/fitness_seamless 2.jpg')",
      },
      colors: {
        'contact-us-main': '#3FBF6A',
        'newsletter-bg': '#FFCF2E',
        'footer-text': '#FFCF2E',
        'dropdown-bg': '#313443',
        'dropdown-item-color': '#4296cb',
        'dropdown-item-hover-color': '#212432',
        'mobile-menu-bg': '#212432',
        'bg-admin-sidebar': '#F7F7F7',
        'bg-admin-sidebar-top': '#E2E2E2',
        'bg-sidebar-button': '#C4C4C4',
        'sidebar-title': '#008FAC',
        'sidebar-item-bg': '#CFF7FF',
        'sidebar-item-bg-hover': '#E5F4F8',
        'home-info-icon-bg': '#273171',
      },
      fontSize: {
        xxs: '.60rem',
      },
    },
  },
  plugins: [],
};
