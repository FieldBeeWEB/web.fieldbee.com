import { queryKeys, useDeleteCropHistory, useQueryClient } from "@fieldbee/api";
import { Button, ModalBody, ModalContent, Stack } from "@fieldbee/ui";
import { IconButton, Typography } from "@fieldbee/ui/components";
import { Delete } from "@fieldbee/ui/icons";
import { t } from "i18next";
import * as React from "react";
import { toast } from "../../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../../localization";

interface Props {
  uri: string;
  fieldUri: string;
}

export default function DeleteCropHistory({ uri, fieldUri }: Props) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const { mutateAsync: deleteCropHistory } = useDeleteCropHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onDeleteCropHistory = async () => {
    await deleteCropHistory(
      { uri },
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
      <IconButton
        aria-label={t(SingleWordsTranslationKeys.Remove).toString()}
        onClick={handleOpen}
      >
        <Delete />
      </IconButton>

      {open && (
        <ModalContent
          open={open}
          handleClose={handleClose}
          isDialog={true}
          hasBottomBorder={false}
          modalTitle={t(PhrasesTranslationKeys.DeleteCropHistory).toString()}
        >
          <ModalBody flexDirection="column">
            <Stack spacing={2}>
              <Typography padding="0 16px">
                {t(
                  SentencesTranslationKeys.DoYouReallyWantToDeleteThisCropHistory,
                )}
                ?
              </Typography>

              <Stack
                direction="row"
                padding="16px"
                sx={(theme) => ({
                  borderTop: `1px solid ${theme.palette.background.default}`,
                })}
                spacing={1}
              >
                <Button variant="outlined" onClick={handleClose} fullWidth>
                  {t(SingleWordsTranslationKeys.Cancel)}
                </Button>
                <Button color="error" onClick={onDeleteCropHistory} fullWidth>
                  {t(SingleWordsTranslationKeys.Delete)}
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      )}
    </>
  );
}
