import OLVectorLayer from "ol/layer/Vector";
import React from "react";
import MapContext from "../utils/map-context";

const VectorLayer = ({ source, style, zIndex = 0, properties }: any) => {
  const { map } = React.useContext(MapContext);
  React.useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
      properties,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default VectorLayer;
