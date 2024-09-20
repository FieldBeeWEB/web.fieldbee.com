import { useLogin, useSignUp } from "@fieldbee/api";
import { addMinutes } from "date-fns";
import { t } from "i18next";
import { useRouter } from "next/router";
import { pagePaths } from "../../../config/page-paths";
import { toast } from "../../../helpers/toast";
import { setUserToken } from "../../../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
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
      }
    );
  };

  return (
    <AuthLayout
      headline={t(PhrasesTranslationKeys.CreateANewAccount).toString()}
      supportingText={t(
        SentencesTranslationKeys.ByClickingSignUpIAgreeToTOS
      ).toString()}
      displayBackButton={true}
    >
      <SignUpForm loading={isLoading || isLoginLoading} onSubmit={onSignUp} />
    </AuthLayout>
  );
}
