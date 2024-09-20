import * as React from "react";
import {
  TriggerDownloadInput,
  TriggerMultipleDownloadInput,
} from "./background-download";

export interface BackgroundDownloadContextType {
  triggerDownload(input: TriggerDownloadInput): void;
  triggerMultipleDownload(input: TriggerMultipleDownloadInput): void;
}

const BackgroundDownloadContext =
  React.createContext<BackgroundDownloadContextType>({
    triggerDownload: () => {
      throw new Error(
        "You probably forgot to put <BackgroundDownloadContext.Provider>!"
      );
    },
    triggerMultipleDownload: () => {
      throw new Error(
        "You probably forgot to put <BackgroundDownloadContext.Provider>!"
      );
    },
  });

export default BackgroundDownloadContext;
