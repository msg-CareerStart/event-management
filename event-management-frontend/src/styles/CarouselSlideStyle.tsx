import { makeStyles, Theme, fade } from "@material-ui/core";

export const useStylesCarousel = makeStyles((theme: Theme) => ({
  cardStyle: {
    pointerEvents: "none",
  },

  titleStyle: {
    width: "calc(78%)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      overflow: "visible",
      whiteSpace: "normal",
    },
    margin: theme.spacing(1),
  },

  textOnImage: {
    position: "absolute",
    backgroundColor: fade("#133655", 0.8),
    left: theme.spacing(3),
    right: theme.spacing(3),
    textAlign: "left",
    bottom: 0,
    fontSize: "24px",
    color: theme.palette.secondary.dark,
  },

  imageWrapper: { position: "relative" },

  loading: {
    marginTop: theme.spacing(5),
  },

  imageStyle: {
    pointerEvents: "fill",
    height: 270,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },

  textStyle: {
    display: "block",
    overflow: "hidden",
    textAlign: "left",
    float: "left",
    color: theme.palette.primary.dark,
  },

  descriptionTextStyle: {
    display: "block",
    overflow: "hidden",
    textAlign: "left",
    float: "left",
    color: theme.palette.primary.dark,
    width: "calc(100%)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      overflow: "visible",
      whiteSpace: "normal",
    },
  },

  title: {
    color: theme.palette.primary.main,
  },

  iconStyle: {
    marginRight: "8px",
    color: "#f2ac0a",
  },

  attributeStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginLeft: theme.spacing(1),
  },

  dateStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },

  locationStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },

  carouselStyle: {
    height: "430px",
    paddingBottom: theme.spacing(5),
  },
}));
