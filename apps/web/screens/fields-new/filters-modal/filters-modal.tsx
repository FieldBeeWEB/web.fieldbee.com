import { useGetFieldFilters } from "@fieldbee/api";
import { ModalBody, ModalContent } from "@fieldbee/ui";
import { Badge, IconButton } from "@fieldbee/ui/components";
import { TuneOutlined } from "@fieldbee/ui/icons";
import { t } from "i18next";
import * as React from "react";
import { SingleWordsTranslationKeys } from "../../../localization";
import FieldsFilters from "../../fields/fields-filters/fields-filters";

const FiltersModal: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: filters, isLoading } = useGetFieldFilters();

  return (
    <>
      <Badge
        badgeContent={
          filters ? filters.items.map((x) => x.values).flat().length : 0
        }
        color="primary"
      >
        <IconButton
          size="medium"
          aria-label={t(SingleWordsTranslationKeys.Filter).toString()}
          onClick={handleOpen}
        >
          <TuneOutlined
            sx={{
              width: "32px",
              height: "32px",
            }}
          />
        </IconButton>
      </Badge>
      <ModalContent
        open={open}
        handleClose={handleClose}
        modalWidth="large"
        modalHeight="normal"
        modalTitle={t(SingleWordsTranslationKeys.Filters).toString()}
      >
        <ModalBody flexDirection="column">
          {!isLoading && (
            <FieldsFilters handleClose={handleClose} filters={filters} />
          )}
        </ModalBody>
      </ModalContent>
    </>
  );
};
export default FiltersModal;
