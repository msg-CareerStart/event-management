import black_marker from "../../../assets/marker_black.png";
import green_marker from "../../../assets/marker_green.png";
import red_marker from "../../../assets/marker_red.png";
import marker_shadow from "../../../assets/marker-shadow.png";
import L from "leaflet";

export const blackMarkerPoint = new L.Icon({
  iconUrl: black_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export const greenMarkerPoint = new L.Icon({
  iconUrl: green_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export const redMarkerPoint = new L.Icon({
  iconUrl: red_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});
