import { Chemical } from "@fieldbee/api";
import { Button, Input, Stack } from "@fieldbee/ui";
import { Check } from "@fieldbee/ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../../localization";

const editSoilValidationSchema = Yup.object({
  n: Yup.number(),
  p2o5: Yup.number(),
  k2o: Yup.number(),
  mgo: Yup.number(),
  s: Yup.number(),
  ph: Yup.number(),
});

export type EditSoilFormSchema = Yup.InferType<typeof editSoilValidationSchema>;

type Props = {
  loading?: boolean;
  onSubmit: (data: EditSoilFormSchema) => void;
  handleClose: () => void;
  chemicals: Chemical[] | undefined;
};

const EditSoilForm: React.FunctionComponent<Props> = ({
  loading,
  onSubmit,
  handleClose,
  chemicals,
}) => {
  const { control, handleSubmit } = useForm<EditSoilFormSchema>({
    defaultValues: {
      n:
        (chemicals &&
          chemicals.filter(
            (x) => x.propertyTypeName === "Chemical" && x.propertyName === "N"
          )[0]?.propertyValueFloat) ||
        undefined,
      p2o5:
        (chemicals &&
          chemicals.filter(
            (x) =>
              x.propertyTypeName === "Chemical" && x.propertyName === "P2O5"
          )[0]?.propertyValueFloat) ||
        undefined,
      k2o:
        (chemicals &&
          chemicals.filter(
            (x) => x.propertyTypeName === "Chemical" && x.propertyName === "K2O"
          )[0]?.propertyValueFloat) ||
        undefined,
      mgo:
        (chemicals &&
          chemicals.filter(
            (x) => x.propertyTypeName === "Chemical" && x.propertyName === "MgO"
          )[0]?.propertyValueFloat) ||
        undefined,
      s:
        (chemicals &&
          chemicals.filter(
            (x) => x.propertyTypeName === "Chemical" && x.propertyName === "S"
          )[0]?.propertyValueFloat) ||
        undefined,
      ph:
        (chemicals &&
          chemicals.filter(
            (x) => x.propertyTypeName === "Chemical" && x.propertyName === "pH"
          )[0]?.propertyValueFloat) ||
        undefined,
    },
    resolver: yupResolver(editSoilValidationSchema),
  });

  return (
    <Stack width="calc(100% - 16px)" padding={1} spacing={2}>
      <Controller
        name="n"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="N"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Controller
        name="p2o5"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="P2O5"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Controller
        name="k2o"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="K2O"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Controller
        name="mgo"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="MgO"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Controller
        name="s"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="S"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Controller
        name="ph"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="pH"
            error={!!(error && error.message)}
            helperText={error && error.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={t(PhrasesTranslationKeys.SetValue).toString()}
          />
        )}
      />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={handleClose} fullWidth>
          {t(SingleWordsTranslationKeys.Cancel)}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          fullWidth
          startIcon={<Check />}
        >
          {t(SingleWordsTranslationKeys.Save)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditSoilForm;
