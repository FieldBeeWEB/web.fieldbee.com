import * as React from "react";
import MapContext from "./map-context";

const useMapContext = () => React.useContext(MapContext);

export default useMapContext;
