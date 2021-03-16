import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: "#1E5FA4", //blue
      light: "#6BB7D0 ", //light blue
      dark: "#133C55", //dark blue
    },
    secondary: {
      light: "#f9c929", //light yellow
      main: "#FFFFFF", //pure white
      dark: "#f2ac0a", //dark yellow
      contrastText: "#ED4D6E", //paradise pink
    },
    background: {
      default: "#FFFFFF", //white
    },
    text: {
      primary: "#133C55", //dark blue
    },
  },
});

export default themeDark;
