import { Typography as MTypography, TypographyProps } from "@mui/material";
import { theme } from "./ThemeProvider";

export const PageHeader = (props: TypographyProps) => {
  return (
    <MTypography
      variant="h4"
      component="h1"
      textTransform="capitalize"
      color={theme.palette.common.white}
    >
      {props.children}
    </MTypography>
  );
};
