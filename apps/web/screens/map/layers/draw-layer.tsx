import { Button, InfoNotification } from "@fieldbee/ui";
import { ButtonGroup } from "@fieldbee/ui/components";
import { Map } from "ol";
import { shiftKeyOnly } from "ol/events/condition";
import { LineString, Point } from "ol/geom";
import { Draw, Modify } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "../utils/consts";
import MapContext from "../utils/map-context";
import { formatArea, formatLength } from "../utils/map-helpers";
import {
  drawStyle,
  labelStyle,
  modifyStyle,
  segmentStyle,
  segmentStyles,
  tipStyle,
} from "../utils/map-styles";

interface Props {
  coordinates: string;
  handleChangeCoordinates: (coord: string) => void;
  detailsVisible: boolean;
  handleContinueClick: () => void;
}

const DrawLayer: React.FunctionComponent<Props> = ({
  coordinates,
  handleChangeCoordinates: setCoordinates,
  detailsVisible,
  handleContinueClick,
}) => {
  const { map } = useContext(MapContext);
  const [startedDrawing, setStartedDrawing] = useState(false);
  const [finishedDrawing, setFinishedDrawing] = useState(false);

  let tipPoint: any;

  const source = new VectorSource();

  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      return styleFunction(feature, true);
    },
  });

  const modify = new Modify({
    source: source,
    style: modifyStyle,
    deleteCondition: shiftKeyOnly,
  });

  modify.on("modifyend", function (evt: any) {
    const x = evt.features
      .getArray()[0]
      .clone()
      .getGeometry()
      .transform(WEB_APP_MAP_PROJECTION, API_MAP_PROJECTION)
      .getCoordinates()[0]
      .map((y: any) => y.toString().replace(",", " "))
      .toString();

    setCoordinates(`MULTIPOLYGON(((${x})))`);
  });

  function styleFunction(
    feature: any,
    segments: any,
    drawType?: any,
    tip?: any,
  ) {
    const styles = [drawStyle];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    // console.log("geo", geometry);
    // console.log("edit", feature, segments, drawType, tip, type);
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
          segmentStyles.push(segmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText().setText(label);
        styles.push(segmentStyles[count]);
        count++;
      });
    }
    if (label) {
      labelStyle.setGeometry(point);
      labelStyle.getText().setText(label);
      styles.push(labelStyle);
    }
    if (
      tip &&
      type === "Point" &&
      !modify.getOverlay().getSource().getFeatures().length
    ) {
      tipPoint = geometry;
      tipStyle.getText().setText(tip);
      styles.push(tipStyle);
    }
    return styles;
  }

  let draw: any; // global so we can remove it later

  function addInteraction(map1: Map) {
    const drawType = "Polygon";
    const activeTip = "Click to continue drawing the polygon";
    const idleTip = "Click to start drawing";
    let tip = idleTip;
    draw = new Draw({
      source: source,
      type: drawType,
      style: function (feature) {
        return styleFunction(feature, true, drawType, tip);
      },
      stopClick: true,
      freehandCondition: shiftKeyOnly,
    });

    draw.on("drawstart", function () {
      setStartedDrawing(true);
      setFinishedDrawing(false);
      if (!finishedDrawing) {
        source.clear();
        modify.setActive(false);
        tip = activeTip;
      }
    });
    draw.on("drawend", function (evt: any) {
      setFinishedDrawing(true);
      modifyStyle.setGeometry(tipPoint);
      modify.setActive(true);
      map1.once("pointermove", function () {
        modifyStyle.setGeometry(tipPoint);
      });
      map1.removeInteraction(draw);

      const x = evt.feature
        .clone()
        .getGeometry()
        .transform(WEB_APP_MAP_PROJECTION, API_MAP_PROJECTION)
        .getCoordinates()[0]
        .map((y: any) => y.toString().replace(",", " "))
        .toString();
      setCoordinates(`MULTIPOLYGON(((${x})))`);
      map1.addInteraction(modify);
      tip = idleTip;
      setFinishedDrawing(true);
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

  if (!startedDrawing) {
    return (
      <InfoNotification
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "50%",
          zIndex: 10,
          transform: "translate(50%,0)",
        }}
      >
        Click to create first point.
      </InfoNotification>
    );
  }
  if (finishedDrawing && !detailsVisible)
    return (
      <>
        <ButtonGroup
          sx={{
            position: "absolute",
            top: "20px",
            right: "50%",
            zIndex: 10,
            transform: "translate(50%,0)",
          }}
          // variant="contained"
          aria-label="draw mode options"
        >
          {/* <Button
            color="secondary"
            variant="contained"
            onClick={handleDrawMode}
          >
            Cancel
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </ButtonGroup>
        {/* <CreateField
          coordinates={coordinates}
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          afterAdd={() => {
            handleDrawMode();

            if (map) {
              map.removeLayer(vector);
            }
          }}
        /> */}
      </>
    );
  // return (
  //   <ButtonGroup
  //     sx={{
  //       position: "absolute",
  //       top: "20px",
  //       right: "50%",
  //       zIndex: 10,
  //       transform: "translate(50%,0)",
  //     }}
  //     // variant="contained"
  //     aria-label="draw mode options"
  //   >
  //     <Button color="secondary" variant="contained" onClick={handleDrawMode}>
  //       Cancel
  //     </Button>
  //   </ButtonGroup>
  // );
  return null;
};
export default DrawLayer;
