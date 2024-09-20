import { Button, Input, Stack } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../localization";

const editFieldBoundariesValidationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string(),
});

export type EditFieldBoundariesFormSchema = Yup.InferType<
  typeof editFieldBoundariesValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: EditFieldBoundariesFormSchema) => void;
  name: string;
  description: string | undefined;
  handleCancel: () => void;
};
const EditFieldBoundariesForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  name,
  description,
  handleCancel,
}) => {
  const { control, handleSubmit } = useForm<EditFieldBoundariesFormSchema>({
    defaultValues: {
      name,
      description,
    },
    resolver: yupResolver(editFieldBoundariesValidationSchema),
  });

  return (
    <Stack width="500px" margin={4}>
      <Typography
        color="primary.main"
        variant="body2"
        component="h1"
        fontWeight="500"
      >
        Edit Field
      </Typography>
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
          />
        )}
      />

      <Stack direction="column" justifyContent="end" spacing={2}>
        <Button onClick={handleSubmit(onSubmit)} size="large" loading={loading}>
          {t(PhrasesTranslationKeys.SaveChanges)}
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleCancel}>
          {t(SingleWordsTranslationKeys.Cancel)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditFieldBoundariesForm;
