import {
  useGetUpdatedMeasurementUnits,
  useLogin,
  useLoginWithGoogle,
} from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import GoogleButton from "@fieldbee/ui/GoogleButton";
import { Divider, Link, Typography } from "@fieldbee/ui/components";
import { addMinutes } from "date-fns";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import { setMeasurementUnits } from "../../../helpers/format-area";
import { setUserToken } from "../../../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import AuthLayout from "../auth-layout";
import LoginForm, { LoginFormSchema } from "./login-form";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const { id_token: idToken } = router.query;
  const { mutateAsync: login, isLoading } = useLogin();
  const { mutateAsync: loginWithGoogle } = useLoginWithGoogle();
  const { mutateAsync: getMeasurementUnits } = useGetUpdatedMeasurementUnits();

  const onLogin = async (values: LoginFormSchema) => {
    await login(values, {
      onSuccess: async (data) => {
        setUserToken({
          ...data,
          expires_at: addMinutes(new Date(), data.expires_in),
        });
        const measurements = await getMeasurementUnits(null);
        setMeasurementUnits(measurements);
        router.push(pagePaths.authPages.home);
      },
      onError: () => {
        setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials));
      },
    });
  };

  React.useEffect(() => {
    async function loginToSystem(token: string) {
      try {
        const { data, status } = await loginWithGoogle({
          code: token,
        });
        if (status !== 200) {
          setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials));
        } else {
          setUserToken({
            ...data,
            expires_at: addMinutes(new Date(), data.expires_in),
          });
          router.push(pagePaths.authPages.home);
        }
      } catch (e) {
        setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials));
      }
    }

    if (router.isReady && idToken) {
      loginToSystem(idToken.toString());
    }
  }, [router, idToken, loginWithGoogle]);

  return (
    <AuthLayout>
      <Stack width="100%" spacing={4}>
        <Stack width="100%">
          <Typography
            variant="h5"
            marginTop={16}
            sx={{ color: theme.palette.surface_emphasis.high }}
            lineHeight="32px"
          >
            {t(PhrasesTranslationKeys.WelcomeToFieldBee).toString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.surface_emphasis.medium }}
          >
            {t(PhrasesTranslationKeys.PleaseLogInToContinue).toString()}
          </Typography>
        </Stack>
        <Link href="" width={"100%"} sx={{ textDecoration: "none" }}>
          <GoogleButton imageSrc="/static/google-logo.svg">
            {t(PhrasesTranslationKeys.LoginWithGoogle)}
          </GoogleButton>
        </Link>
        <div>
          <Divider
            sx={{
              color: theme.palette.surface_emphasis.medium,
              fontVariant: "all-small-caps",
              "&:before, :after": {
                borderColor: (t) => t.palette.outline.main,
              },
              width: "95%",
              margin: "auto",
            }}
          >
            {t(SingleWordsTranslationKeys.Or).toString()}
          </Divider>
        </div>
        <Stack width="100%">
          <LoginForm
            loading={isLoading}
            onSubmit={onLogin}
            errorMessage={errorMessage}
          />
        </Stack>

        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          spacing={0}
          gap={1}
        >
          <Typography
            variant="body1"
            sx={{ color: theme.palette.surface_emphasis.medium }}
          >
            {t(PhrasesTranslationKeys.DontHaveAnAccount).toString()}
          </Typography>
          <Link
            href={pagePaths.publicPages.signUp}
            color={theme.palette.primary.main}
            underline="none"
            fontSize="16px"
          >
            {t(PhrasesTranslationKeys.CreateAccount)}
          </Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
