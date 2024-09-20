import {
  useGetUpdatedMeasurementUnits,
  useLogin,
  useLoginWithGoogle,
} from "@fieldbee/api";
import { Button, Stack } from "@fieldbee/ui";
import GoogleButton from "@fieldbee/ui/GoogleButton";
import { Divider, Link } from "@fieldbee/ui/components";
import { addMinutes } from "date-fns";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import { setUserToken } from "../../../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import AuthLayout from "../auth-layout";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const { id_token: idToken } = router.query;
  const { mutateAsync: login, isLoading } = useLogin();
  const { mutateAsync: loginWithGoogle } = useLoginWithGoogle();
  const { mutateAsync: getMeasurementUnits } = useGetUpdatedMeasurementUnits();

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
    <AuthLayout
      headline={t(PhrasesTranslationKeys.LoginToYourFieldBeeAccount).toString()}
      supportingText={t(
        SentencesTranslationKeys.ASimpleAndAffordableTractorGpsNavigationAndAutoSteeringSystemForYourFarm
      ).toString()}
    >
      <Stack width="100%">
        <Button
          size="large"
          onClick={() => router.push(pagePaths.publicPages.emailLogin)}
        >
          {t(PhrasesTranslationKeys.LoginWithEmail)}
        </Button>
        <Button
          size="large"
          onClick={() => router.push(pagePaths.publicPages.signUp)}
          sx={{
            backgroundColor: "initial",
            border: (t) => `1px solid ${t.palette.white[600]}`,
            color: (t) => t.palette.white[900],
          }}
        >
          {t(PhrasesTranslationKeys.CreateNewAccount)}
        </Button>
        <div>
          <Divider
            sx={{
              color: "#CAC4D0",
              fontVariant: "all-small-caps",
              "&:before, :after": {
                borderColor: (t) => t.palette.white[300],
              },
            }}
          >
            {t(SingleWordsTranslationKeys.Or).toString()}
          </Divider>
        </div>
        <Link sx={{ width: "100%" }} href="">
          <GoogleButton imageSrc="/static/google-logo.svg">
            {t(PhrasesTranslationKeys.LoginWithGoogle)}
          </GoogleButton>
        </Link>
      </Stack>
    </AuthLayout>
  );
}
