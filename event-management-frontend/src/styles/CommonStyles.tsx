import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: 0,
  },
  linkDecoration: {
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
  },
  shadow: {
    boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
  },
  eventTitle: {
    height: 50,
    padding: 20,
    color: "#133655",
    width: 100,
  },
  buttonSize: {
    maxWidth: "120px"
  },
  mainButtonStyle: {
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    borderRadius: "20px",
    width: "85%",
    cursor: "pointer",
    backgroundSize: "200%",
    transition: "0.3s",
    "&:hover": {
      backgroundPosition: "right",
    },
  },
  pinkGradientButtonStyle: {
    backgroundImage: "linear-gradient(45deg, #f9c929 10%, #f2ac0a 50%, #ed4d6e 90%)",
  },
  buttonStyle4: {
    width: "100%",
    borderRadius: "0px",
  },
  typography: {
    fontSize: 25,
    fontFamily: "LATO",
    color: theme.palette.text.primary,
    textTransform: "uppercase",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  //Colors
  dark: {
    color: "#133655",
  },
  light: {
    color: "#6BB7D0",
  },
  ghost: {
    color: "#F4F5F9",
  },
  white: {
    color: "#FFFFFF",
  },
  yellow: {
    color: "#F2AE30",
  },
  active: {
    color: "#F2AE30",
    textDecoration: "none",
  },
  inactive: {
    color: "#6BB7D0",
    textDecoration: "none",
  },
  buttonBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    background: "transparent",
  },
  mobileButton: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 10
    },
  },
  buttonCollapse: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    margin: "10px",
    boxShadow: "none",
  },
  left: {
    left: "100px",
  },
  floatRight: {
    float: "right",
    position: "relative",
  },
  cardRoot: {
    backgroundColor: "#6BB7D0",
    color: "#FFFFFF",
  },
  blueButton: {
    backgroundColor: "#6BB7D0",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#6BB7D0",
      color: "#FFFFFF",
    },
  },
  mainCardRoot: {
    width: "25%",
    float: "right",
  },
  addEventIconButton: {
    float: "right",
    marginTop: 5,
    color: "#FFFFFF",
    fontSize: 50,
    "&:hover": {
      color: "#F4F5F9",
    },
  },
  marginTop: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

export { useStyles };
