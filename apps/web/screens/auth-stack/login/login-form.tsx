import { Button, Stack, theme } from "@fieldbee/ui";
import {
  Checkbox,
  FormHelperText,
  Link,
  Typography,
} from "@fieldbee/ui/components";
import BaseInput from "@fieldbee/ui/form/input/BaseInput";
import PasswordInput from "@fieldbee/ui/form/input/PasswordInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { pagePaths } from "../../../config/page-paths";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

const loginValidationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export type LoginFormSchema = Yup.InferType<typeof loginValidationSchema>;

type Props = {
  errorMessage: string | null;
  loading: boolean;
  onSubmit: (data: LoginFormSchema) => void;
};
const LoginForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  errorMessage,
}) => {
  const { control, handleSubmit } = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
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
          <BaseInput
            type="email"
            label={t(PhrasesTranslationKeys.EmailOrLogin)}
            error={error}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.EmailOrLogin).toString()}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
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
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}

      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={0}
      >
        <Stack
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          spacing={0}
          gap={0.5}
        >
          <Checkbox
            defaultChecked
            sx={{
              padding: 0,
            }}
          />
          <Typography color={theme.palette.surface_emphasis.high}>
            {t(PhrasesTranslationKeys.RememberMe)}
          </Typography>
        </Stack>
        <Link
          href={pagePaths.publicPages.resetPassword}
          underline="none"
          color={theme.palette.primary.main}
        >
          {t(PhrasesTranslationKeys.ForgotPassword)}?
        </Link>
      </Stack>

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
        {t(PhrasesTranslationKeys.LoginWithEmail)}
      </Button>
    </Stack>
  );
};

export default LoginForm;
