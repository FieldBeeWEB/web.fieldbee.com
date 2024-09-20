import { Checkbox as MCheckbox, CheckboxProps, styled } from "@mui/material";

const StyledCheckbox = styled(MCheckbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    display: "none",
  },
  "& + .MuiFormControlLabel-label": {
    border: `1px solid ${theme.palette.secondary_shades[300]}`,
    borderRadius: "8px",
    padding: "6px 16px",
    color: theme.palette.white[800],
    fontSize: "14px",
  },
  "&.Mui-checked": {
    "& + .MuiFormControlLabel-label": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary_shades[200],
    },
  },
}));

export const BorderedCheckbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};
