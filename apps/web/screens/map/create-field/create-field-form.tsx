import { Category, Crop } from "@fieldbee/api";
import { Button, Input, Stack } from "@fieldbee/ui";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@fieldbee/ui/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

const createFieldValidationSchema = Yup.object({
  name: Yup.string().required(),
  group: Yup.string(),
  crop: Yup.string(),
});

export type CreateFieldFormSchema = Yup.InferType<
  typeof createFieldValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: CreateFieldFormSchema) => void;
  handleClose: () => void;
  crops: [Crop] | undefined;
  groups: [Category] | undefined;
  submitDisabled: boolean;
};
const CreateFieldForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  crops,
  groups,
  handleClose,
  submitDisabled,
}) => {
  const { control, handleSubmit } = useForm<CreateFieldFormSchema>({
    defaultValues: {
      name: "",
      group: "",
      crop: "",
    },
    resolver: yupResolver(createFieldValidationSchema),
  });

  return (
    <Stack width="500px" margin={4}>
      <Stack spacing={1}>
        <Typography
          color="primary.main"
          variant="body2"
          component="h1"
          fontWeight="500"
        >
          Add Field
        </Typography>
        <Typography variant="body2">Fill info to create field.</Typography>
      </Stack>
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
                label={t(SingleWordsTranslationKeys.Cancel)}
                onChange={onChange}
                onBlur={onBlur}
              >
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

      <Stack direction="column" justifyContent="end" spacing={2}>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={submitDisabled}
          size="large"
          loading={loading}
        >
          {t(PhrasesTranslationKeys.CreateField)}
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          {t(SingleWordsTranslationKeys.Cancel)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateFieldForm;
