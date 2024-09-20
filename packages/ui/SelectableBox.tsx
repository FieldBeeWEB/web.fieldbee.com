import { Box, BoxProps } from "@mui/material";

type Props = {
  selected: boolean;
} & BoxProps;

export const SelectableBox = ({ selected, ...props }: Props) => (
  <Box
    padding={3}
    sx={(theme) => ({
      cursor: "pointer",
      borderRadius: "4px",
      border: selected
        ? `1px solid ${theme.palette.primary_shades[200]}`
        : "none",
      backgroundColor: selected
        ? theme.palette.mix.main
        : theme.palette.secondary_shades[300],
      "&:hover": {
        backgroundColor: theme.palette.mix_shades[200],
        border: `1px solid ${theme.palette.primary_shades[500]}`,
      },
    })}
    {...props}
  >
    {props.children}
  </Box>
);
