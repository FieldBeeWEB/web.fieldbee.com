import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { theme } from "@fieldbee/ui";

export const defaultLabelStyle = new Style({
  text: new Text({
    font: "16px Calibri, sans-serif",
    fill: new Fill({
      color: theme.palette.surface.main,
    }),
    padding: [4, 10, 4, 10],
    backgroundFill: new Fill({
      color: theme.palette.surface_emphasis.medium,
    }),
  }),
});

export const selectedLabelStyle = new Style({
  text: new Text({
    font: "16px Calibri, sans-serif",
    fill: new Fill({
      color: theme.palette.primary_emphasis.high,
    }),
    padding: [4, 10, 4, 10],
    backgroundFill: new Fill({
      color: theme.palette.primary.main,
    }),
  }),
});

export const defaultBasicLayerStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.16)",
  }),
  stroke: new Stroke({
    color: "#000000",
    width: 1,
  }),
});

export const defaultSatelliteLayerStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.16)",
  }),
  stroke: new Stroke({
    color: "#FFFFFF",
    width: 1,
  }),
});

export const selectedLayerStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 195, 75, 0.20)",
  }),
  stroke: new Stroke({
    color: theme.palette.primary.main,
    width: 2,
  }),
});

export const modifyStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 190, 51, 0.4)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 190, 51, 0.7)",
    width: 2,
  }),
  image: new Circle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(255, 190, 51, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 190, 51, 0.4)",
    }),
  }),
  text: new Text({
    text: "Drag to modify",
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const segmentStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textBaseline: "bottom",
    offsetY: -12,
  }),
});

export const segmentStyles = [segmentStyle];

export const tipStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const labelStyle = new Style({
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "#151515",
    }),
    backgroundFill: new Fill({
      color: "#FFD833",
    }),
    padding: [3, 3, 3, 3],
    textBaseline: "bottom",
    offsetY: -15,
  }),
});

export const drawStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 216, 51, 0.5)",
  }),
  stroke: new Stroke({
    color: "#FFD833",
    width: 2,
  }),
  image: new Circle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 216, 51, 0.5)",
    }),
  }),
});

export const editStyle = new Style({
  fill: new Fill({
    color: "rgba(219, 149, 51, 0.5)",
  }),
  stroke: new Stroke({
    color: "#d08833",
    width: 2,
  }),
  image: new Circle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(219, 149, 51, 0.5)",
    }),
  }),
});

export const measureLabelStyle = new Style({
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [3, 3, 3, 3],
    textBaseline: "bottom",
    offsetY: -15,
  }),
});

export const measureStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 0.5)",
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
  }),
});

export const measureModifyStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
  }),
  text: new Text({
    text: "Drag to modify",
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const measureTipStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const measureSegmentStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textBaseline: "bottom",
    offsetY: -12,
  }),
});
