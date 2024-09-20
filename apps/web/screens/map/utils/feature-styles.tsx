import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";

export default {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: undefined,
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "#FFD833",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(255, 216, 51, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "#FFD833",
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(255, 216, 51, 0.1)",
    }),
    text: new Text({
      fill: new Fill({ color: "#FFD833" }),
      stroke: new Stroke({ color: "#FFD833", width: 10 }),
    }),
  }),
};
