import { Field } from "@fieldbee/api";
import { ExpandBadge, SelectableBox, Stack } from "@fieldbee/ui";
import { Box, Collapse, Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import Image from "next/image";
import WKTFormat from "ol/format/WKT";
import { Vector as VectorSource } from "ol/source";
import * as React from "react";
import { PhrasesTranslationKeys } from "../../localization";
import VectorLayer from "../map/layers/vector-layer";
import MapContent from "../map/map-content";
import {
  API_MAP_PROJECTION,
  WEB_APP_MAP_PROJECTION,
} from "../map/utils/consts";
import { basicLabelStyle, basicLayerStyle } from "../map/utils/map-styles";
import useMapContext from "../map/utils/use-map-context";

interface Props {
  fields: Field[];
}

const style = [basicLayerStyle, basicLabelStyle];

const ImportedFieldsPreview: React.FunctionComponent<Props> = ({ fields }) => {
  const { map, handleSetCenterByExtent } = useMapContext();

  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [selectedField, setSelectedField] = React.useState<Field>(fields[0]);

  const handleExpanded = React.useCallback(() => {
    setExpanded((p) => !p);
  }, []);

  const handleGoToField = React.useCallback(
    (field: Field) => {
      setSelectedField(field);
      const { geom } = field.fieldGeometry;
      const poly = geom.substring(geom.indexOf(";") + 1);
      const extent = new WKTFormat()
        .readFeature(poly)
        .getGeometry()
        ?.getExtent();
      if (extent && map) {
        handleSetCenterByExtent(extent);
      }
    },
    [handleSetCenterByExtent, map],
  );

  React.useEffect(() => {
    if (map) {
      handleGoToField(fields[0]);
    }
  }, [map]);

  // console.log("selected", selectedField);
  return (
    <Stack width="70%" direction="row" spacing={0} height="100vh">
      <Collapse in={expanded} orientation="horizontal" collapsedSize={80}>
        <Box display="flex" flex={50} height="100%">
          <Stack overflow="scroll" width="100%" padding={1} spacing={1}>
            {fields.map((field) => (
              <SelectableBox
                key={field.UUID}
                selected={
                  (selectedField && selectedField.UUID === field.UUID) || false
                }
                onClick={() => {
                  handleGoToField(field);
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Image
                    src="/field-preview.png"
                    alt="field"
                    width={24}
                    height={24}
                  />

                  {expanded && (
                    <>
                      <Typography>{field.name}</Typography>
                      <Typography>{field.areaSi}</Typography>
                    </>
                  )}
                </Stack>
              </SelectableBox>
            ))}
          </Stack>
        </Box>
      </Collapse>
      <Box display="flex" flex={50} flexDirection="column" position="relative">
        <ExpandBadge
          onClick={() => handleExpanded()}
          expanded={expanded}
          expandedLabel={t(PhrasesTranslationKeys.HideDetails)}
          narrowedLabel={t(PhrasesTranslationKeys.ShowDetails)}
        />
        <MapContent measurementActive={false}>
          {fields.map((field) => {
            const { geom } = field.fieldGeometry;
            const poly = geom.substring(geom.indexOf(";") + 1);
            return (
              <VectorLayer
                key={field.UUID}
                source={
                  new VectorSource({
                    features: [
                      new WKTFormat().readFeature(poly, {
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
              />
            );
          })}
        </MapContent>
      </Box>
    </Stack>
  );
};

export default ImportedFieldsPreview;
