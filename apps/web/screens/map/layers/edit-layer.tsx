import { FieldWithGeometryResponse } from "@fieldbee/api";
import { Button } from "@fieldbee/ui";
import { ButtonGroup } from "@fieldbee/ui/components";
import { Map } from "ol";
import { shiftKeyOnly } from "ol/events/condition";
import GeoJSON from "ol/format/GeoJSON";
import { LineString, Point } from "ol/geom";
import { Modify } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import * as React from "react";
import { useEffect } from "react";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "../utils/consts";
import { formatArea, formatLength } from "../utils/map-helpers";
import {
  drawStyle,
  labelStyle,
  segmentStyle,
  segmentStyles,
  tipStyle,
} from "../utils/map-styles";
import useMapContext from "../utils/use-map-context";

interface Props {
  field: FieldWithGeometryResponse;
  handleContinueClick: () => void;
  handleChangeCoordinates: (coord: string) => void;
}

const EditLayer: React.FunctionComponent<Props> = ({
  field,
  handleContinueClick,
  handleChangeCoordinates,
}) => {
  const { map, handleSetCenterByBbox } = useMapContext();

  let tipPoint: any;

  const x = JSON.parse(field.geometryJson);

  const source = new VectorSource({
    features: [
      new GeoJSON().readFeature(x, {
        dataProjection: API_MAP_PROJECTION,
        featureProjection: WEB_APP_MAP_PROJECTION,
      }),
    ],
  });

  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      return styleFunction(feature, true, "Polygon", "Click to edit");
    },
    zIndex: 100,
  });
  const modify = new Modify({
    source: source,
    style: function (feature) {
      return styleFunction(feature, true, "Polygon", "Click to edit");
    },
    deleteCondition: shiftKeyOnly,
  });
  modify.on("modifyend", function (evt: any) {
    const arr = evt.features
      .getArray()[0]
      .clone()
      .getGeometry()
      .transform(WEB_APP_MAP_PROJECTION, API_MAP_PROJECTION)
      .getCoordinates()[0];
    const stringCoordinates = arr[0]
      .map((y: number[]) => y.toString().replace(",", " "))
      .toString();
    handleChangeCoordinates(`MULTIPOLYGON(((${stringCoordinates})))`);
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
    if (type === "Polygon") {
      point = geometry.getInteriorPoint();
      label = formatArea(geometry);
      line = new LineString(geometry.getCoordinates()[0]);
      // const poly = new MultiPolygon(geometry.getCoordinates());
    } else if (type === "LineString") {
      point = new Point(geometry.getLastCoordinate());
      label = formatLength(geometry);
      line = geometry;
    } else if (type == "MultiPolygon") {
      point = geometry.getPolygon(0).getInteriorPoint();
      // console.log("multi point", point);
      label = formatArea(geometry);
      // console.log("multi label", label);
      line = new LineString(geometry.getPolygon(0).getCoordinates()[0]);
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
    modify.setActive(true);
    map1.addInteraction(modify);
  }

  React.useEffect(() => {
    if (map) {
      handleSetCenterByBbox(field.bbox);
    }
  }, [map]);

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
        aria-label="edit mode options"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </ButtonGroup>
    </>
  );
};
export default EditLayer;
