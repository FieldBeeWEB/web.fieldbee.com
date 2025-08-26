/* eslint-disable turbo/no-undeclared-env-vars */
import { format } from "date-fns";
import { transform } from "ol/proj";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "./consts";

const getFieldImageUri = (
  id: number,
  bBox: string,
  dimensions: number,
): string => {
  const coordinates = bBox
    .replace(/\s/g, "")
    .split(",")
    .map((x) => parseFloat(x));

  const newBbox1 = transform(
    coordinates.slice(0, 2),
    API_MAP_PROJECTION,
    WEB_APP_MAP_PROJECTION,
  );
  const newBbox2 = transform(
    coordinates.slice(2, 4),
    API_MAP_PROJECTION,
    WEB_APP_MAP_PROJECTION,
  );

  const newBbox = newBbox1.concat(newBbox2);

  var date = new Date();
  var params = {
    HEIGHT: dimensions,
    WIDTH: dimensions,
    BBOX: newBbox,
    VIEWPARAMS:
      "datepattern:dd.MM.yyyy HH24\\:MI\\:SS; timezone: at time zone '" +
      "GMT+0200" +
      "'; time: " +
      date.getTime() / 1000 +
      "" +
      ";day:" +
      format(date, "dd.MM.yyyy") +
      ";ids:0\\, " +
      id,
    LAYERS: "efarmer:field_crops_view",
    PROJECTION: "EPSG:900913",
    SRS: WEB_APP_MAP_PROJECTION,
    TRANSPARENT: "true",
    UNITS: "m",
    SERVICE: "WMS",
    REQUEST: "GetMap",
    VERSION: "1.1.1",
    EXCEPTIONS: "BLANK",
    FORMAT: "image/png",
  };
  const urlParamsString = new URLSearchParams(params as any).toString();
  return `${process.env.NEXT_PUBLIC_API_URL}/geo2/wms?${urlParamsString}`;
};

export default getFieldImageUri;
