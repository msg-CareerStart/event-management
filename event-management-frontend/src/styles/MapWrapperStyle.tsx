import { makeStyles } from "@material-ui/core/styles";

const useStylesMapWrapper = makeStyles(() => ({
  mapWrapper: {
    justifyContent: "center",
    alignItems: "center",
    margin: "100px 200px 10px 300px",
    position: "relative",
  },
  buttonPopup: {
    color: "#FFFFFF!important",
    boxShadow: "0 0px 0px 0px #133C55 !important",
    marginTop: "11px !important",
    width: "50% !important",
    "&:disabled": {
      backgroundColor: "white !important",
      color: "black !important",
      backgroundImage: "linear-gradient(90deg, rgba(245,253,255,1) 0%, rgba(202,202,209,1) 1%)",
    },
  },
  wrapperPopup: {
    width: "200px",
  },
  locationTitle: {
    fontSize: "15px",
    margin: "2px 2px",
  },
  viewButton: {
    color: "#000000 !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#8c8c8c !important",
    },
    marginTop: "11px !important",
  },
  searchBar: {
    marginBottom: "40px",
  },
  icon: {
    maxWidth: "20px",
    height: "20px",
    padding: "5px",
  },
  locationAddress: {
    margin: "0 !important",
  },
  text: {
    margin: "0px !important",
  },
}));

export default useStylesMapWrapper;
