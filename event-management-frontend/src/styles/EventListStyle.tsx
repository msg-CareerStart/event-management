import { makeStyles } from "@material-ui/core";

export const useListStyles = makeStyles({
  stickyArea: {
    position: "sticky",
    top: "60px",
    backgroundColor: "white",
    zIndex: 2,
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "visible",
  },
});
