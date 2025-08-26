import { queryKeys, useDeleteFields, useQueryClient } from "@fieldbee/api";
import { Button, ModalBody, ModalContent, Stack } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import { useRouter } from "next/router";
import { pagePaths } from "../../../config/page-paths";
import { toast } from "../../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

interface Props {
  uris: string[];
  isOpened: boolean;
  handleClose: () => void;
}

export default function DeleteField({ isOpened, handleClose, uris }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteFields, isLoading } = useDeleteFields();

  const onDeleteField = async () => {
    await deleteFields(
      { uris },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.getFields,
          });
          if (uris.length === 1) {
            await queryClient.refetchQueries({
              queryKey: queryKeys.getField(uris[0]),
            });
          }
          handleClose();
          router.push(pagePaths.authPages.fields);
        },
        onError: () => {
          toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
        },
      },
    );
  };

  return (
    <>
      {isOpened && (
        <ModalContent
          open={isOpened}
          handleClose={handleClose}
          isDialog={true}
          hasBottomBorder={false}
          modalTitle={t(PhrasesTranslationKeys.DeleteField).toString()}
        >
          <ModalBody flexDirection="column">
            <Stack spacing={2} padding="0 16px 16px 16px">
              <Typography>
                {uris.length > 1
                  ? t(
                      SentencesTranslationKeys.AreYouSureYouWantDeleteTheseFields,
                    )
                  : t(
                      SentencesTranslationKeys.AreYouSureYouWantDeleteThisField,
                    )}
                ?
              </Typography>
            </Stack>
            <Stack
              direction="row"
              padding="16px"
              sx={(theme) => ({
                borderTop: `1px solid ${theme.palette.background.default}`,
              })}
              spacing={1}
            >
              <Button fullWidth variant="outlined" onClick={handleClose}>
                {t(SingleWordsTranslationKeys.Cancel)}
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={onDeleteField}
                loading={isLoading}
              >
                {t(PhrasesTranslationKeys.DeleteField)}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      )}
    </>
  );
}
