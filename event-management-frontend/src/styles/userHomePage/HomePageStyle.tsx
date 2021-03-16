import { makeStyles } from "@material-ui/core";

export const useHomeStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0%",
    width: "100%",
    minHeight: "99.9vh",
    background: "linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));
