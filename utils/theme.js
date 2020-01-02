import red from "@material-ui/core/colors/red";
import { grey } from "@material-ui/core/colors";

// Create a theme instance.
const themeConfig = {
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#19857b",
      red: "#f44336",
      grey: grey[600],
      pink: "#f06292"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fafafa"
    }
  }
};

export default themeConfig;
