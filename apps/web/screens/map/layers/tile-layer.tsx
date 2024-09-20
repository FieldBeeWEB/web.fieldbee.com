import OLTileLayer from "ol/layer/Tile";
import * as React from "react";
import MapContext from "../utils/map-context";

const TileLayer = ({ source, zIndex = 0 }: any) => {
  const { map } = React.useContext(MapContext);
  React.useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);
  return null;
};
export default TileLayer;
