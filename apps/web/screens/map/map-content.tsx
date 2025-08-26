import * as olSource from "ol/source";
import * as React from "react";
import useAppContext from "../shared/providers/use-app-context";
import Layers from "./layers/layers";
import MeasureLayer from "./layers/measure-layer";
import TileLayer from "./layers/tile-layer";
import MapWithoutProvider from "./map-without-provider";

// const road = () => {
// 	return new olSource.XYZ({
// 		url: `https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`,
// 		maxZoom: 19,
// 	})
// }

// const satellite = () => {
// return new olSource.XYZ({
//   url: `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`,
//   maxZoom: 19,
// });
// };

// const terrain = () => {
// 	return new olSource.XYZ({
// 		url: `https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`,
// 		maxZoom: 19,
// 	})
// }

const normal = () => {
  return new olSource.OSM({
    maxZoom: 19,
  });
};

const satellite = () => {
  return new olSource.XYZ({
    url: `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`,
    maxZoom: 19,
  });
};

const dark = () => {
  return new olSource.XYZ({
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
    maxZoom: 19,
  });
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
        {layer === "normal" && <TileLayer source={normal()} zIndex={0} />}
        {layer === "satellite" && <TileLayer source={satellite()} zIndex={0} />}
        {layer === "dark" && <TileLayer source={dark()} zIndex={0} />}
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
