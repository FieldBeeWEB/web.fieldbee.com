import { Button, Stack, theme } from "@fieldbee/ui";
import ClearableInput from "@fieldbee/ui/form/input/ClearableInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { emailRegex } from "../../../helpers/yup";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

const resetPasswordValidationSchema = Yup.object({
  email: emailRegex.required(),
});

export type ResetPasswordFormSchema = Yup.InferType<
  typeof resetPasswordValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: ResetPasswordFormSchema) => void;
};
const ResetPasswordForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<ResetPasswordFormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  return (
    <Stack width="100%">
      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <ClearableInput
            type="email"
            label={t(SingleWordsTranslationKeys.Email)}
            error={error}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(SingleWordsTranslationKeys.Email).toString()}
            clearAriaLabel="Clear input"
          />
        )}
      />

      <Button
        onClick={handleSubmit(onSubmit)}
        size="medium"
        loading={loading}
        sx={{
          marginTop: "32px !important",
          textTransform: "uppercase",
          color: theme.palette.primary_emphasis.high,
          fontWeight: 600,
        }}
      >
        {t(PhrasesTranslationKeys.SendResetLink)}
      </Button>
    </Stack>
  );
};

export default ResetPasswordForm;
