import { Button, Stack, theme } from "@fieldbee/ui";
import { t } from "i18next";

import BaseInput from "@fieldbee/ui/form/input/BaseInput";
import PasswordInput from "@fieldbee/ui/form/input/PasswordInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { emailRegex, passwordRegex } from "../../../helpers/yup";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

const signUpValidationSchema = Yup.object({
  name: Yup.string().required(),
  email: emailRegex.required(),
  password: passwordRegex.min(8).max(128).required(),
});

export type SignUpFormSchema = Yup.InferType<typeof signUpValidationSchema>;

type Props = {
  loading?: boolean;
  onSubmit: (data: SignUpFormSchema) => void;
};
const SignUpForm: React.FunctionComponent<Props> = ({ loading, onSubmit }) => {
  const { control, handleSubmit } = useForm<SignUpFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  return (
    <Stack width="100%">
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <BaseInput
            type="text"
            label={t(PhrasesTranslationKeys.Name)}
            error={error}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.Name).toString()}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <BaseInput
            type="email"
            label={t(PhrasesTranslationKeys.Email)}
            error={error}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.Email).toString()}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <PasswordInput
            label={t(SingleWordsTranslationKeys.Password).toString()}
            togglePasswordAriaLabel={t(
              PhrasesTranslationKeys.TogglePasswordVisibility,
            ).toString()}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(SingleWordsTranslationKeys.Password).toString()}
            error={error}
            helperText={t(
              SentencesTranslationKeys.ThePasswordShouldBeFrom8Characters,
            ).toString()}
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
        {t(PhrasesTranslationKeys.SignUp)}
      </Button>
    </Stack>
  );
};

export default SignUpForm;
