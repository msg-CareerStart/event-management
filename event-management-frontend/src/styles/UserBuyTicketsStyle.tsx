import { makeStyles, Theme } from "@material-ui/core";

export const userBuyTicketsStyle = makeStyles((theme: Theme) => ({
  position: {
    margin: "1%",
    width: "50%",
    left: "25%"
  },
  button: {
    position: 'absolute',
    bottom: "2%",
    left: 0,
  },
  typography: {
    padding: "1%",
    fontSize: "1.6em",
    color: theme.palette.primary.dark,
  },
  buttonPosition: {
    left: "7%"
  },
  alignHelpIcon: {
    margin: "10px",
  },
  gridStyle: {
    // maxHeight: window.innerHeight - 200,
    maxHeight: '40vh',
    // overflow: 'auto',
    minWidth: '40vw',
    overflowY: "scroll",
  }
}));