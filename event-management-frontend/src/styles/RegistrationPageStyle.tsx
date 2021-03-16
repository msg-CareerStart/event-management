import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStylesRegistration = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  registrationform: {
    flexGrow: 1,
    display: "flex",
    maxWidth: "450px",
    margin: "auto",
  },

  registrationformItems: {
    paddingBottom: "1.250em",
  },

  registrationButton: {
    marginLeft: "7%",
    color: "#FFFFFF",
  },

  registrationTitle: {
    marginTop: "2em",
  },

  loginLink: {
    marginTop: "1em",
  },
}));
