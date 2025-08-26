import {
  Category,
  Crop,
  FieldsResponse,
  MeasurementType,
  queryKeys,
  useAddOrganizationFieldCategory,
  useQueryClient,
} from "@fieldbee/api";
import { Button, Input, Stack } from "@fieldbee/ui";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@fieldbee/ui/components";
import { Check } from "@fieldbee/ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { getMeasurementInCurrentUnit } from "../../../helpers/format-area";
import { toast } from "../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

const editFieldValidationSchema = Yup.object({
  name: Yup.string().required(),
  group: Yup.string(),
  crop: Yup.string(),
  area: Yup.number(),
  description: Yup.string(),
});

export type EditFieldFormSchema = Yup.InferType<
  typeof editFieldValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: EditFieldFormSchema) => void;
  crops: [Crop] | undefined;
  groups: [Category] | undefined;
  field: FieldsResponse;
};
const EditFieldForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  crops,
  groups,
  field,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [groupCreationActive, setGroupCreationActive] =
    React.useState<boolean>(false);
  const [newGroup, setNewGroup] = React.useState<string>("");
  const [newGroupError, setNewGroupError] = React.useState<null | string>(null);
  const { mutateAsync: addCategory, isLoading } =
    useAddOrganizationFieldCategory();

  const { control, handleSubmit, setValue } = useForm<EditFieldFormSchema>({
    defaultValues: {
      name: field.name,
      group: field.category?.uri || "",
      crop: field.crop?.uri || "",
      area:
        getMeasurementInCurrentUnit(field.areaSi, MeasurementType.AREA) ||
        undefined,
      description: field.description,
    },
    resolver: yupResolver(editFieldValidationSchema),
  });

  const handleAddCategory = React.useCallback(async () => {
    if (newGroup.length === 0) {
      setNewGroupError("Please enter group name");
    } else {
      const newGroupUri = `content://CATEGORY/${uuidv4()}`;
      await addCategory(
        {
          code: newGroup,
          name: newGroup,
          uri: newGroupUri,
        },
        {
          onSuccess: async () => {
            await queryClient.refetchQueries({
              queryKey: queryKeys.getFieldsCategories,
            });
            setValue("group", newGroupUri);
            setGroupCreationActive(false);
            setNewGroup("");
          },
          onError: () => {
            setGroupCreationActive(false);
            setNewGroup("");
            toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
          },
        },
      );
    }
  }, [addCategory, newGroup, queryClient, setValue]);

  return (
    <Stack width="calc(100% - 16px)" padding={1} spacing={2} mt={1}>
      <Controller
        name="name"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label={t(SingleWordsTranslationKeys.Name)}
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(SingleWordsTranslationKeys.Name).toString()}
          />
        )}
      />
      {groups && (
        <Controller
          name="group"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <InputLabel id="select-group-label">
                {t(SingleWordsTranslationKeys.Group)}
              </InputLabel>
              <Select
                labelId="select-group-label"
                id="select-group"
                value={value}
                label={t(SingleWordsTranslationKeys.Group)}
                onChange={onChange}
                onBlur={onBlur}
              >
                {groups.map((group) => (
                  <MenuItem key={group.uri} value={group.uri}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText id="group-error-text">
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}
      {!groupCreationActive ? (
        <Button
          onClick={() => {
            setGroupCreationActive(true);
            setNewGroup("");
          }}
        >
          {t(PhrasesTranslationKeys.CreateGroup)}
        </Button>
      ) : (
        <Stack
          direction="row"
          spacing="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="outlined"
            onClick={() => {
              setGroupCreationActive(false);
            }}
          >
            {t(SingleWordsTranslationKeys.Cancel)}
          </Button>
          <Input
            error={!!newGroupError}
            helperText={newGroupError}
            label={t(PhrasesTranslationKeys.CreateGroup)}
            value={newGroup}
            onChange={(e) => {
              if (newGroupError) {
                setNewGroupError(null);
              }
              setNewGroup(e.target.value);
            }}
            placeholder={t(PhrasesTranslationKeys.CreateGroup).toString()}
          />
          <Button onClick={handleAddCategory}>
            {t(PhrasesTranslationKeys.CreateGroup)}
          </Button>
        </Stack>
      )}

      {crops && (
        <Controller
          name="crop"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <InputLabel id="select-crop-label">
                {t(SingleWordsTranslationKeys.Crop)}
              </InputLabel>
              <Select
                labelId="select-crop-label"
                id="select-crop"
                value={value}
                label={t(SingleWordsTranslationKeys.Crop)}
                onChange={onChange}
                onBlur={onBlur}
              >
                {crops.map((crop) => (
                  <MenuItem key={crop.uri} value={crop.uri}>
                    {crop.name}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText id="crop-error-text">
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}
      <Controller
        name="area"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label={t(SingleWordsTranslationKeys.Area)}
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(SingleWordsTranslationKeys.Area).toString()}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label={t(SingleWordsTranslationKeys.Description)}
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(SingleWordsTranslationKeys.Description).toString()}
            multiline={true}
          />
        )}
      />
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
          fullWidth
        >
          {t(SingleWordsTranslationKeys.Cancel)}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          size="large"
          loading={loading}
          fullWidth
          startIcon={<Check />}
        >
          {t(SingleWordsTranslationKeys.Save)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditFieldForm;
