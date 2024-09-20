import {
  queryKeys,
  useAddField,
  useGetCrops,
  useGetOrganizationFieldsCategories,
  useQueryClient,
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
import CreateFieldForm, {
  CreateFieldFormSchema,
} from "../map/create-field/create-field-form";
import DrawLayer from "../map/layers/draw-layer";
import MapContent from "../map/map-content";
import MapProvider from "../map/utils/map-provider";
import LayerSelectorWidget from "../map/widgets/layer-selector-widget";

export default function AddField() {
  //   const { isDrawMode } = useAppContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [coordinates, setCoordinates] = React.useState<string>("");

  const { data: cropsData } = useGetCrops();
  const { data: groupsData } = useGetOrganizationFieldsCategories();
  const { mutateAsync: addField, isLoading } = useAddField();

  const handleChangeCoordinates = (coord: string) => {
    setCoordinates(coord);
  };
  const onAddField = async (values: CreateFieldFormSchema) => {
    await addField(
      {
        category: values.group || "",
        crop: values.crop || "",
        name: values.name,
        description: "",
        geometry: coordinates,
      },
      {
        onSuccess: async (data) => {
          if (data.success) {
            await queryClient.refetchQueries({
              queryKey: queryKeys.getFields,
            });
            // afterAdd();
            toast.success(t(PhrasesTranslationKeys.FieldCreatedSuccessfully));
            // handleClose();
            router.push(
              `${pagePaths.authPages.field(
                data.fldID ? data.fldID.toString() : "",
                data.uri || ""
              )}`
            );
          } else if (data.error) {
            if (data.error === "exists") {
              toast.error("Field with this name already exists");
              //   router.push(pagePaths.authPages.fields);
            } else {
              toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
              router.push(pagePaths.authPages.fields);

              //   afterAdd();
              //   handleClose();
            }
          }
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
  console.log("COORDFINATES ADD FIELD", coordinates);

  return (
    <AuthedLayout>
      <MapProvider>
        <Stack direction="column">
          <Stack width="100%" height="100vh" direction="row" spacing={0}>
            <Collapse in={expanded} orientation="horizontal">
              <CreateFieldForm
                loading={isLoading}
                onSubmit={onAddField}
                crops={cropsData}
                groups={groupsData}
                handleClose={() => {
                  router.push(pagePaths.authPages.fields);
                }}
                submitDisabled={coordinates.length === 0}
              />
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
                <DrawLayer
                  coordinates={coordinates}
                  handleChangeCoordinates={handleChangeCoordinates}
                  detailsVisible={expanded}
                  handleContinueClick={handleExpanded}
                />
              </MapContent>
            </Box>
          </Stack>
        </Stack>
      </MapProvider>
    </AuthedLayout>
  );
}
