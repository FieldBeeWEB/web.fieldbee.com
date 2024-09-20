import { Map } from "ol";
import { LineString, Point } from "ol/geom";
import { Draw, Modify } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { useContext, useEffect } from "react";
import MapContext from "../utils/map-context";
import { formatArea, formatLength } from "../utils/map-helpers";
import {
  measureLabelStyle,
  measureModifyStyle,
  measureSegmentStyle,
  measureStyle,
  measureTipStyle,
} from "../utils/map-styles";

const segmentStyles = [measureSegmentStyle];

const MeasureLayer = () => {
  const { map } = useContext(MapContext);
  let tipPoint: any;

  const source = new VectorSource();
  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      return styleFunction(feature, true);
    },
    zIndex: 15,
  });
  const modify = new Modify({ source: source, style: measureModifyStyle });

  function styleFunction(
    feature: any,
    segments: any,
    drawType?: any,
    tip?: any
  ) {
    const styles = [measureStyle];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    if (!drawType || drawType === type) {
      if (type === "Polygon") {
        point = geometry.getInteriorPoint();
        label = formatArea(geometry);
        line = new LineString(geometry.getCoordinates()[0]);
      } else if (type === "LineString") {
        point = new Point(geometry.getLastCoordinate());
        label = formatLength(geometry);
        line = geometry;
      }
    }
    if (segments && line) {
      let count = 0;
      line.forEachSegment(function (a: any, b: any) {
        const segment = new LineString([a, b]);
        const label = formatLength(segment);
        if (segmentStyles.length - 1 < count) {
          segmentStyles.push(measureSegmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText().setText(label);
        styles.push(segmentStyles[count]);
        count++;
      });
    }
    if (label) {
      measureLabelStyle.setGeometry(point);
      measureLabelStyle.getText().setText(label);
      styles.push(measureLabelStyle);
    }
    if (
      tip &&
      type === "Point" &&
      !modify.getOverlay().getSource().getFeatures().length
    ) {
      tipPoint = geometry;
      measureTipStyle.getText().setText(tip);
      styles.push(measureTipStyle);
    }
    return styles;
  }

  let draw: any; // global so we can remove it later

  function addInteraction(map1: Map) {
    const drawType = "Polygon";
    const activeTip =
      "Click to continue drawing the " +
      (drawType === "Polygon" ? "polygon" : "line");
    const idleTip = "Click to start measuring";
    let tip = idleTip;
    draw = new Draw({
      source: source,
      type: drawType,
      style: function (feature) {
        return styleFunction(feature, true, drawType, tip);
      },
    });
    draw.on("drawstart", function () {
      // if (true) {
      //   source.clear();
      // }
      modify.setActive(false);
      tip = activeTip;
    });
    draw.on("drawend", function () {
      measureModifyStyle.setGeometry(tipPoint);
      modify.setActive(true);
      map1.once("pointermove", function () {
        // modifyStyle.setGeometry();
      });
      tip = idleTip;
    });
    modify.setActive(true);
    map1.addInteraction(draw);
  }

  useEffect(() => {
    if (!map) return;
    map.addLayer(vector);
    addInteraction(map);

    return () => {
      if (map) {
        map.removeLayer(vector);
        map.removeInteraction(draw);
      }
    };
  }, [map]);

  return null;
};
export default MeasureLayer;
