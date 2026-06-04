window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#F97316"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"]
      },
      fontWeight: {
        semibold: "500",
        bold: "500",
        extrabold: "500",
        black: "500"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
        glow: "0 18px 70px rgba(37, 99, 235, 0.22)"
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1200px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
};
