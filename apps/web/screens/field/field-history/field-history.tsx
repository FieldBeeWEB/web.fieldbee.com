import { FieldsResponse } from "@fieldbee/api";
import { Accordion } from "@fieldbee/ui";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@fieldbee/ui/components";
import { ArrowDropDown } from "@fieldbee/ui/icons";
import * as React from "react";
import FieldCrops from "../field-crops/field-crops";
import FieldWorks from "../field-works/field-works";

interface Props {
  field: FieldsResponse;
}

const FieldHistory: React.FunctionComponent<Props> = ({ field }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Accordion
        expanded={expanded === "works"}
        onChange={handleChange("works")}
        sx={{
          marginBottom:
            expanded === "works" ? "auto !important" : "0 !important",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="worksbh-content"
          id="worksbh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Works</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 1 }}>
          <FieldWorks works={field.tasks} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "crops"}
        onChange={handleChange("crops")}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="cropsbh-content"
          id="cropsbh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Crops</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FieldCrops fieldUri={field.uri} cropHistory={field.cropHistory} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default FieldHistory;
