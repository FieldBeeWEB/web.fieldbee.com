import {
  Crop,
  MappingAttrs,
  MeasurementUnit,
  OrganizationFieldCategory,
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
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { toast } from "../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../localization";

const importFieldsValidationSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  area: Yup.string(),
  areaUnit: Yup.string(),
  group: Yup.string(),
  crop: Yup.string(),
});

export type ImportFieldsFormSchema = Yup.InferType<
  typeof importFieldsValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: ImportFieldsFormSchema) => void;
  handleCancel: () => void;
  crops: [Crop] | undefined;
  groups: [OrganizationFieldCategory] | undefined;
  areaUnits: [MeasurementUnit] | undefined;
  mappingAttributes: MappingAttrs;
};
const ImportFieldsForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  crops,
  groups,
  areaUnits,
  handleCancel,
  mappingAttributes,
}) => {
  const queryClient = useQueryClient();

  const [groupCreationActive, setGroupCreationActive] =
    React.useState<boolean>(false);
  const [newGroup, setNewGroup] = React.useState<string>("");
  const { mutateAsync: addCategory, isLoading: isLoadingAddCategory } =
    useAddOrganizationFieldCategory();

  const keys = Object.keys(mappingAttributes);
  const attributes = Object.keys(mappingAttributes)
    .map((index, ind) => {
      let attribute = mappingAttributes[index];
      return { value: attribute, key: keys[ind] };
    })
    .filter((x) => x.value && x.value.length > 0);
  const { control, handleSubmit, setValue } = useForm<ImportFieldsFormSchema>({
    defaultValues: {
      name: "",
      description: "",
      area: "",
      areaUnit: areaUnits ? areaUnits[0].uri : "",
      group: "",
      crop: "",
    },
    resolver: yupResolver(importFieldsValidationSchema),
  });

  const handleAddCategory = React.useCallback(async () => {
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
  }, [addCategory, newGroup, queryClient, setValue]);

  return (
    <Stack width="100%" overflow="auto">
      <Controller
        name="name"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormControl error={!!(error && error.message)} variant="outlined">
            <InputLabel id="select-field-name-label">
              {t(PhrasesTranslationKeys.FieldName)}
            </InputLabel>
            <Select
              labelId="select-field-name-label"
              id="select-field-name"
              value={value}
              label="Field name"
              onChange={onChange}
              onBlur={onBlur}
            >
              {attributes &&
                attributes.map((att) => (
                  <MenuItem key={att.key} value={att.key}>
                    {att.value}
                  </MenuItem>
                ))}
            </Select>
            {error && (
              <FormHelperText id="field-name-error-text">
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormControl error={!!(error && error.message)} variant="outlined">
            <InputLabel id="select-field-description-label">
              {t(SingleWordsTranslationKeys.Description)}
            </InputLabel>
            <Select
              labelId="select-field-description-label"
              id="select-field-description"
              value={value}
              label={t(SingleWordsTranslationKeys.Description)}
              onChange={onChange}
              onBlur={onBlur}
            >
              {attributes &&
                attributes.map((att) => (
                  <MenuItem key={att.key} value={att.key}>
                    {att.value}
                  </MenuItem>
                ))}
            </Select>
            {error && (
              <FormHelperText id="field-description-error-text">
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="area"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormControl error={!!(error && error.message)} variant="outlined">
            <InputLabel id="select-field-area-label">
              {t(SingleWordsTranslationKeys.Area)}
            </InputLabel>
            <Select
              labelId="select-field-area-label"
              id="select-field-area"
              value={value}
              label={t(SingleWordsTranslationKeys.Area)}
              onChange={onChange}
              onBlur={onBlur}
            >
              {attributes &&
                attributes.map((att) => (
                  <MenuItem key={att.key} value={att.key}>
                    {att.value}
                  </MenuItem>
                ))}
            </Select>
            {error && (
              <FormHelperText id="field-area-error-text">
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {areaUnits && (
        <Controller
          name="areaUnit"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <InputLabel id="select-area-unit-label">
                {t(PhrasesTranslationKeys.AreaUnit)}
              </InputLabel>
              <Select
                labelId="select-area-unit-label"
                id="select-area-unit"
                value={value}
                label={t(PhrasesTranslationKeys.AreaUnit)}
                onChange={onChange}
                onBlur={onBlur}
              >
                {areaUnits.map((areaUnit) => (
                  <MenuItem key={areaUnit.name} value={areaUnit.uri}>
                    {t(areaUnit.code)}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText id="area-unit-error-text">
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}
      {groups && (
        <Controller
          name="group"
          control={control}
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
                disabled={groupCreationActive}
              >
                <MenuItem disabled value="">
                  <em>{t(SingleWordsTranslationKeys.Parameters)}</em>
                </MenuItem>
                {attributes &&
                  attributes.map((att) => (
                    <MenuItem key={att.key} value={att.key}>
                      {att.key}
                    </MenuItem>
                  ))}
                <MenuItem disabled value="">
                  <em>{t(SingleWordsTranslationKeys.Existing)}</em>
                </MenuItem>
                <MenuItem value="">
                  {t(PhrasesTranslationKeys.WithoutGroup)}
                </MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.name} value={group.uri}>
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
        <Stack direction="column" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setGroupCreationActive(false);
            }}
          >
            {t(SingleWordsTranslationKeys.Cancel)}
          </Button>
          <Input
            label={t(PhrasesTranslationKeys.CreateGroup)}
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder={t(PhrasesTranslationKeys.CreateGroup).toString()}
          />
          <Button onClick={handleAddCategory} loading={isLoadingAddCategory}>
            {t(PhrasesTranslationKeys.CreateGroup)}
          </Button>
        </Stack>
      )}

      {crops && (
        <Controller
          name="crop"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <InputLabel id="select-crop-label">Crop</InputLabel>
              <Select
                labelId="select-crop-label"
                id="select-crop"
                value={value}
                label="Crop"
                onChange={onChange}
                onBlur={onBlur}
              >
                <MenuItem disabled value="">
                  <em>{t(SingleWordsTranslationKeys.Parameters)}</em>
                </MenuItem>
                {attributes &&
                  attributes.map((att) => (
                    <MenuItem key={att.key} value={att.key}>
                      {att.key}
                    </MenuItem>
                  ))}
                <MenuItem disabled value="">
                  <em>{t(SingleWordsTranslationKeys.Existing)}</em>
                </MenuItem>
                <MenuItem value="">
                  {t(PhrasesTranslationKeys.WithoutCrop)}
                </MenuItem>
                {crops.map((crop) => (
                  <MenuItem key={crop.name} value={crop.uri}>
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
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Button variant="outlined" onClick={handleCancel}>
          {t(SingleWordsTranslationKeys.Cancel)}
        </Button>
        <Button
          fullWidth
          onClick={handleSubmit(onSubmit)}
          size="large"
          loading={loading}
        >
          {t(PhrasesTranslationKeys.ImportFields)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ImportFieldsForm;
