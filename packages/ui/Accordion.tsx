import { Accordion as MAccordion, AccordionProps, styled } from "@mui/material";

const StyledAccordion = styled(MAccordion)(({ theme }) => ({
  ".Mui-expanded.MuiAccordionSummary-root": {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.mix.main,
    margin: "0 !important",
  },
  ".Mui-expanded.MuiPaper-root": {
    margin: "0 !important",
  },
  ".Mui-expanded": {
    margin: "0 !important",
    "& + .MuiAccordionSummary-expandIconWrapper": {
      color: theme.palette.primary.main,
    },
  },
  ".MuiAccordionSummary-content": {
    margin: "20px 0",
  },
  boxShadow: "none",
  background: theme.palette.secondary.main,
}));

export const Accordion = (props: AccordionProps) => {
  return <StyledAccordion {...props} />;
};
