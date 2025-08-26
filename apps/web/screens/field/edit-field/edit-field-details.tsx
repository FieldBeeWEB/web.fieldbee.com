import {
  FieldsResponse,
  MeasurementType,
  queryKeys,
  useEditField,
  useGetCrops,
  useGetOrganizationFieldsCategories,
  useQueryClient,
} from "@fieldbee/api";
import { t } from "i18next";
import { getMeasurementInSi } from "../../../helpers/format-area";
import { toast } from "../../../helpers/toast";
import { PhrasesTranslationKeys } from "../../../localization";
import EditFieldForm, { EditFieldFormSchema } from "./edit-field-form";

interface Props {
  field: FieldsResponse;
}

export default function EditFieldDetails({ field }: Props) {
  const queryClient = useQueryClient();

  const { data: cropsData } = useGetCrops();
  const { data: groupsData } = useGetOrganizationFieldsCategories();
  const { mutateAsync: editField, isLoading } = useEditField();

  const onEditField = async (values: EditFieldFormSchema) => {
    await saveField(values);
  };

  const saveField = async (values: EditFieldFormSchema) => {
    await editField(
      {
        uri: field.uri,
        areaSi: values?.area
          ? getMeasurementInSi(values.area, MeasurementType.AREA)
          : 0,
        category: values.group || null,
        name: values.name,
        description: values.description || "",
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.getField(field.uri),
          });
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      },
    );
  };

  return (
    <EditFieldForm
      loading={isLoading}
      onSubmit={onEditField}
      crops={cropsData}
      groups={groupsData}
      field={field}
    />
  );
}
