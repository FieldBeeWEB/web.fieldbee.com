import {
  MeasurementType,
  queryKeys,
  SaveFieldsResult,
  useGetCrops,
  useGetMeasurementUnits,
  useGetOrganizationFieldsCategories,
  useQueryClient,
  useSaveFields,
} from "@fieldbee/api";
import { Stack } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import { useRouter } from "next/router";
import { pagePaths } from "../../config/page-paths";
import { toast } from "../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
} from "../../localization";
import AuthedLayout from "../authed-layout";
import MapProvider from "../map/utils/map-provider";
import useAppContext from "../shared/providers/use-app-context";
import ImportFieldsForm, { ImportFieldsFormSchema } from "./import-fields-form";
import ImportedFieldsPreview from "./imported-fields-preview";

const ImportFields = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: cropsData } = useGetCrops();
  const { data: groupsData } = useGetOrganizationFieldsCategories();
  const { data: areaUnitsData } = useGetMeasurementUnits(MeasurementType.AREA);

  const {
    importSessionResponse: sessionResponse,
    handleSetImportSessionResponse,
  } = useAppContext();
  const { mutateAsync: saveFields } = useSaveFields();

  const handleCancel = () => {
    handleSetImportSessionResponse(null);
    router.push(pagePaths.authPages.map);
  };

  const onImportSubmitted = async (values: ImportFieldsFormSchema) => {
    await saveFields(
      {
        importProcess: true,
        sesUri: sessionResponse?.sesUri || "",
        data: {
          allArea: 0,
          fields: sessionResponse?.data.fields || [],
          mapped: {
            area: values.area || "",
            crop: values.crop || "",
            description: values.description || "",
            group: values.group || "",
            mu: values.areaUnit || "",
            name: values.name || "",
          },
        },
      },
      {
        onSuccess: async (data) => {
          if (data.result === SaveFieldsResult.OK) {
            toast.success(t(PhrasesTranslationKeys.FieldsImportedSuccessfully));
            await queryClient.refetchQueries({
              queryKey: queryKeys.getFields,
            });
            router.push(pagePaths.authPages.fields);
          } else {
            toast.error(t(PhrasesTranslationKeys.CannotImportFields));
            router.push(pagePaths.authPages.map);
            handleCancel();
          }
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      }
    );
  };

  return (
    <AuthedLayout>
      {sessionResponse && (
        <Stack direction="row" height="100vh">
          <Stack
            width="30%"
            direction="column"
            padding={1}
            spacing={1}
            sx={(theme) => ({
              borderRight: `1px solid ${theme.palette.secondary_shades[300]}`,
            })}
          >
            <Stack
              direction="column"
              spacing={1}
              position="sticky"
              top={1}
              left={1}
            >
              <Typography
                variant="subtitle2"
                component="h1"
                color="primary"
                textTransform="capitalize"
              >
                {t(PhrasesTranslationKeys.ImportFields)}
              </Typography>
            </Stack>
            <Typography variant="subtitle2">
              {t(SentencesTranslationKeys.PickInformationSequence)}
            </Typography>
            <ImportFieldsForm
              loading={false}
              onSubmit={onImportSubmitted}
              handleCancel={handleCancel}
              crops={cropsData}
              groups={groupsData}
              areaUnits={areaUnitsData}
              mappingAttributes={sessionResponse.data.fields[0].mappingAttrs}
            />
          </Stack>
          <MapProvider>
            <ImportedFieldsPreview fields={sessionResponse.data.fields} />
          </MapProvider>
        </Stack>
      )}
    </AuthedLayout>
  );
};

export default ImportFields;
