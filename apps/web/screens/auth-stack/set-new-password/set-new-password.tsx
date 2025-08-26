import { useSetNewPassword } from "@fieldbee/api";
import { Stack } from "@fieldbee/ui";
import { Link } from "@fieldbee/ui/components";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import { toast } from "../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
} from "../../../localization";
import AuthLayout from "../auth-layout";
import SetNewPasswordForm, {
  SetNewPasswordFormSchema,
} from "./set-new-password-form";

export default function SetNewPassword() {
  const router = useRouter();
  const { user, key } = router.query;
  const { mutateAsync: setNewPassword, isLoading } = useSetNewPassword();

  const onSetNewPassword = async (values: SetNewPasswordFormSchema) => {
    if (user && key) {
      await setNewPassword(
        {
          key: key.toString(),
          user: user.toString(),
          ...values,
        },
        {
          onSuccess: () => {
            toast.success(
              t(PhrasesTranslationKeys.PasswordChangedSuccessfully),
            );
            router.push(pagePaths.publicPages.login);
          },
          onError: () => {
            toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
          },
        },
      );
    }
  };

  React.useEffect(() => {
    if (router.isReady) {
      if (!user || !key) {
        router.push(pagePaths.publicPages.login);
      }
    }
  }, [key, router, user]);

  return (
    <AuthLayout>
      <Stack width="100%" alignItems="center">
        <h2>{t(SentencesTranslationKeys.EnterNewPasswordForYourAccount)}</h2>
        <SetNewPasswordForm loading={isLoading} onSubmit={onSetNewPassword} />
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Link href={pagePaths.publicPages.login}>
            {t(PhrasesTranslationKeys.BackToLogin)}
          </Link>
          <Link
            href={`mailto:info@efarmer.mobi?Subject=${t(
              PhrasesTranslationKeys.PasswordRecovery,
            )}`}
          >
            {t(PhrasesTranslationKeys.ContactSupport)}
          </Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
