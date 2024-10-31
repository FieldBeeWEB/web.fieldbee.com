import { useGetOrganizationFieldsWithGeometry } from "@fieldbee/api";
import { Stack } from "@fieldbee/ui";
import { Link, Typography } from "@fieldbee/ui/components";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import * as React from "react";
import { useContext } from "react";
import { pagePaths } from "../../../config/page-paths";
import VectorLayer from "../layers/vector-layer";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "../utils/consts";
import MapContext from "../utils/map-context";
import { basicLabelStyle, basicLayerStyle } from "../utils/map-styles";

const style = [basicLayerStyle, basicLabelStyle];

interface Props {
  fieldUris: string[];
  measurementActive: boolean;
  isEditMode?: boolean;
}

type ClickedField = {
  uri: string;
  name: string;
  top: string;
  left: string;
};

export default function FieldsLayer({
  fieldUris,
  measurementActive,
  isEditMode = false,
}: Props) {
  const [clickedField, setClickedField] = React.useState<ClickedField | null>(
    null,
  );
  // const { isEditMode } = useAppContext();
  const { map } = useContext(MapContext);

  const { data } = useGetOrganizationFieldsWithGeometry(fieldUris);

  map?.on("click", function (evt) {
    if (measurementActive && clickedField) {
      setClickedField(null);
    }
    if (isEditMode && clickedField) {
      setClickedField(null);
    }
    const layer = map.forEachFeatureAtPixel(
      evt.pixel,
      function (feature, layer) {
        return layer;
      },
    );
    if (layer) {
      const properties = layer.getProperties();
      // console.log("layer", layer.getProperties());
      const pixel = evt.pixel;
      setClickedField({
        uri: properties.uri,
        name: properties.name,
        left: pixel[0] + "px",
        top: pixel[1] + "px",
      });
    } else {
      setClickedField(null);
    }
  });

  if (!data) return null;
  return (
    <>
      {clickedField && !measurementActive && (
        <Stack
          direction="column"
          spacing={2}
          sx={{
            top: clickedField.top,
            left: clickedField.left,
            position: "absolute",
            zIndex: 1000,
            background: "rgb(21, 21, 21)",
            width: "100px",
            padding: "16px",
            borderRadius: "16px",
          }}
        >
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {clickedField.name}
          </Typography>
          <Link href={`${pagePaths.authPages.field("1", clickedField.uri)}`}>
            Go to field
          </Link>
        </Stack>
      )}
      {data.map((field) => {
        const x = JSON.parse(field.geometryJson);
        return (
          <VectorLayer
            key={field.uri}
            source={
              new VectorSource({
                features: [
                  new GeoJSON().readFeature(x, {
                    dataProjection: API_MAP_PROJECTION,
                    featureProjection: WEB_APP_MAP_PROJECTION,
                  }),
                ],
              })
            }
            style={() => {
              basicLabelStyle.getText().setText(field.name);
              return style;
            }}
            properties={{
              uri: field.uri,
              name: field.name,
            }}
            zIndex={10}
          />
        );
      })}
    </>
  );
}
