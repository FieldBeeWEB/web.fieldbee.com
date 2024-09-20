import { Crop, Season } from "@fieldbee/api";
import { Button, Stack } from "@fieldbee/ui";
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
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { SingleWordsTranslationKeys } from "../../../../localization";

const addCropHistoryValidationSchema = Yup.object({
  season: Yup.string().required(),
  crop: Yup.string().required(),
});

export type AddCropHistoryFormSchema = Yup.InferType<
  typeof addCropHistoryValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: AddCropHistoryFormSchema) => void;
  crops: [Crop] | undefined;
  seasons: [Season] | undefined;
  handleClose: () => void;
  crop?: string;
  season?: string;
};
const AddCropHistoryForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  crops,
  seasons,
  handleClose,
  crop,
  season,
}) => {
  const { control, handleSubmit } = useForm<AddCropHistoryFormSchema>({
    defaultValues: {
      season: season || "",
      crop: crop || "",
    },
    resolver: yupResolver(addCropHistoryValidationSchema),
  });

  return (
    <Stack>
      <Stack padding="0 16px">
        {seasons && (
          <Controller
            name="season"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <FormControl
                error={!!(error && error.message)}
                variant="outlined"
              >
                <InputLabel id="select-season-label">
                  {t(SingleWordsTranslationKeys.Season)}
                </InputLabel>
                <Select
                  labelId="select-season-label"
                  id="select-season"
                  value={value}
                  label={t(SingleWordsTranslationKeys.Season)}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  {seasons.map((season) => (
                    <MenuItem key={season.name} value={season.uri}>
                      {season.name}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <FormHelperText id="season-error-text">
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
              <FormControl
                error={!!(error && error.message)}
                variant="outlined"
              >
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
      </Stack>
      <Stack
        direction="row"
        padding="16px"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.secondary_shades[200]}`,
        })}
        spacing={1}
      >
        <Button variant="outlined" onClick={handleClose} fullWidth>
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

export default AddCropHistoryForm;
