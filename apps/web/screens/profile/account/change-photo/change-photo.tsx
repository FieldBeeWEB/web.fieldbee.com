import {
  useChangePhoto,
  useGetProfile,
  useUpdateProfileInfo,
} from "@fieldbee/api";
import { Button } from "@fieldbee/ui";
import { t } from "i18next";
import * as React from "react";
import { toast } from "../../../../helpers/toast";
import { PhrasesTranslationKeys } from "../../../../localization";

export default function ChangePhoto() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { data: profile, refetch } = useGetProfile();

  const { mutateAsync: changePhoto, isLoading } = useChangePhoto();
  const { mutateAsync: updateProfile, isLoading: isUpdateProfileLoading } =
    useUpdateProfileInfo();

  const handleUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file1 = e.target.files && e.target.files[0];
      if (file1) {
        await changePhoto(
          {
            file: file1 as Blob,
          },
          {
            onSuccess: async (data) => {
              const photoPath = `efarmer_web/${data[0]}`;
              await updateProfile(
                {
                  ...profile,
                  photoPath,
                },
                {
                  onSuccess: () => {
                    refetch();
                  },
                  onError: () => {
                    toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
                  },
                },
              );
            },
            onError: () => {
              toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
            },
          },
        );
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [],
  );

  return (
    <Button
      loading={isLoading || isUpdateProfileLoading}
      variant="contained"
      onClick={() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }}
    >
      {t(PhrasesTranslationKeys.ChangePhoto)}
      <input
        ref={fileInputRef}
        hidden
        accept="image/*"
        multiple={false}
        type="file"
        onChange={handleUpload}
      />
    </Button>
  );
}
