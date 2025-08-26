import {
  MeasurementType,
  useGetOrganizationFieldsWithGeometry,
} from "@fieldbee/api";
import { Button, Stack, theme } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import { useRouter } from "next/router";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import * as React from "react";
import { useContext } from "react";
import { pagePaths } from "../../../config/page-paths";
import { getMeasurementString } from "../../../helpers/format-area";
import { PhrasesTranslationKeys } from "../../../localization";
import VectorLayer from "../layers/vector-layer";
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from "../utils/consts";
import MapContext from "../utils/map-context";
import {
  defaultLabelStyle,
  defaultSatelliteLayerStyle,
} from "../utils/map-styles";

const style = [defaultSatelliteLayerStyle, defaultLabelStyle];

interface Props {
  fieldUris: string[];
  measurementActive: boolean;
  isEditMode?: boolean;
}

type ClickedField = {
  uri: string;
  name: string;
  areaSi: number;
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

  const router = useRouter();
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
      const pixel = evt.pixel;
      setClickedField({
        uri: properties.uri,
        name: properties.name,
        areaSi: properties.areaSi,
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
          spacing={0}
          sx={{
            top: clickedField.top,
            left: clickedField.left,
            position: "absolute",
            zIndex: 1000,
            background: theme.palette.elevation_overlay["08dp"],
            padding: "16px",
            borderRadius: "4px",
            boxShadow: "0px 5px 5px 0px #00000033",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.surface_emphasis.high}
            textAlign="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {clickedField.name} |{" "}
            {getMeasurementString(clickedField.areaSi, MeasurementType.AREA)}
          </Typography>
          <Button
            size="medium"
            variant="text"
            sx={{
              color: theme.palette.primary.main,
              textTransform: "uppercase",
            }}
            onClick={() => {
              router.push(pagePaths.authPages.field("1", clickedField.uri));
            }}
          >
            {t(PhrasesTranslationKeys.GoToFieldDetails).toString()}
          </Button>
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
              defaultLabelStyle
                .getText()
                .setText(
                  `${field.name} | ${getMeasurementString(field.areaSi, MeasurementType.AREA)}`,
                );
              return style;
            }}
            properties={{
              uri: field.uri,
              name: field.name,
              areaSi: field.areaSi,
            }}
            zIndex={10}
          />
        );
      })}
    </>
  );
}
