import { useResetPassword } from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import { Link, Typography } from "@fieldbee/ui/components";
import BackArrowIcon from "@fieldbee/ui/custom-icons/BackArrowIcon";
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
    <AuthLayout>
      <Stack
        width="100%"
        spacing={0}
        justifyContent="space-between"
        height="100%"
      >
        <Stack alignSelf="flex-start">
          <Link
            onClick={() => router.push(pagePaths.publicPages.login)}
            borderRadius="100px !important"
            border={`1px solid ${theme.palette.surface_emphasis.high} !important`}
            padding="12px !important"
            underline="none"
            lineHeight={0}
            style={{
              cursor: "pointer",
            }}
          >
            <BackArrowIcon
              sx={{
                width: "16px !important",
                height: "16px !important",
              }}
            />
          </Link>
        </Stack>

        <Stack width="100%" spacing={3}>
          <Stack width="100%">
            <Typography
              variant="h5"
              marginTop={16}
              sx={{ color: theme.palette.surface_emphasis.high }}
              lineHeight="32px"
            >
              {t(PhrasesTranslationKeys.ForgotPassword).toString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.surface_emphasis.medium }}
            >
              {t(
                SentencesTranslationKeys.EnterYourEmailAddressAndWeWillSendAPasswordResetLink,
              ).toString()}
            </Typography>
          </Stack>

          <ResetPasswordForm loading={isLoading} onSubmit={onResetPassword} />
        </Stack>
        <Stack
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          spacing={0}
          gap={1}
        >
          <Typography
            variant="body1"
            sx={{ color: theme.palette.surface_emphasis.medium }}
          >
            {t(
              PhrasesTranslationKeys.IfYouHaveAnyQuestionContactOur,
            ).toString()}
          </Typography>
          <Link
            color={theme.palette.primary.main}
            underline="none"
            fontSize="16px"
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
