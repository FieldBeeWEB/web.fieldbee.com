import { useResetPassword } from "@fieldbee/api";
import { Stack } from "@fieldbee/ui";
import { Link } from "@fieldbee/ui/components";
import { t } from "i18next";
import { useRouter } from "next/router";
import { pagePaths } from "../../../config/page-paths";
import { toast } from "../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
} from "../../../localization";
import AuthLayout from "../auth-layout";
import ResetPasswordForm, {
  ResetPasswordFormSchema,
} from "./reset-password-form";

export default function ResetPassword() {
  const router = useRouter();
  const { mutateAsync: resetPassword, isLoading } = useResetPassword();

  const onResetPassword = async (values: ResetPasswordFormSchema) => {
    await resetPassword(values, {
      onSuccess: () => {
        toast.success(t(SentencesTranslationKeys.ResetLinkSentCheckYourEmail));
        router.push(pagePaths.publicPages.login);
      },
      onError: () => {
        toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
      },
    });
  };

  return (
    <AuthLayout
      headline={t(PhrasesTranslationKeys.RemindMyPassword).toString()}
      displayBackButton={true}
    >
      <ResetPasswordForm loading={isLoading} onSubmit={onResetPassword} />
      <Stack justifyContent="flex-end" alignSelf="flex-end">
        <Link
          variant="body2"
          underline="none"
          color="#CAC4D0"
          href={`mailto:info@efarmer.mobi?Subject=${t(
            PhrasesTranslationKeys.PasswordRecovery
          )}`}
        >
          {t(PhrasesTranslationKeys.ContactSupport)}
        </Link>
      </Stack>
    </AuthLayout>
  );
}
