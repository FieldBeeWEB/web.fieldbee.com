import { Box } from "@fieldbee/ui/components";
import useMapContext from "./utils/use-map-context";

const MapWithoutProvider = ({ children }: any) => {
  const { mapRef } = useMapContext();
  return (
    <Box
      width="100%"
      height="100%"
      ref={mapRef}
      className="ol-map"
      position="relative"
    >
      {children}
    </Box>
  );
};
export default MapWithoutProvider;
