module.exports = {
  purge: [
//    './src/**/*.html',
//    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      krona: ['"Krona One"', "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },
    colors: {
      white: {
        DEFAULT: "#ffffff",
      },
      black: {
        DEFAULT: "#000000",
      },
      red: {
        DEFAULT: "#eb4334",
      },
      yellow: {
        DEFAULT: "#f7f73b"
      },
      orange: {
        DEFAULT: "#f8b35b"
      },
      blue: {
        DEFAULT: "#0065ff",
        dark: "#0052cc",
        warm: "#026aa7",
        light: "#e6fcff",
      },
      green: {
        DEFAULT: "#5aac44",
        light: "#d4f061",
      },
      emerald: {
        DEFAULT: "#00b8d9",
      },
      pink: {
        DEFAULT: "#de93df;",
      },
      gray: {
        DEFAULT: "#4d4d4d",
        regular: "#d6d8d9",
        light: "#5e6c84",
        lightest: "#ebecf0",
        dark: "#8f8f8f",
      },
    },
    boxShadow: {
      DEFAULT: "0px 4px 10px rgba(0, 0, 0, 0.25)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
