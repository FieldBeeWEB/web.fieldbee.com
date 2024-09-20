import { ProfileResponse } from "@fieldbee/api";
import { Button, ModalFooter, Stack } from "@fieldbee/ui";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@fieldbee/ui/components";
import { DatePicker } from "@fieldbee/ui/date-picker";
import ClearableInput from "@fieldbee/ui/form/input/ClearableInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { countries } from "../../../helpers/countries";
import { DATE_FORMAT } from "../../../helpers/date-format";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import DeleteAccount from "./delete-account/delete-account";

const accountValidationSchema = Yup.object({
  firstName: Yup.string(),
  lastName: Yup.string(),
  countryCode: Yup.string(),
  gender: Yup.string(),
  birthday: Yup.date().nullable(),
  phoneNumber: Yup.string(),
  additionalInfo: Yup.string(),
});

export type AccountFormSchema = Yup.InferType<typeof accountValidationSchema>;

type Props = {
  loading: boolean;
  onSubmit: (data: AccountFormSchema) => void;
  profileData: ProfileResponse;
};
const AccountForm: React.FunctionComponent<Props> = ({
  loading,
  profileData,
  onSubmit,
}) => {
  const { control, handleSubmit, formState } = useForm<AccountFormSchema>({
    defaultValues: {
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      countryCode: profileData.countryCode || "",
      gender: profileData.gender || "",
      birthday: profileData.birthday ? new Date(profileData.birthday) : null,
      phoneNumber: profileData.phoneNumber || "",
      additionalInfo: profileData.additionalInfo || "",
    },
    resolver: yupResolver(accountValidationSchema),
  });
  return (
    <>
      {/* <Stack width="100%" padding={0}> */}
      <Stack
        spacing={2}
        width="calc(100% - 32px)"
        padding={2}
        overflow="scroll"
        flex={1}
      >
        <Typography>Country</Typography>
        <Controller
          name="countryCode"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <Select
                labelId="select-country-label"
                id="select-country"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText id="component-error-text">
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <InputLabel id="select-gender-label">
                {t(SingleWordsTranslationKeys.Gender)}
              </InputLabel>
              <Select
                labelId="select-gender-label"
                id="select-gender"
                value={value}
                label={t(SingleWordsTranslationKeys.Gender).toString()}
                onChange={onChange}
                onBlur={onBlur}
              >
                <MenuItem value="MALE">
                  {t(SingleWordsTranslationKeys.Male)}
                </MenuItem>
                <MenuItem value="FEMALE">
                  {t(SingleWordsTranslationKeys.Female)}
                </MenuItem>
                <MenuItem value="OTHER">
                  {t(SingleWordsTranslationKeys.Other)}
                </MenuItem>
              </Select>
              {error && (
                <FormHelperText id="component-error-text">
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Typography>Birthday</Typography>

        <Controller
          name="birthday"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <FormControl error={!!(error && error.message)} variant="outlined">
              <DatePicker
                label="Date"
                value={value}
                onChange={onChange}
                maxDate={new Date()}
                format={DATE_FORMAT}
              />
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Typography>Personal data</Typography>
        <Controller
          name="firstName"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <ClearableInput
              label={t(PhrasesTranslationKeys.FirstName)}
              error={error}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t(PhrasesTranslationKeys.FirstName).toString()}
              clearAriaLabel="Clear input"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <ClearableInput
              label={t(PhrasesTranslationKeys.LastName)}
              error={error}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t(PhrasesTranslationKeys.LastName).toString()}
              clearAriaLabel="Clear input"
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <ClearableInput
              label={t(PhrasesTranslationKeys.PhoneNumber)}
              error={error}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t(PhrasesTranslationKeys.PhoneNumber).toString()}
              clearAriaLabel="Clear input"
            />
          )}
        />
        <Controller
          name="additionalInfo"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <ClearableInput
              label={t(PhrasesTranslationKeys.AdditionalInfo)}
              error={error}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={t(PhrasesTranslationKeys.AdditionalInfo).toString()}
              clearAriaLabel="Clear input"
              multiline={true}
            />
          )}
        />

        <DeleteAccount />
      </Stack>

      <ModalFooter>
        <Button
          onClick={handleSubmit(onSubmit)}
          size="large"
          loading={loading}
          disabled={!formState.isDirty}
        >
          {t(SingleWordsTranslationKeys.Save)}
        </Button>
      </ModalFooter>
    </>
  );
};

export default AccountForm;
