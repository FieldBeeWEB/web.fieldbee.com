import { Map, View as OlView } from "ol";
import { defaults as defaultControls } from "ol/control.js";
import { Extent } from "ol/extent";
import { fromLonLat, transform } from "ol/proj";
import * as React from "react";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "./consts";
import MapContext from "./map-context";

const MapProvider = ({ children }: any) => {
  const zoom = 19;
  const mapRef = React.useRef<any>();
  const [center, setCenter] = React.useState<number[]>([18.6935328, 50.293468]);
  const [map, setMap] = React.useState<Map | null>(null);
  const [fieldUriForEdit, setFieldUriForEdit] = React.useState<string | null>(
    null
  );

  const handleSetFieldUri = (uri: string | null) => {
    setFieldUriForEdit(uri);
  };

  const handleChangeCenter = (cen: number[]) => {
    setCenter(cen);
  };

  React.useEffect(() => {
    let options = {
      view: new OlView({ zoom, center: fromLonLat(center) }),
      controls: defaultControls(),
      overlays: [],
      projection: WEB_APP_MAP_PROJECTION,
    };
    let mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  React.useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  React.useEffect(() => {
    if (!map) return;
    map.getView().setCenter(fromLonLat(center));
  }, [center]);

  const handleSetCenterByBbox = (bbox: string) => {
    const coords = bbox.split(",");
    const center = {
      bounds: [
        parseFloat(coords[0]),
        parseFloat(coords[1]),
        parseFloat(coords[2]),
        parseFloat(coords[3]),
      ],
      lat:
        parseFloat(coords[1]) +
        (parseFloat(coords[3]) - parseFloat(coords[1])) / 2,
      lon:
        parseFloat(coords[2]) +
        (parseFloat(coords[0]) - parseFloat(coords[2])) / 2,
      zoom: 10,
    };

    if (isNaN(center.lat) || isNaN(center.lon)) {
      console.log("olMap: updateMapCenter: invalid coords");
      return;
    }

    // transformed coordinates
    const tc = transform(
      [parseFloat(coords[0]), parseFloat(coords[1])],
      API_MAP_PROJECTION,
      WEB_APP_MAP_PROJECTION
    ).concat(
      transform(
        [parseFloat(coords[2]), parseFloat(coords[3])],
        API_MAP_PROJECTION,
        WEB_APP_MAP_PROJECTION
      )
    );

    // maximizing bbox
    const dx = (tc[2] - tc[0]) * 0.25;
    const dy = (tc[3] - tc[1]) * 0.25;
    tc[0] = tc[0] - dx;
    tc[1] = tc[1] - dy;
    tc[2] = tc[2] + dx;
    tc[3] = tc[3] + dy;
    if (map) {
      map.getView().fit(tc, { size: map.getSize() });
    }

    handleChangeCenter([center.lon, center.lat]);
  };
  const handleSetCenterByExtent = (extent: Extent) => {
    const center = {
      bounds: [extent[0], extent[1], extent[2], extent[3]],
      lat: extent[1] + (extent[3] - extent[1]) / 2,
      lon: extent[2] + (extent[0] - extent[2]) / 2,
      zoom: 10,
    };

    if (isNaN(center.lat) || isNaN(center.lon)) {
      console.log("olMap: updateMapCenter: invalid coords");
      return;
    }

    // transformed coordinates
    const tc = transform(
      [extent[0], extent[1]],
      API_MAP_PROJECTION,
      WEB_APP_MAP_PROJECTION
    ).concat(
      transform(
        [extent[2], extent[3]],
        API_MAP_PROJECTION,
        WEB_APP_MAP_PROJECTION
      )
    );

    // maximizing bbox
    const dx = (tc[2] - tc[0]) * 0.25;
    const dy = (tc[3] - tc[1]) * 0.25;
    tc[0] = tc[0] - dx;
    tc[1] = tc[1] - dy;
    tc[2] = tc[2] + dx;
    tc[3] = tc[3] + dy;
    if (map) {
      map.getView().fit(tc, { size: map.getSize() });
    }
    handleChangeCenter([center.lon, center.lat]);
  };

  return (
    <MapContext.Provider
      value={{
        map,
        mapRef,
        fieldUriForEdit,
        handleSetFieldUri,
        handleChangeCenter,
        handleSetCenterByBbox,
        handleSetCenterByExtent,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
export default MapProvider;
