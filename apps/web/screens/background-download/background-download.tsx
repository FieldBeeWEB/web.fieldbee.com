import {
  MultipleExportFormat,
  ReportExportFormat,
  useGenerateExport,
  useGenerateReport,
  useGetExportResult,
  useGetReportResult,
} from "@fieldbee/api";
import { t } from "i18next";
import React, { useMemo } from "react";
import { toast } from "../../helpers/toast";
import { PhrasesTranslationKeys } from "../../localization";
import BackgroundDownloadContext, {
  BackgroundDownloadContextType,
} from "./background-download-context";
import ReportGeneratedDialog from "./report-generated-dialog";

type Props = React.PropsWithChildren;

export type TriggerDownloadInput = {
  uri: string;
  format: ReportExportFormat;
};

export type TriggerMultipleDownloadInput = {
  uri: string[];
  exportFormat: MultipleExportFormat;
};

const BackgroundDownloadProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  const [downloadUri, setDownloadUri] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { mutateAsync: generateReport } = useGenerateReport();
  const { mutateAsync: getReportResult } = useGetReportResult();
  const { mutateAsync: generateExport } = useGenerateExport();
  const { mutateAsync: getExportResult } = useGetExportResult();

  const contextValue = useMemo<BackgroundDownloadContextType>(
    () => ({
      async triggerDownload(input: TriggerDownloadInput) {
        setDownloadUri("");
        toast.info(t(PhrasesTranslationKeys.DownloadStarted));
        await generateReport(input, {
          onSuccess: async (data) => {
            setTimeout(async () => {
              await getReportResult(
                { id: data },
                {
                  onSuccess: (data1) => {
                    setDownloadUri(data1);
                    setIsOpen(true);
                  },
                  onError: () => {
                    toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
                  },
                }
              );
            }, 2000);
          },
          onError: () => {
            toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
          },
        });
      },
      async triggerMultipleDownload(input: TriggerMultipleDownloadInput) {
        setDownloadUri("");
        toast.info(t(PhrasesTranslationKeys.DownloadStarted));
        await generateExport(input, {
          onSuccess: async (data) => {
            setTimeout(async () => {
              await getExportResult(
                { id: data },
                {
                  onSuccess: (data1) => {
                    setDownloadUri(data1);
                    setIsOpen(true);
                  },
                  onError: () => {
                    toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
                  },
                }
              );
            }, 2000);
          },
          onError: () => {
            toast.error(t(PhrasesTranslationKeys.SomethingWentWrong));
          },
        });
      },
    }),
    [generateExport, generateReport, getExportResult, getReportResult]
  );

  return (
    <BackgroundDownloadContext.Provider value={contextValue}>
      {children}
      <ReportGeneratedDialog
        uri={downloadUri}
        isOpened={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </BackgroundDownloadContext.Provider>
  );
};

export default BackgroundDownloadProvider;
