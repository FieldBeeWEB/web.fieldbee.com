import { t } from "i18next";
import * as Yup from "yup";
import { SentencesTranslationKeys } from "../localization";

export const passwordRegex = Yup.string().matches(
  /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.*[\$\%\^&\*])[\w\$%^&\*]{8,128}$/,
  t(SentencesTranslationKeys.ThePasswordShouldBeFrom8Characters).toString()
);

export const emailRegex = Yup.string().matches(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  t(SentencesTranslationKeys.MustBeValidEmail).toString()
);
