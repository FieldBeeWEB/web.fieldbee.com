import { MultipleExportFormat } from "@fieldbee/api";
import { SmallMenu } from "@fieldbee/ui";
import { IconButton, MenuItem } from "@fieldbee/ui/components";
import ExportIcon from "@fieldbee/ui/custom-icons/ExportIcon";
import { t } from "i18next";
import * as React from "react";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import BackgroundDownloadContext from "../../background-download/background-download-context";

interface Props {
  uris: string[];
}

export default function GenerateFieldsReport({ uris }: Props) {
  const { triggerMultipleDownload } = React.useContext(
    BackgroundDownloadContext
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="medium"
        onClick={handleMenuClick}
        aria-label={t(SingleWordsTranslationKeys.Download).toString()}
      >
        <ExportIcon
          sx={{
            width: "32px",
            height: "32px",
          }}
        />
      </IconButton>
      <SmallMenu
        anchorEl={anchorEl}
        id="download-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            triggerMultipleDownload({
              exportFormat: MultipleExportFormat.SHP,
              uri: uris,
            });
          }}
        >
          {t(PhrasesTranslationKeys.ExportToKML)}
        </MenuItem>

        <MenuItem
          onClick={() => {
            triggerMultipleDownload({
              exportFormat: MultipleExportFormat.KML,
              uri: uris,
            });
          }}
        >
          {t(PhrasesTranslationKeys.ExportToSHP)}
        </MenuItem>

        <MenuItem
          onClick={() => {
            triggerMultipleDownload({
              exportFormat: MultipleExportFormat.ABSHP,
              uri: uris,
            });
          }}
        >
          {t(PhrasesTranslationKeys.ExportABLinesToSHP)}
        </MenuItem>
      </SmallMenu>
    </>
  );
}
