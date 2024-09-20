import { useGetSession, useUploadShp } from "@fieldbee/api";
import { Button, ModalBody, ModalContent, Stack } from "@fieldbee/ui";
import { Box, Typography } from "@fieldbee/ui/components";
import { Info, UploadFile } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { pagePaths } from "../../config/page-paths";
import { toast } from "../../helpers/toast";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../localization";
import useAppContext from "../shared/providers/use-app-context";

interface Props {
  openModal: boolean;
  handleClose: () => void;
}

const ImportFieldsModal: React.FunctionComponent<Props> = ({
  openModal,
  handleClose,
}) => {
  const { handleSetImportSessionResponse } = useAppContext();
  const router = useRouter();

  const { mutateAsync: uploadShp } = useUploadShp();
  const { mutateAsync: getSession } = useGetSession();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "application/zip": [".zip"],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      await uploadShp(
        { file: file as Blob },
        {
          onSuccess: async (data) => {
            await getSession(
              { uri: data.sesUri },
              {
                onSuccess: (data1) => {
                  handleSetImportSessionResponse(data1);
                  router.push(pagePaths.authPages.importFields);
                },
              }
            );
          },
          onError: () => {
            toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
          },
        }
      );
    },
    maxFiles: 1,
  });

  return (
    <ModalContent
      open={openModal}
      handleClose={handleClose}
      modalWidth="large"
      modalHeight="dialog"
      modalTitle="Import Fields"
      hasBottomBorder={false}
    >
      <ModalBody flexDirection="column">
        <Box sx={{ padding: "16px", width: "calc(100% - 32px)" }}>
          <Stack spacing={0} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Info />
              <Typography color="white.600" variant="body2">
                Upload a ZIP archive with your SHP file.
              </Typography>
            </Stack>
            <Typography color="white.400" fontSize="12px">
              (Projection has to be in EPSG:4326 (WGS84) coordinate system)
            </Typography>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            spacing={2}
            sx={(theme) => ({
              background: isDragActive
                ? "rgba(255, 216, 51, 0.5)"
                : "rgba(255, 255, 255, 0.05)",
              border: `1px dashed ${theme.palette.secondary_shades[300]}`,
              borderRadius: "4px",
              padding: "16px",
            })}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button startIcon={<UploadFile />} onClick={open}>
                {t(SingleWordsTranslationKeys.Upload)}
              </Button>
              <Typography>
                {t(SentencesTranslationKeys.OrDragNDropFileFromYourDesktop)}
              </Typography>
            </Stack>
            <Typography sx={{ maxWidth: "500px" }} textAlign="center">
              {t(SentencesTranslationKeys.TheArchiveFileShouldContain)}
            </Typography>
          </Stack>
        </Box>
      </ModalBody>
    </ModalContent>
  );
};
export default ImportFieldsModal;
