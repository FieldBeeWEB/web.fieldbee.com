import * as olSource from "ol/source";
import * as React from "react";
import useAppContext from "../shared/providers/use-app-context";
import Layers from "./layers/layers";
import MeasureLayer from "./layers/measure-layer";
import TileLayer from "./layers/tile-layer";
import MapWithoutProvider from "./map-without-provider";

const osm = () => {
  return new olSource.OSM();
};

interface Props {
  measurementActive: boolean;
  children?: React.ReactNode;
  fieldUris?: string[];
}

const MapContent: React.FunctionComponent<Props> = ({
  measurementActive,
  children,
  fieldUris,
}) => {
  const { layer } = useAppContext();

  // console.log("selected field", selectedField);
  // const { data } = useGetOrganizationFieldsWithGeometry(
  //   selectedField ? [selectedField.uri] : null
  // );

  return (
    <MapWithoutProvider>
      <Layers>
        {layer === "satellite" && <TileLayer source={osm()} zIndex={0} />}
        {layer === "road" && <TileLayer source={osm()} zIndex={0} />}
        {layer === "terrain" && <TileLayer source={osm()} zIndex={0} />}
        {children}
        {/* {selectedField && isEditMode && data && (
          <EditLayer field={data[0]} fieldUris={fieldUris || []} />
        )} */}
        {measurementActive && <MeasureLayer />}
      </Layers>
    </MapWithoutProvider>
  );
};
export default MapContent;
