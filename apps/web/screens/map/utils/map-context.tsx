import { Map } from "ol";
import { Extent } from "ol/extent";
import * as React from "react";

export interface MapContextType {
  map: Map | null;
  mapRef: React.MutableRefObject<any> | null;
  fieldUriForEdit: string | null;
  handleSetFieldUri: (uri: string | null) => void;
  handleChangeCenter: (cen: number[]) => void;
  handleSetCenterByBbox: (bbox: string) => void;
  handleSetCenterByExtent: (extent: Extent) => void;
}

const MapContext: React.Context<MapContextType> =
  React.createContext<MapContextType>({
    map: null,
    mapRef: null,
    fieldUriForEdit: null,
    handleSetFieldUri: () => {},
    handleChangeCenter: () => {},
    handleSetCenterByBbox: () => {},
    handleSetCenterByExtent: () => {},
  });

export default MapContext;
