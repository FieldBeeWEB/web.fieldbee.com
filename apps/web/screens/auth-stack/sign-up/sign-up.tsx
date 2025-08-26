import { useLogin, useSignUp } from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import { Divider, Link, Typography } from "@fieldbee/ui/components";
import GoogleButton from "@fieldbee/ui/GoogleButton";
import { addMinutes } from "date-fns";
import { t } from "i18next";
import { useRouter } from "next/router";
import { pagePaths } from "../../../config/page-paths";
import { toast } from "../../../helpers/toast";
import { setUserToken } from "../../../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import AuthLayout from "../auth-layout";
import SignUpForm, { SignUpFormSchema } from "./sign-up-form";

export default function SignUp() {
  const router = useRouter();
  const { mutateAsync: signUp, isLoading } = useSignUp();
  const { mutateAsync: login, isLoading: isLoginLoading } = useLogin();

  const onSignUp = async (values: SignUpFormSchema) => {
    await signUp(
      {
        ...values,
        organization: values.email.split("@")[0],
      },
      {
        onSuccess: async () => {
          await login(values, {
            onSuccess: (data) => {
              setUserToken({
                ...data,
                expires_at: addMinutes(new Date(), data.expires_in),
              });
              router.push(pagePaths.authPages.home);
            },
            onError: () => {
              toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
            },
          });
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      },
    );
  };

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
            {t(PhrasesTranslationKeys.CreateAccount).toString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.surface_emphasis.medium }}
          >
            {t(PhrasesTranslationKeys.PleaseCreateAccountToContinue).toString()}
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
          <SignUpForm
            loading={isLoading || isLoginLoading}
            onSubmit={onSignUp}
          />
        </Stack>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          spacing={0}
          gap={1}
        >
          <Typography
            variant="body1"
            sx={{ color: theme.palette.surface_emphasis.medium }}
          >
            {t(PhrasesTranslationKeys.AlreadyHaveAnAccount).toString()}?
          </Typography>
          <Link
            href={pagePaths.publicPages.login}
            color={theme.palette.primary.main}
            underline="none"
            fontSize="16px"
          >
            {t(SingleWordsTranslationKeys.Login)}
          </Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
