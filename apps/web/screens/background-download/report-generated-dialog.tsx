/* eslint-disable turbo/no-undeclared-env-vars */
import { Button, ModalBody, ModalContent, Stack } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../localization";

interface Props {
  uri: string;
  isOpened: boolean;
  handleClose: () => void;
}

export default function ReportGeneratedDialog({
  isOpened,
  handleClose,
  uri,
}: Props) {
  return (
    <>
      {isOpened && (
        <ModalContent
          open={isOpened}
          handleClose={handleClose}
          isDialog={true}
          hasBottomBorder={false}
          modalTitle={t(PhrasesTranslationKeys.ReportIsDone).toString()}
        >
          <ModalBody flexDirection="column">
            <Stack padding={1}>
              <Typography>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/RESTService/RESTService/export/get?uri=${uri}`}
                >
                  {t(SentencesTranslationKeys.ClickThisLinkToDownload)}
                </a>
              </Typography>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                {t(SingleWordsTranslationKeys.Close)}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      )}
    </>
  );
}
