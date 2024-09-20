import {
  MeasurementType,
  useEditMeasureUnits,
  useGetMeasurementUnits,
  useGetUserMeasureUnits,
  useQueryClient,
} from "@fieldbee/api";
import { Loader } from "@fieldbee/ui";
import { t } from "i18next";
import * as React from "react";
import { setMeasurementUnits } from "../../../helpers/format-area";
import { toast } from "../../../helpers/toast";
import { PhrasesTranslationKeys } from "../../../localization";
import UserSettingsForm, { UserSettingsFormSchema } from "./user-settings-form";

const UserSettings = () => {
  const [saved, setSaved] = React.useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetUserMeasureUnits();
  const { data: areas } = useGetMeasurementUnits(MeasurementType.AREA);

  const { data: lengths } = useGetMeasurementUnits(MeasurementType.LENGTH);

  const { data: speeds } = useGetMeasurementUnits(MeasurementType.SPEED);
  const { mutateAsync: editMeasureUnits, isLoading } = useEditMeasureUnits();

  const onUserSettingsUpdate = async (values: UserSettingsFormSchema) => {
    setSaved(false);
    await editMeasureUnits(
      {
        area: values.area,
        length: values.length,
        speed: values.speed,
      },
      {
        onSuccess: async () => {
          // await queryClient.refetchQueries({
          //   queryKey: queryKeys.getUserMeasureUnits,
          // });
          await queryClient.refetchQueries();

          setSaved(true);
          window.location.reload();
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      }
    );
  };

  React.useEffect(() => {
    if (saved && data) {
      setMeasurementUnits(data);
    }
  }, [saved, data]);

  if (!data || !areas || !lengths || !speeds) return <Loader />;
  return (
    <UserSettingsForm
      loading={isLoading}
      onSubmit={onUserSettingsUpdate}
      areas={areas}
      lengths={lengths}
      speeds={speeds}
      userMeasureUnits={data}
    />
  );
};
export default UserSettings;
