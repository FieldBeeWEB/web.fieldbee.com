import { MeasurementType } from "@fieldbee/api";
import { Geometry } from "ol/geom";
import { getArea, getLength } from "ol/sphere.js";
import { getMeasurementString } from "../../../helpers/format-area";

export const normalizeFieldBBox = function (coordinatesStr: string) {
  return coordinatesStr.replace(", ", ",");
};

export const getBboxUnion = function (bboxes: string[]) {
  let minX = [];
  let maxX = [];
  let minY = [];
  let maxY = [];
  for (let i = 0; i < bboxes.length; i++) {
    let bbox = bboxes[i];
    if (!bbox) continue;

    let coordsStr = bbox.split(",");
    minX.push(parseFloat(coordsStr[0].trim()));
    minY.push(parseFloat(coordsStr[1].trim()));
    maxX.push(parseFloat(coordsStr[2].trim()));
    maxY.push(parseFloat(coordsStr[3].trim()));
  }
  let comapreFunc = function (a: any, b: any) {
    var res = null;
    if (a < b) res = -1;
    else if (a > b) res = 1;
    else res = 0;

    return res;
  };
  minX.sort(comapreFunc);
  maxX.sort(comapreFunc);
  maxX.reverse();
  minY.sort(comapreFunc);
  maxY.sort(comapreFunc);
  maxY.reverse();
  var bboxStr = minX[0] + "," + minY[0] + "," + maxX[0] + "," + maxY[0];
  return bboxStr;
};

export const formatLength = function (line: Geometry) {
  const length = getLength(line);
  // let output;
  // if (length > 100) {
  //   output = Math.round((length / 1000) * 100) / 100 + " km";
  // } else {
  //   output = Math.round(length * 100) / 100 + " m";
  // }
  // return output;

  const formatted = getMeasurementString(length, MeasurementType.LENGTH);
  if (formatted) {
    return formatted;
  } else {
    return "";
  }
};

export const formatArea = function (polygon: Geometry) {
  const area = getArea(polygon);
  // let output;
  // output = Math.round(area * 100 * 0.0001) / 100 + " ha";
  // return output;

  const formatted = getMeasurementString(area, MeasurementType.AREA);
  if (formatted) {
    return formatted;
  } else {
    return "";
  }
};
