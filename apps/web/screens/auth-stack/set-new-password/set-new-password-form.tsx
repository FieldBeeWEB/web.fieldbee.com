import { Button, Stack } from "@fieldbee/ui";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@fieldbee/ui/components";
import { Visibility, VisibilityOff } from "@fieldbee/ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { passwordRegex } from "../../../helpers/yup";
import { PhrasesTranslationKeys } from "../../../localization";

const newPasswordValidationSchema = Yup.object({
  password: passwordRegex.min(8).max(128).required(),
});

export type SetNewPasswordFormSchema = Yup.InferType<
  typeof newPasswordValidationSchema
>;

type Props = {
  loading?: boolean;
  onSubmit: (data: SetNewPasswordFormSchema) => void;
};
const SetNewPasswordForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<SetNewPasswordFormSchema>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(newPasswordValidationSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Stack width="100%">
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormControl error={!!(error && error.message)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t(PhrasesTranslationKeys.NewPassword)}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t(
                      PhrasesTranslationKeys.TogglePasswordVisibility,
                    ).toString()}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t(PhrasesTranslationKeys.NewPassword)}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t(PhrasesTranslationKeys.NewPassword).toString()}
              aria-describedby="component-error-text"
            />
            {error && (
              <FormHelperText id="component-error-text">
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Button onClick={handleSubmit(onSubmit)} size="large" loading={loading}>
        {t(PhrasesTranslationKeys.ChangePassword)}
      </Button>
    </Stack>
  );
};

export default SetNewPasswordForm;
