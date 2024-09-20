import { FieldsResponse } from "@fieldbee/api";
import * as React from "react";
import FieldsLayer from "../map/fields-layer/fields-layers";
import useMapContext from "../map/utils/use-map-context";

interface Props {
  field: FieldsResponse;
  measurementActive: boolean;
}

const FieldPreview: React.FunctionComponent<Props> = ({
  field,
  measurementActive,
}) => {
  const { map, handleSetCenterByBbox } = useMapContext();

  React.useEffect(() => {
    if (map) {
      handleSetCenterByBbox(field.bbox);
    }
  }, [map]);

  return (
    <FieldsLayer
      fieldUris={[field.uri]}
      measurementActive={measurementActive}
    />
  );
};

export default FieldPreview;
