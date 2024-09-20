import {
  queryKeys,
  useGetOrganizationFieldsWithGeometry,
  useQueryClient,
  useUpdateFieldBoundaries,
} from "@fieldbee/api";
import { ExpandBadge, MapButton, MapButtons, Stack } from "@fieldbee/ui";
import { Box, Collapse } from "@fieldbee/ui/components";
import { SquareFoot } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../config/page-paths";
import { toast } from "../../helpers/toast";
import { PhrasesTranslationKeys } from "../../localization";
import AuthedLayout from "../authed-layout";
import FieldsLayer from "../map/fields-layer/fields-layers";
import EditLayer from "../map/layers/edit-layer";
import MapContent from "../map/map-content";
import MapProvider from "../map/utils/map-provider";
import LayerSelectorWidget from "../map/widgets/layer-selector-widget";
import EditFieldBoundariesForm, {
  EditFieldBoundariesFormSchema,
} from "./edit-field-boundaries-form";

export default function EditField() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { uri } = router.query;
  const { data } = useGetOrganizationFieldsWithGeometry(
    uri ? [uri.toString()] : null
  );
  const [coordinates, setCoordinates] = React.useState<string>("");

  const { mutateAsync: updateBoundaries, isLoading } =
    useUpdateFieldBoundaries();
  const field = data && data[0];

  const handleChangeCoordinates = (coord: string) => {
    setCoordinates(coord);
  };
  const onAddField = async (values: EditFieldBoundariesFormSchema) => {
    await updateBoundaries(
      {
        description: values.description,
        geometry: { wkt: coordinates },
        name: values.name,
        uri: uri?.toString() || "",
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.getField(uri?.toString() || ""),
          });
          await queryClient.refetchQueries({
            queryKey: queryKeys.getFieldsWithGeometry(
              uri ? [uri.toString()] : []
            ),
          });
          router.push(
            `${pagePaths.authPages.field("1", uri?.toString() || "")}`
          );
          toast.success("Field updated successfully");
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      }
    );
  };

  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [measurementActive, setMeasurementActive] =
    React.useState<boolean>(false);

  const handleExpanded = React.useCallback(() => {
    setExpanded((p) => !p);
  }, []);

  const handleMeasurement = React.useCallback(() => {
    setMeasurementActive((p) => !p);
  }, []);

  return (
    <AuthedLayout>
      <MapProvider>
        <Stack direction="column">
          <Stack width="100%" height="100vh" direction="row" spacing={0}>
            <Collapse in={expanded} orientation="horizontal">
              {field && (
                <EditFieldBoundariesForm
                  loading={isLoading}
                  onSubmit={onAddField}
                  name={field.name}
                  description={field.description}
                  handleCancel={() => router.back()}
                />
              )}
            </Collapse>
            <Box
              display="flex"
              flex={100}
              flexDirection="column"
              position="relative"
            >
              <MapButtons>
                <MapButton
                  active={measurementActive}
                  onClick={() => handleMeasurement()}
                >
                  <SquareFoot />
                </MapButton>
                <LayerSelectorWidget />
              </MapButtons>
              <ExpandBadge
                onClick={() => handleExpanded()}
                expanded={expanded}
                expandedLabel="Hide details"
                narrowedLabel="Show details"
              />
              <MapContent measurementActive={measurementActive}>
                {uri && (
                  <FieldsLayer
                    fieldUris={[uri.toString()]}
                    measurementActive={measurementActive}
                  />
                )}
                {data && (
                  <EditLayer
                    field={data[0]}
                    handleContinueClick={handleExpanded}
                    handleChangeCoordinates={handleChangeCoordinates}
                  />
                )}
              </MapContent>
            </Box>
          </Stack>
        </Stack>
      </MapProvider>
    </AuthedLayout>
  );
}
