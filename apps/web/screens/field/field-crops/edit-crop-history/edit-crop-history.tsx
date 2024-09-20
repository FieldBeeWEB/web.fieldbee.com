import {
  queryKeys,
  useEditCropHistory,
  useGetCrops,
  useGetSeasons,
  useQueryClient,
} from "@fieldbee/api";
import { ModalBody, ModalContent } from "@fieldbee/ui";
import { IconButton } from "@fieldbee/ui/components";
import { Edit } from "@fieldbee/ui/icons";
import { t } from "i18next";
import * as React from "react";
import { toast } from "../../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../../localization";
import AddCropHistoryForm, {
  AddCropHistoryFormSchema,
} from "../add-crop-history/add-crop-history-form";

interface Props {
  uri: string;
  season: string;
  crop: string;
  fieldUri: string;
}

export default function EditCropHistory({
  uri,
  crop,
  season,
  fieldUri,
}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { data: cropsData } = useGetCrops();
  const { data: seasonsData } = useGetSeasons();
  const { mutateAsync: editCropHistory, isLoading } = useEditCropHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onEditCropHistory = async (values: AddCropHistoryFormSchema) => {
    await editCropHistory(
      {
        uri: uri,
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
      }
    );
  };

  return (
    <>
      <IconButton
        aria-label={t(SingleWordsTranslationKeys.Edit).toString()}
        onClick={handleOpen}
      >
        <Edit />
      </IconButton>
      {open && (
        <ModalContent
          open={open}
          handleClose={handleClose}
          isDialog={true}
          hasBottomBorder={false}
          modalTitle={t(PhrasesTranslationKeys.EditCropHistory).toString()}
        >
          <ModalBody flexDirection="column">
            <AddCropHistoryForm
              loading={isLoading}
              onSubmit={onEditCropHistory}
              crops={cropsData}
              seasons={seasonsData}
              handleClose={handleClose}
              crop={crop}
              season={season}
            />
          </ModalBody>
        </ModalContent>
      )}
    </>
  );
}
