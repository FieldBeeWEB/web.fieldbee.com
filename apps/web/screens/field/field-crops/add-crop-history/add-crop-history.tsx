import {
  queryKeys,
  useAddCropHistory,
  useGetCrops,
  useGetSeasons,
  useQueryClient,
} from "@fieldbee/api";
import { Button, ModalBody, ModalContent } from "@fieldbee/ui";
import { t } from "i18next";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "../../../../helpers/toast";
import { PhrasesTranslationKeys } from "../../../../localization";
import AddCropHistoryForm, {
  AddCropHistoryFormSchema,
} from "./add-crop-history-form";

interface Props {
  fieldUri: string;
}

export default function AddCropHistory({ fieldUri }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { data: cropsData } = useGetCrops();
  const { data: seasonsData } = useGetSeasons();
  const { mutateAsync: addCropHistory, isLoading } = useAddCropHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onAddCropHistory = async (values: AddCropHistoryFormSchema) => {
    await addCropHistory(
      {
        uri: `content://CROP_HISTORY/${uuidv4()}`,
        field: fieldUri,
        crop: values.crop,
        season: values.season,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.getField(fieldUri),
          });
          handleClose();
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      },
    );
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "initial",
          border: (t) => `1px solid ${t.palette.surface_emphasis.medium}`,
          color: (t) => t.palette.surface_emphasis.high,
        }}
      >
        {t(PhrasesTranslationKeys.AddNewCrop)}
      </Button>
      {open && (
        <ModalContent
          open={open}
          handleClose={handleClose}
          isDialog={true}
          hasBottomBorder={false}
          modalTitle={t(PhrasesTranslationKeys.AddCropHistory).toString()}
        >
          <ModalBody flexDirection="column">
            <AddCropHistoryForm
              loading={isLoading}
              onSubmit={onAddCropHistory}
              crops={cropsData}
              seasons={seasonsData}
              handleClose={handleClose}
            />
          </ModalBody>
        </ModalContent>
      )}
    </>
  );
}
